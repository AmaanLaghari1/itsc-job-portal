<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\AuthController;

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

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::prefix('auth')->group(function(){
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('verify-email', [AuthController::class, 'verifyEmail']);
    Route::get('verify-password-token/{token}', [AuthController::class, 'verifyPasswordToken']);
    Route::post('resend-otp', [AuthController::class, 'resendOtpCode']);
    Route::post('reset-password', [AuthController::class, 'sendPasswordResetLink']);
    Route::post('change-password', [AuthController::class, 'changePassword']);
    Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']);
});

Route::get('districts', [UserController::class, 'getDistricts']);
Route::get('cities', [UserController::class, 'getCities']);
Route::get('provinces', [UserController::class, 'getProvinces']);
Route::get('countries', [UserController::class, 'getCountries']);

Route::prefix('user')->group(function() {
    Route::get('get', [UserController::class, 'index']);
    Route::get('get/{id}', [UserController::class, 'show']);
    Route::post('post', [UserController::class, 'store']);
    Route::put('put/{id}', [UserController::class, 'update']);
    Route::delete('delete/{id}', [UserController::class, 'destroy']);
    Route::post('upload-img', [UserController::class, 'uploadImg']);
});
