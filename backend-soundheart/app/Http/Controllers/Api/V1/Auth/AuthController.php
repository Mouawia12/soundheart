<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\User;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $data = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::where('email', $data['email'])->first();

        if (! $user || ! Hash::check($data['password'], $user->password)) {
            return ApiResponse::error('These credentials do not match our records.', 401);
        }

        $token = $user->createToken('admin')->plainTextToken;

        return ApiResponse::success([
            'token' => $token,
            'user' => $this->userPayload($user),
        ], 'Signed in');
    }

    /** Client self-registration (email + password). */
    public function register(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:160', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password'],
            'role' => 'client',
        ]);

        return ApiResponse::success([
            'token' => $user->createToken('client')->plainTextToken,
            'user' => $this->userPayload($user),
        ], 'Account created', 201);
    }

    /** Sign in / sign up with a Google ID token (dormant until GOOGLE_CLIENT_ID is set). */
    public function google(Request $request): JsonResponse
    {
        $clientId = config('services.google.client_id');
        if (empty($clientId)) {
            return ApiResponse::error('Google sign-in is not configured yet.', 503);
        }

        $credential = $request->input('credential');
        if (empty($credential)) {
            return ApiResponse::error('Missing Google credential.', 422);
        }

        $info = Http::get('https://oauth2.googleapis.com/tokeninfo', ['id_token' => $credential]);
        if (! $info->successful() || $info->json('aud') !== $clientId) {
            return ApiResponse::error('Could not verify the Google sign-in.', 401);
        }

        $email = $info->json('email');
        if (! $email) {
            return ApiResponse::error('No email on the Google account.', 422);
        }

        $user = User::firstOrCreate(
            ['email' => $email],
            [
                'name' => $info->json('name') ?: $email,
                'password' => Hash::make(Str::random(40)),
                'role' => 'client',
                'avatar' => $info->json('picture'),
            ],
        );

        return ApiResponse::success([
            'token' => $user->createToken('client')->plainTextToken,
            'user' => $this->userPayload($user),
        ], 'Signed in with Google');
    }

    public function me(Request $request): JsonResponse
    {
        return ApiResponse::success($this->userPayload($request->user()), 'Current user');
    }

    /** The signed-in client's own bookings (matched by their email). */
    public function myBookings(Request $request): JsonResponse
    {
        $bookings = Booking::query()
            ->where('email', $request->user()->email)
            ->orderBy('starts_at', 'desc')
            ->get();

        return ApiResponse::success($bookings, 'Your bookings');
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return ApiResponse::success(null, 'Signed out');
    }

    public function updatePassword(Request $request): JsonResponse
    {
        $data = $request->validate([
            'current_password' => ['required', 'string'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $user = $request->user();

        if (! Hash::check($data['current_password'], $user->password)) {
            return ApiResponse::error('The current password is incorrect.', 422, [
                'current_password' => ['The current password is incorrect.'],
            ]);
        }

        if (Hash::check($data['password'], $user->password)) {
            return ApiResponse::error('The new password must be different from your current password.', 422, [
                'password' => ['The new password must be different from your current password.'],
            ]);
        }

        // The User model casts `password` as `hashed`, so this is stored hashed.
        $user->update(['password' => $data['password']]);

        // Sign out other devices; keep this session active.
        $currentId = $user->currentAccessToken()->id;
        $user->tokens()->where('id', '!=', $currentId)->delete();

        return ApiResponse::success(null, 'Password updated');
    }

    private function userPayload(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
            'phone' => $user->phone,
            'avatar' => $user->avatar,
        ];
    }
}
