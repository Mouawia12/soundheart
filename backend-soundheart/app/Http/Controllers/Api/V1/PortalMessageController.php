<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PortalMessageController extends Controller
{
    private function conversation(Request $request): Conversation
    {
        return Conversation::firstOrCreate(['user_id' => $request->user()->id]);
    }

    /** The client's thread. Reading it marks the admin's messages as read. */
    public function index(Request $request): JsonResponse
    {
        $conv = $this->conversation($request);
        $conv->messages()->where('from_admin', true)->whereNull('read_at')->update(['read_at' => now()]);

        return ApiResponse::success(
            $conv->messages()->orderBy('id')->get(['id', 'from_admin', 'body', 'created_at']),
            'Messages',
        );
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate(['body' => ['required', 'string', 'max:5000']]);

        $conv = $this->conversation($request);
        $message = $conv->messages()->create(['from_admin' => false, 'body' => $data['body']]);
        $conv->update(['last_message_at' => now()]);

        return ApiResponse::success($message->only('id', 'from_admin', 'body', 'created_at'), 'Sent', 201);
    }

    /** Unread count for the client (messages from the admin). */
    public function unread(Request $request): JsonResponse
    {
        $conv = Conversation::where('user_id', $request->user()->id)->first();
        $count = $conv ? $conv->messages()->where('from_admin', true)->whereNull('read_at')->count() : 0;

        return ApiResponse::success(['unread' => $count], 'Unread');
    }
}
