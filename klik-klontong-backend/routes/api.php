<?php

use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Public routes - no authentication required
require __DIR__.'/auth.php';

// Protected routes - require authentication
Route::middleware(['auth:sanctum'])->group(function () {
    // Get authenticated user
    Route::get('/user', function (Request $request) {
        return response()->json([
            'id' => $request->user()->id,
            'name' => $request->user()->name,
            'email' => $request->user()->email,
            'is_admin' => $request->user()->is_admin ?? false,
        ]);
    });
});

// Admin-only routes - require authentication and admin role
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    // Product management endpoints
    Route::get('/products', [ProductController::class, 'index']);
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{product}', [ProductController::class, 'update']);
    Route::delete('/products/{product}', [ProductController::class, 'destroy']);
});
