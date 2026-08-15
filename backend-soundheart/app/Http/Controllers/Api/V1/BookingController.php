<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Setting;
use App\Support\ApiResponse;
use App\Support\BookingSlots;
use App\Support\GoogleCalendar;
use App\Support\StripePayments;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class BookingController extends Controller
{
    /** Public booking configuration the booking page needs. */
    public function config(): JsonResponse
    {
        $cfg = Setting::booking()->data;

        $openDays = collect($cfg['hours'] ?? [])
            ->filter(fn ($windows) => ! empty($windows))
            ->keys()
            ->values();

        return ApiResponse::success([
            'timezone' => $cfg['timezone'] ?? 'UTC',
            'sessionMinutes' => (int) ($cfg['sessionMinutes'] ?? 50),
            'price' => (int) ($cfg['price'] ?? 0),
            'currency' => $cfg['currency'] ?? 'USD',
            'allowOnline' => (bool) ($cfg['allowOnline'] ?? true),
            'allowInPerson' => (bool) ($cfg['allowInPerson'] ?? true),
            'leadTimeHours' => (int) ($cfg['leadTimeHours'] ?? 0),
            'maxAdvanceDays' => (int) ($cfg['maxAdvanceDays'] ?? 60),
            'openDays' => $openDays,
        ], 'Booking config');
    }

    /** Available slots for a date (YYYY-MM-DD). */
    public function slots(Request $request): JsonResponse
    {
        $data = $request->validate([
            'date' => ['required', 'date_format:Y-m-d'],
        ]);

        $cfg = Setting::booking()->data;

        return ApiResponse::success([
            'date' => $data['date'],
            'slots' => BookingSlots::for($data['date'], $cfg),
        ], 'Slots');
    }

    /** Create a booking. Phase A: stores name/email/time/type only (no PHI). */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:160'],
            'guests' => ['nullable', 'array', 'max:20'],
            'guests.*' => ['email', 'max:160'],
            'startsAt' => ['required', 'date'],
            'type' => ['required', 'in:online,in_person'],
            'website' => ['nullable', 'size:0'], // honeypot
        ]);

        $cfg = Setting::booking()->data;
        $tz = $cfg['timezone'] ?? 'UTC';
        $session = (int) ($cfg['sessionMinutes'] ?? 50);

        if ($data['type'] === 'online' && ! ($cfg['allowOnline'] ?? true)) {
            throw ValidationException::withMessages(['type' => 'Online sessions are not available.']);
        }
        if ($data['type'] === 'in_person' && ! ($cfg['allowInPerson'] ?? true)) {
            throw ValidationException::withMessages(['type' => 'In-person sessions are not available.']);
        }

        $start = Carbon::parse($data['startsAt'])->utc();
        $localDate = $start->copy()->setTimezone($tz)->format('Y-m-d');

        // The slot must still be offered and available (guards double-booking).
        $slot = collect(BookingSlots::for($localDate, $cfg))
            ->first(fn ($s) => $s['startsAt'] === $start->toIso8601String());

        if (! $slot || ! $slot['available']) {
            throw ValidationException::withMessages([
                'startsAt' => 'That time is no longer available. Please pick another slot.',
            ]);
        }

        $booking = Booking::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'guests' => array_values(array_unique($data['guests'] ?? [])),
            'starts_at' => $start,
            'ends_at' => $start->copy()->addMinutes($session),
            'timezone' => $tz,
            'type' => $data['type'],
            'status' => 'confirmed',
            'amount' => ($cfg['price'] ?? 0) > 0 ? (int) $cfg['price'] : null,
            'currency' => $cfg['currency'] ?? 'USD',
            'payment_status' => 'not_required',
        ]);

        // Auto-create the Google Calendar event + Meet link (no-op without keys).
        try {
            $cal = new GoogleCalendar();
            if ($cal->enabled()) {
                $ev = $cal->createEvent($booking);
                if ($ev) {
                    $booking->update(['meet_url' => $ev['meetUrl'] ?? null, 'calendar_event_id' => $ev['eventId'] ?? null]);
                }
            }
        } catch (\Throwable $e) {
            report($e);
        }

        // If payments are on and there's a price, send the client to Stripe Checkout.
        $stripe = new StripePayments();
        if ($stripe->enabled() && $booking->amount) {
            $booking->update(['payment_status' => 'unpaid']);
            $frontend = rtrim(config('services.booking.frontend_url'), '/');
            $checkoutUrl = $stripe->createCheckoutSession(
                $booking,
                $frontend.'/booking?status=success',
                $frontend.'/booking?status=cancelled',
            );
            if ($checkoutUrl) {
                return ApiResponse::success([
                    'id' => $booking->id,
                    'requiresPayment' => true,
                    'checkoutUrl' => $checkoutUrl,
                ], 'Payment required', 201);
            }
        }

        return ApiResponse::success([
            'id' => $booking->id,
            'startsAt' => $booking->starts_at->toIso8601String(),
            'endsAt' => $booking->ends_at->toIso8601String(),
            'type' => $booking->type,
            'meetUrl' => $booking->meet_url,
        ], 'Booking confirmed', 201);
    }

    /** Stripe webhook — marks a booking paid once checkout completes. */
    public function webhook(Request $request): JsonResponse
    {
        $event = (new StripePayments())->verifyWebhook($request->getContent(), $request->header('Stripe-Signature'));
        if (! $event) {
            return ApiResponse::error('Invalid signature', 400);
        }

        if (($event['type'] ?? '') === 'checkout.session.completed') {
            $bookingId = $event['data']['object']['metadata']['booking_id'] ?? null;
            if ($bookingId) {
                Booking::where('id', $bookingId)->update(['payment_status' => 'paid']);
            }
        }

        return ApiResponse::success(null, 'ok');
    }
}
