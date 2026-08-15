<?php

namespace App\Support;

use App\Models\Booking;
use Illuminate\Support\Facades\Http;

/**
 * Creates a Google Calendar event (with a Meet link for online sessions) and lets
 * Google email the invite to the client + guests. No SDK — service-account JWT
 * over plain HTTP. Dormant until GOOGLE_CALENDAR_ID + a service account are set.
 */
class GoogleCalendar
{
    public function enabled(): bool
    {
        return ! empty(config('services.google_calendar.calendar_id')) && $this->credentials() !== null;
    }

    /** @return array{meetUrl:?string, eventId:?string}|null */
    public function createEvent(Booking $booking): ?array
    {
        if (! $this->enabled()) {
            return null;
        }

        $token = $this->accessToken();
        if (! $token) {
            return null;
        }

        $calendarId = config('services.google_calendar.calendar_id');

        $attendees = collect([$booking->email])
            ->merge($booking->guests ?? [])
            ->filter()
            ->unique()
            ->map(fn ($e) => ['email' => $e])
            ->values()
            ->all();

        $event = [
            'summary' => 'SoundHeart session with '.$booking->name,
            'start' => ['dateTime' => $booking->starts_at->toIso8601String(), 'timeZone' => 'UTC'],
            'end' => ['dateTime' => $booking->ends_at->toIso8601String(), 'timeZone' => 'UTC'],
            'attendees' => $attendees,
        ];

        if ($booking->type === 'online') {
            $event['conferenceData'] = [
                'createRequest' => [
                    'requestId' => 'sh-'.$booking->id.'-'.bin2hex(random_bytes(4)),
                    'conferenceSolutionKey' => ['type' => 'hangoutsMeet'],
                ],
            ];
        }

        $response = Http::withToken($token)->post(
            'https://www.googleapis.com/calendar/v3/calendars/'.urlencode($calendarId).
            '/events?conferenceDataVersion=1&sendUpdates=all',
            $event,
        );

        if (! $response->successful()) {
            report(new \RuntimeException('Google Calendar event failed: '.$response->body()));

            return null;
        }

        $data = $response->json();

        return [
            'meetUrl' => $data['hangoutLink'] ?? ($data['conferenceData']['entryPoints'][0]['uri'] ?? null),
            'eventId' => $data['id'] ?? null,
        ];
    }

    private function credentials(): ?array
    {
        $json = config('services.google_calendar.service_account_json');
        if (empty($json)) {
            $file = config('services.google_calendar.service_account_file');
            if ($file && is_file($file)) {
                $json = file_get_contents($file);
            }
        }
        if (empty($json)) {
            return null;
        }

        $creds = json_decode($json, true);

        return (isset($creds['client_email'], $creds['private_key'])) ? $creds : null;
    }

    private function accessToken(): ?string
    {
        $creds = $this->credentials();
        if (! $creds) {
            return null;
        }

        $now = time();
        $header = self::b64url(json_encode(['alg' => 'RS256', 'typ' => 'JWT']));
        $claim = self::b64url(json_encode([
            'iss' => $creds['client_email'],
            'scope' => 'https://www.googleapis.com/auth/calendar.events',
            'aud' => 'https://oauth2.googleapis.com/token',
            'iat' => $now,
            'exp' => $now + 3600,
        ]));

        $signingInput = $header.'.'.$claim;
        $signature = '';
        if (! openssl_sign($signingInput, $signature, $creds['private_key'], OPENSSL_ALGO_SHA256)) {
            return null;
        }
        $jwt = $signingInput.'.'.self::b64url($signature);

        $response = Http::asForm()->post('https://oauth2.googleapis.com/token', [
            'grant_type' => 'urn:ietf:params:oauth:grant-type:jwt-bearer',
            'assertion' => $jwt,
        ]);

        return $response->successful() ? $response->json('access_token') : null;
    }

    private static function b64url(string $data): string
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }
}
