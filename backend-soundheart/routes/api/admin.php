<?php

use App\Http\Controllers\Api\V1\Admin\AdminArticleController;
use App\Http\Controllers\Api\V1\Admin\AdminCategoryController;
use App\Http\Controllers\Api\V1\Admin\AdminDashboardController;
use App\Http\Controllers\Api\V1\Admin\AdminBookingController;
use App\Http\Controllers\Api\V1\Admin\AdminPageController;
use App\Http\Controllers\Api\V1\Admin\AdminSettingController;
use App\Http\Controllers\Api\V1\Admin\MediaController;
use App\Http\Controllers\Api\V1\Auth\AuthController;
use Illuminate\Support\Facades\Route;

/*
| Auth + admin (protected) endpoints. Loaded inside the /api/v1 group.
*/
Route::post('auth/login', [AuthController::class, 'login'])->middleware('throttle:auth');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('auth/me', [AuthController::class, 'me']);
    Route::post('auth/logout', [AuthController::class, 'logout']);
    Route::put('auth/password', [AuthController::class, 'updatePassword']);

    Route::prefix('admin')->group(function () {
        Route::get('stats', [AdminDashboardController::class, 'stats']);
        Route::apiResource('articles', AdminArticleController::class)->except(['create', 'edit']);
        Route::apiResource('categories', AdminCategoryController::class)
            ->only(['index', 'store', 'update', 'destroy']);

        Route::get('pages', [AdminPageController::class, 'index']);
        Route::get('pages/{page:key}', [AdminPageController::class, 'show']);
        Route::put('pages/{page:key}', [AdminPageController::class, 'update']);
        Route::post('media', [MediaController::class, 'store']);

        Route::get('settings', [AdminSettingController::class, 'show']);
        Route::put('settings', [AdminSettingController::class, 'update']);

        Route::get('booking/settings', [AdminBookingController::class, 'settings']);
        Route::put('booking/settings', [AdminBookingController::class, 'updateSettings']);
        Route::get('bookings', [AdminBookingController::class, 'bookings']);
        Route::put('bookings/{booking}/cancel', [AdminBookingController::class, 'cancelBooking']);
    });
});
