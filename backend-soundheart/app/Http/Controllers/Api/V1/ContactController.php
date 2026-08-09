<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    /**
     * Handle a contact-form submission.
     *
     * IMPORTANT: this endpoint NEVER stores the message. A visitor may write
     * health details unprompted, so we validate, email it, and return — nothing
     * is persisted to the database. Protected by a honeypot + a per-IP rate limit.
     */
    public function store(Request $request): JsonResponse
    {
        // Honeypot: real users never fill this. Bots do — answer 200 silently.
        if (filled($request->input('website'))) {
            return ApiResponse::success(null, "Thanks — we'll be in touch soon.");
        }

        $data = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:190'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        $to = env('CONTACT_TO_EMAIL', config('mail.from.address'));

        Mail::raw(
            "New contact message from the SoundHeart website:\n\n".
            "Name: {$data['name']}\n".
            "Email: {$data['email']}\n\n".
            "Message:\n{$data['message']}\n",
            function ($mail) use ($to, $data) {
                $mail->to($to)
                    ->subject('New contact message — SoundHeart')
                    ->replyTo($data['email'], $data['name']);
            }
        );

        // No database write — by design.

        return ApiResponse::success(null, "Thanks — we'll be in touch soon.");
    }
}
