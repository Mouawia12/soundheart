<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ArticleCardResource;
use App\Models\Article;
use App\Models\Category;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;

class AdminDashboardController extends Controller
{
    public function stats(): JsonResponse
    {
        return ApiResponse::success([
            'articles' => Article::count(),
            'published' => Article::where('status', 'published')->count(),
            'drafts' => Article::where('status', '!=', 'published')->count(),
            'categories' => Category::count(),
            'recent' => ArticleCardResource::collection(
                Article::with('category')->latest('id')->limit(6)->get()
            ),
        ], 'Dashboard stats');
    }
}
