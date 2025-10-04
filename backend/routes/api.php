<?php

use App\Http\Controllers\API\AuthController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\UserRoleController;
use App\Http\Controllers\API\QualificationController;
use App\Http\Controllers\API\ExperienceController;
use App\Http\Controllers\API\AnnouncementController;
use App\Http\Controllers\API\ApplicationController;
use App\Http\Controllers\API\DegreeProgramController;

Route::group(['middleware' => 'api'], function ($router) {
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
    Route::prefix('auth')->group(function(){
        Route::post('register', [AuthController::class, 'register']);
        Route::post('login', [AuthController::class, 'login']);
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('verify-email', [AuthController::class, 'verifyEmail']);
        Route::get('verify-password-token/{token}', [AuthController::class, 'verifyPasswordToken']);
        Route::post('resend-otp', [AuthController::class, 'resendOtpCode']);
        Route::post('reset-password', [AuthController::class, 'sendPasswordResetLink']);
        Route::post('change-password', [AuthController::class, 'changePassword']);
        // Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']);
    });

});


Route::get('login-check/{token}', [AuthController::class, 'checkLoggedIn']);


Route::get('districts/{provinceId?}', [UserController::class, 'getDistricts']);
Route::get('cities', [UserController::class, 'getCities']);
Route::get('provinces/{countryId?}', [UserController::class, 'getProvinces']);
Route::get('countries/{countryId?}', [UserController::class, 'getCountries']);

Route::prefix('user')->group(function() {
    Route::get('get', [UserController::class, 'index']);
    Route::get('get/{id}', [UserController::class, 'show']);
    Route::post('post', [UserController::class, 'store']);
    Route::put('put/{id}', [UserController::class, 'update']);
    Route::delete('delete/{id}', [UserController::class, 'destroy']);
    Route::post('upload-img', [UserController::class, 'uploadImg']);
    Route::get('get-user-detail/{countryId?}/{provinceId?}/{districtId?}/{cityId?}', [UserController::class, 'getUserDetails']);
});

Route::prefix('qualification')->group(function() {
    Route::post('post', [QualificationController::class, 'create']);
    Route::get('get/{userId?}', [QualificationController::class, 'getByUserId']);
    Route::put('put/{id}', [QualificationController::class, 'update']);
    Route::delete('delete/{id}', [QualificationController::class, 'destroy']);
    Route::get('discipline/{programId?}', [QualificationController::class, 'getDisciplines']);
    Route::get('program/{programId?}', [QualificationController::class, 'getPrograms']);
    Route::get('organization/{organizationId?}', [QualificationController::class, 'getOrganizations']);
    Route::get('institute/{instituteId?}', [QualificationController::class, 'getInstitutes']);
});

Route::prefix('experience')->group(function() {
    Route::post('post', [ExperienceController::class, 'create']);
    Route::put('put/{id}', [ExperienceController::class, 'update']);
    Route::get('get/{userId?}', [ExperienceController::class, 'getByUserId']);
    Route::delete('delete/{id}', [ExperienceController::class, 'destroy']);
});

Route::prefix('announcement')->group(function() {
    Route::get('get', [AnnouncementController::class, 'index']);
    Route::get('get/recent_announcements', [AnnouncementController::class, 'getSixMonthOldAnnouncements']);
    Route::get('application_requirement', [AnnouncementController::class, 'applicationRequirements']);
    Route::post('post', [AnnouncementController::class, 'create']);
    Route::put('put/{id}', [AnnouncementController::class, 'update']);
    Route::get('get/{id}', [AnnouncementController::class, 'show']);
    Route::delete('delete/{id}', [AnnouncementController::class, 'destroy']);
});

Route::prefix('application')->group(function() {
    Route::get('get', [ApplicationController::class, 'index']);
    Route::get('get_by_announcement/{announcementId}', [ApplicationController::class, 'getApplicationsByAnnouncementId']);
    Route::post('post', [ApplicationController::class, 'create']);
    Route::put('put/{id}', [ApplicationController::class, 'update']);
    Route::post('application_requirement', [ApplicationController::class, 'applicationRequirements']);
//    Route::get('get/{id}', [ApplicationController::class, 'show']);
    Route::delete('delete/{id}', [ApplicationController::class, 'destroy']);
    Route::get('get/{userId?}', [ApplicationController::class, 'getByUserId']);
    Route::get('verify-challan/{application_id}', [ApplicationController::class, 'verifyChallan']);
    Route::put('update-user/{id}', [ApplicationController::class, 'updateUserApplicationData']);
});

// routes/api.php
Route::get('/routes/get', function(){
    $routes = DB::table('routes')->get();
    return response()->json($routes);
});

Route::get('/department/get', function(){
//    $departments = DB::table('department')->get();
    $department = \App\Models\Department::with('announcements.applications.qualifications')->with('announcements.qualification_requirements')->get();
    return response()->json($department);
});

Route::prefix('degree_program')->group(function() {
    Route::get('/get', [DegreeProgramController::class, 'index']);
    Route::get('/discipline/get/{programId}', [DegreeProgramController::class, 'getDisciplineByProgramId']);
    Route::post('discipline/post', [DegreeProgramController::class, 'createDiscipline']);
    Route::put('discipline/put/{id}', [DegreeProgramController::class, 'updateDiscipline']);
    Route::put('discipline/status/update/{id}', [DegreeProgramController::class, 'updateDisciplineStatus']);;
});

Route::get('/announcement/recent/{cutoff?}', [AnnouncementController::class, 'getRecentAnnouncements']);
Route::post('/assign_role', [UserRoleController::class, 'assignRole']);
Route::get('/delete_role/{roleId}', [UserRoleController::class, 'destroy']);

