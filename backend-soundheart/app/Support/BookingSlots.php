<?php

namespace App\Support;

use App\Models\Booking;
use Carbon\Carbon;
use Illuminate\Support\Collection;

/**
 * Generates the bookable time slots for a given date from the booking settings,
 * marking slots that overlap an existing booking (respecting the buffer) or that
 * fall inside the lead-time window as unavailable.
 */
class BookingSlots
{
    private const DAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

    /**
     * @return array<int, array{time:string, startsAt:string, available:bool}>
     */
    public static function for(string $date, array $cfg): array
    {
        $tz = $cfg['timezone'] ?? 'UTC';
        $session = (int) ($cfg['sessionMinutes'] ?? 50);
        $buffer = (int) ($cfg['bufferMinutes'] ?? 0);
        $lead = (int) ($cfg['leadTimeHours'] ?? 0);

        try {
            $day = Carbon::createFromFormat('Y-m-d', $date, $tz)->startOfDay();
        } catch (\Throwable) {
            return [];
        }

        $dayKey = self::DAY_KEYS[(int) $day->dayOfWeek];
        $windows = $cfg['hours'][$dayKey] ?? [];
        if (empty($windows)) {
            return [];
        }

        $now = Carbon::now($tz);
        $earliest = $now->copy()->addHours($lead);

        // Existing bookings that day (UTC-stored), as [start, end] Carbon pairs.
        $dayStartUtc = $day->copy()->utc();
        $dayEndUtc = $day->copy()->endOfDay()->utc();
        $existing = Booking::query()
            ->where('status', 'confirmed')
            ->whereBetween('starts_at', [$dayStartUtc, $dayEndUtc])
            ->get(['starts_at', 'ends_at'])
            ->map(fn (Booking $b) => [$b->starts_at, $b->ends_at]);

        $slots = [];
        foreach ($windows as $w) {
            $start = self::atTime($day, $w['start'] ?? null);
            $end = self::atTime($day, $w['end'] ?? null);
            if (! $start || ! $end) {
                continue;
            }

            for ($s = $start->copy(); $s->copy()->addMinutes($session)->lte($end); $s->addMinutes($session)) {
                $e = $s->copy()->addMinutes($session);
                $available = $s->gte($earliest) && ! self::conflicts($s, $e, $buffer, $existing);

                $slots[] = [
                    'time' => $s->format('H:i'),
                    'startsAt' => $s->copy()->utc()->toIso8601String(),
                    'available' => $available,
                ];
            }
        }

        return $slots;
    }

    private static function atTime(Carbon $day, ?string $hhmm): ?Carbon
    {
        if (! $hhmm || ! preg_match('/^\d{1,2}:\d{2}$/', $hhmm)) {
            return null;
        }
        [$h, $m] = array_map('intval', explode(':', $hhmm));

        return $day->copy()->setTime($h, $m);
    }

    /** @param Collection<int, array{0:Carbon,1:Carbon}> $existing */
    private static function conflicts(Carbon $s, Carbon $e, int $buffer, Collection $existing): bool
    {
        $sUtc = $s->copy()->utc();
        $eUtc = $e->copy()->utc();
        foreach ($existing as [$bs, $be]) {
            // Two sessions need at least `buffer` minutes apart.
            if ($eUtc->copy()->addMinutes($buffer)->gt($bs) && $sUtc->lt($be->copy()->addMinutes($buffer))) {
                return true;
            }
        }

        return false;
    }
}
