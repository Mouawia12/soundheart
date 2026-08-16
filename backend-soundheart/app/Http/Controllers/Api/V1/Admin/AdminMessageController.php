<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\Message;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminMessageController extends Controller
{
    /** All client conversations, newest activity first, with unread counts. */
    public function conversations(): JsonResponse
    {
        $convs = Conversation::query()
            ->with('user:id,name,email')
            ->withCount(['messages as unread' => fn ($q) => $q->where('from_admin', false)->whereNull('read_at')])
            ->orderByDesc('last_message_at')
            ->get()
            ->map(fn (Conversation $c) => [
                'id' => $c->id,
                'name' => $c->user?->name,
                'email' => $c->user?->email,
                'last_message_at' => $c->last_message_at,
                'unread' => $c->unread,
                'last' => $c->messages()->latest('id')->value('body'),
            ]);

        return ApiResponse::success($convs, 'Conversations');
    }

    /** One thread. Reading it marks the client's messages as read. */
    public function messages(Conversation $conversation): JsonResponse
    {
        $conversation->messages()->where('from_admin', false)->whereNull('read_at')->update(['read_at' => now()]);
        $conversation->load('user:id,name,email');

        return ApiResponse::success([
            'name' => $conversation->user?->name,
            'email' => $conversation->user?->email,
            'messages' => $conversation->messages()->orderBy('id')->get(['id', 'from_admin', 'body', 'created_at']),
        ], 'Messages');
    }

    public function store(Request $request, Conversation $conversation): JsonResponse
    {
        $data = $request->validate(['body' => ['required', 'string', 'max:5000']]);

        $message = $conversation->messages()->create(['from_admin' => true, 'body' => $data['body']]);
        $conversation->update(['last_message_at' => now()]);

        return ApiResponse::success($message->only('id', 'from_admin', 'body', 'created_at'), 'Sent', 201);
    }

    /** Total unread client messages across all conversations (nav badge). */
    public function unread(): JsonResponse
    {
        return ApiResponse::success(
            ['unread' => Message::where('from_admin', false)->whereNull('read_at')->count()],
            'Unread',
        );
    }
}
