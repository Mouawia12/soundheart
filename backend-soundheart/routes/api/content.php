<?php

use App\Http\Controllers\Api\V1\ArticleController;
use App\Http\Controllers\Api\V1\CategoryController;
use App\Http\Controllers\Api\V1\ContactController;
use App\Http\Controllers\Api\V1\PageController;
use App\Http\Controllers\Api\V1\SettingController;
use Illuminate\Support\Facades\Route;

/*
| Public content endpoints (read-only). Loaded inside the /api/v1 group.
*/
Route::get('categories', [CategoryController::class, 'index']);
Route::get('articles', [ArticleController::class, 'index']);
Route::get('articles/{article:slug}', [ArticleController::class, 'show']);
Route::get('pages/{page:key}', [PageController::class, 'show']);
Route::get('settings', [SettingController::class, 'show']);

// Contact form — validates + emails, stores NOTHING. Rate limited.
Route::post('contact', [ContactController::class, 'store'])->middleware('throttle:contact');
