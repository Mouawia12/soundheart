<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = ['group', 'data'];

    protected $casts = [
        'data' => 'array',
    ];

    /** The site-wide settings row, with defaults if it does not exist yet. */
    public static function site(): self
    {
        return static::firstOrCreate(
            ['group' => 'site'],
            ['data' => static::defaults()],
        );
    }

    /** The booking settings row (working hours, session length, etc.). */
    public static function booking(): self
    {
        return static::firstOrCreate(
            ['group' => 'booking'],
            ['data' => static::bookingDefaults()],
        );
    }

    public static function bookingDefaults(): array
    {
        $window = [['start' => '09:00', 'end' => '17:00']];

        return [
            'timezone' => 'America/Anchorage',
            'sessionMinutes' => 50,
            'bufferMinutes' => 10,
            'leadTimeHours' => 24,
            'maxAdvanceDays' => 60,
            'price' => 0,
            'currency' => 'USD',
            'allowOnline' => true,
            'allowInPerson' => true,
            'hours' => [
                'mon' => $window,
                'tue' => $window,
                'wed' => $window,
                'thu' => $window,
                'fri' => $window,
                'sat' => [],
                'sun' => [],
            ],
        ];
    }

    public static function defaults(): array
    {
        return [
            'brandName' => 'SoundHeart',
            'legalName' => 'SoundHeart Counseling',
            'phoneDisplay' => '907-310-1404',
            'phoneNumber' => '19073101404',
            'email' => 'hello@soundheart.org',
            'whatsappNumber' => '19073101404',
            'bookingUrl' => 'https://soundheart.clientsecure.me',
            'clientPortalUrl' => '',
            'address' => 'Mat-Su Valley, Alaska',
            'hours' => 'By appointment, Monday to Friday',
            'crisisNote' => 'In crisis? Please do not wait for a reply. Call or text 988 (Suicide & Crisis Lifeline) or dial 911. SoundHeart is not a crisis or emergency service.',
            'signature' => 'A sound heart is not one that never breaks. It is one that learns to mend.',
            'social' => [
                'facebook' => '',
                'instagram' => '',
                'linkedin' => '',
                'youtube' => '',
            ],
        ];
    }
}
