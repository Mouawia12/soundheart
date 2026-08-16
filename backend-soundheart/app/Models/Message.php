<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Message extends Model
{
    protected $fillable = ['conversation_id', 'from_admin', 'body', 'read_at'];

    protected $casts = ['from_admin' => 'boolean', 'read_at' => 'datetime'];

    public function conversation(): BelongsTo
    {
        return $this->belongsTo(Conversation::class);
    }
}
