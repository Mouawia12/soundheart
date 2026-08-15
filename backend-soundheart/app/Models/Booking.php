<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'name', 'email', 'guests', 'starts_at', 'ends_at', 'timezone',
        'type', 'status', 'amount', 'currency', 'payment_status',
        'stripe_session_id', 'meet_url', 'calendar_event_id',
    ];

    protected $casts = [
        'guests' => 'array',
        'starts_at' => 'datetime',
        'ends_at' => 'datetime',
    ];
}
