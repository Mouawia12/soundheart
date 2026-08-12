<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminSettingController extends Controller
{
    public function show(): JsonResponse
    {
        return ApiResponse::success(Setting::site()->data, 'Settings');
    }

    public function update(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'data' => ['required', 'array'],
            'data.brandName' => ['nullable', 'string', 'max:120'],
            'data.legalName' => ['nullable', 'string', 'max:160'],
            'data.phoneDisplay' => ['nullable', 'string', 'max:40'],
            'data.phoneNumber' => ['nullable', 'string', 'max:40'],
            'data.email' => ['nullable', 'string', 'email', 'max:160'],
            'data.whatsappNumber' => ['nullable', 'string', 'max:40'],
            'data.bookingUrl' => ['nullable', 'string', 'url', 'max:400'],
            'data.clientPortalUrl' => ['nullable', 'string', 'max:400'],
            'data.address' => ['nullable', 'string', 'max:200'],
            'data.hours' => ['nullable', 'string', 'max:200'],
            'data.crisisNote' => ['nullable', 'string', 'max:400'],
            'data.signature' => ['nullable', 'string', 'max:300'],
            'data.social' => ['nullable', 'array'],
            'data.social.facebook' => ['nullable', 'string', 'max:300'],
            'data.social.instagram' => ['nullable', 'string', 'max:300'],
            'data.social.linkedin' => ['nullable', 'string', 'max:300'],
            'data.social.youtube' => ['nullable', 'string', 'max:300'],
        ]);

        $setting = Setting::site();
        // Merge over existing so partial updates keep other keys intact.
        $setting->update(['data' => array_replace($setting->data, $validated['data'])]);

        return ApiResponse::success($setting->data, 'Settings updated');
    }
}
