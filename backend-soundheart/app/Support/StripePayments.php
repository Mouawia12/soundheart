<?php

namespace App\Support;

use App\Models\Booking;
use Illuminate\Support\Facades\Http;

/**
 * Thin Stripe Checkout wrapper (no SDK — plain HTTP). Dormant until STRIPE_SECRET
 * is set in .env; enabled() gates every call so bookings work without keys.
 */
class StripePayments
{
    public function enabled(): bool
    {
        return ! empty(config('services.stripe.secret'));
    }

    /**
     * Create a Checkout Session for a booking; returns the hosted payment URL.
     */
    public function createCheckoutSession(Booking $booking, string $successUrl, string $cancelUrl): ?string
    {
        if (! $this->enabled() || ! $booking->amount) {
            return null;
        }

        $response = Http::asForm()
            ->withToken(config('services.stripe.secret'))
            ->post('https://api.stripe.com/v1/checkout/sessions', [
                'mode' => 'payment',
                'success_url' => $successUrl,
                'cancel_url' => $cancelUrl,
                'client_reference_id' => (string) $booking->id,
                'customer_email' => $booking->email,
                'metadata[booking_id]' => (string) $booking->id,
                'line_items[0][quantity]' => 1,
                'line_items[0][price_data][currency]' => strtolower($booking->currency ?? 'usd'),
                'line_items[0][price_data][unit_amount]' => (int) round($booking->amount * 100),
                'line_items[0][price_data][product_data][name]' => 'SoundHeart session',
            ]);

        if (! $response->successful()) {
            report(new \RuntimeException('Stripe checkout failed: '.$response->body()));

            return null;
        }

        return $response->json('url');
    }

    /**
     * Verify a Stripe webhook signature and return the decoded event, or null.
     */
    public function verifyWebhook(string $payload, ?string $sigHeader): ?array
    {
        $secret = config('services.stripe.webhook_secret');
        if (empty($secret) || empty($sigHeader)) {
            return null;
        }

        $parts = collect(explode(',', $sigHeader))
            ->mapWithKeys(function ($p) {
                [$k, $v] = array_pad(explode('=', $p, 2), 2, '');

                return [$k => $v];
            });

        $timestamp = $parts['t'] ?? null;
        $signature = $parts['v1'] ?? null;
        if (! $timestamp || ! $signature) {
            return null;
        }

        $expected = hash_hmac('sha256', $timestamp.'.'.$payload, $secret);
        if (! hash_equals($expected, $signature)) {
            return null;
        }

        return json_decode($payload, true) ?: null;
    }
}
