<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ExcelController;
use App\Http\Controllers\TimeSeriesController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::middleware(['auth:sanctum'])->get('/getTimeSeriesData/{file_name}', [TimeSeriesController::class, 'show']);

Route::middleware(['auth:sanctum'])->get('/getData', [ExcelController::class, 'getData']);

Route::middleware(['auth:sanctum'])->post('/upload-excel', [ExcelController::class, 'upload']);

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
