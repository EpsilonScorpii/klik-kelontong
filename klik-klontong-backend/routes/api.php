<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {

    // GET /api/admin/products
    Route::get('/products', [ProductController::class, 'index']);

    // POST /api/admin/products
    Route::post('/products', [ProductController::class, 'store']);

    // PUT /api/admin/products/{product}
    Route::put('/products/{product}', [ProductController::class, 'update']);

    // DELETE /api/admin/products/{product}
    Route::delete('/products/{product}', [ProductController::class, 'destroy']);

});
