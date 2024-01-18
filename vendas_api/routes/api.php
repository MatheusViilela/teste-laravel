<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\LoginController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SaleController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [LoginController::class, 'login']);

Route::middleware('authJwt')->group(function () {
    Route::prefix('product')->group(function () {
        Route::post('/', [ProductController::class, 'create']);
        Route::get('/', [ProductController::class, 'list']);
        Route::put('/', [ProductController::class, 'update']);
        Route::delete('/', [ProductController::class, 'delete']);
        Route::get('/{id}', [ProductController::class, 'listById']);
    });
    Route::prefix('client')->group(function () {
        Route::post('/', [ClientController::class, 'create']);
        Route::get('/', [ClientController::class, 'list']);
        Route::put('/', [ClientController::class, 'update']);
        Route::delete('/', [ClientController::class, 'delete']);
    });
    Route::prefix('sale')->group(function () {
        Route::post('/', [SaleController::class, 'create']);
        Route::get('/', [SaleController::class, 'list']);
        Route::put('/', [SaleController::class, 'update']);
        Route::delete('/', [SaleController::class, 'delete']);
    });
});
