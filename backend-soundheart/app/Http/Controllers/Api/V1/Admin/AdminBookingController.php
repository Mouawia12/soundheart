<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Setting;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminBookingController extends Controller
{
    public function settings(): JsonResponse
    {
        return ApiResponse::success(Setting::booking()->data, 'Booking settings');
    }

    public function updateSettings(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'data' => ['required', 'array'],
            'data.timezone' => ['nullable', 'string', 'max:64'],
            'data.sessionMinutes' => ['nullable', 'integer', 'min:5', 'max:480'],
            'data.bufferMinutes' => ['nullable', 'integer', 'min:0', 'max:240'],
            'data.leadTimeHours' => ['nullable', 'integer', 'min:0', 'max:2160'],
            'data.maxAdvanceDays' => ['nullable', 'integer', 'min:1', 'max:365'],
            'data.price' => ['nullable', 'integer', 'min:0'],
            'data.currency' => ['nullable', 'string', 'max:8'],
            'data.allowOnline' => ['nullable', 'boolean'],
            'data.allowInPerson' => ['nullable', 'boolean'],
            'data.hours' => ['nullable', 'array'],
            'data.hours.*' => ['array'],
            'data.hours.*.*.start' => ['required_with:data.hours', 'date_format:H:i'],
            'data.hours.*.*.end' => ['required_with:data.hours', 'date_format:H:i'],
        ]);

        $setting = Setting::booking();
        $setting->update(['data' => array_replace($setting->data, $validated['data'])]);

        return ApiResponse::success($setting->data, 'Booking settings updated');
    }

    public function bookings(Request $request): JsonResponse
    {
        $query = Booking::query()->orderBy('starts_at', 'desc');

        if ($request->filled('status')) {
            $query->where('status', $request->string('status'));
        }
        if ($request->filled('from')) {
            $query->where('starts_at', '>=', $request->date('from'));
        }

        $bookings = $query->paginate($request->integer('per_page', 25));

        return ApiResponse::paginated($bookings, $bookings->items(), 'Bookings');
    }

    public function cancelBooking(Booking $booking): JsonResponse
    {
        $booking->update(['status' => 'cancelled']);

        return ApiResponse::success(null, 'Booking cancelled');
    }
}
