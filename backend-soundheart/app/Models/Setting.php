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
