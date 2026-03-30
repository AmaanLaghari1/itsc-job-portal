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
use App\Http\Controllers\API\ApplicationQualificationController;
use App\Http\Controllers\API\ApplicationExperienceController;
use App\Http\Controllers\API\DegreeProgramController;
use App\Http\Controllers\API\InstituteController;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

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
        Route::get('update-password/{id}', [AuthController::class, 'updateUserPassword']);
    });

});

//Route::middleware(['jwt.verify', 'throttle:60,1'])->group(function () {
//Route::middleware(['throttle:60,1'])->group(function () {
    Route::get('districts/{provinceId?}', [UserController::class, 'getDistricts']);
    Route::get('cities', [UserController::class, 'getCities']);
    Route::get('provinces/{countryId?}', [UserController::class, 'getProvinces']);
    Route::get('countries/{countryId?}', [UserController::class, 'getCountries']);
//});

Route::prefix('user')->group(function() {
    Route::get('get', [UserController::class, 'index']);
    Route::get('get/{id}', [UserController::class, 'show']);
    Route::post('post', [UserController::class, 'store']);
    Route::put('put/{id}', [UserController::class, 'update']);
    Route::delete('delete/{id}', [UserController::class, 'destroy']);
    Route::post('upload-img', [UserController::class, 'uploadImg']);
    Route::get('get-user-detail/{countryId?}/{provinceId?}/{districtId?}/{cityId?}', [UserController::class, 'getUserDetails']);
    Route::post('add_research_publication', [UserController::class, 'addResearchAndPublication']);
    Route::get('get_research_publications/{userId}', [UserController::class, 'getResearchAndPublication']);
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
    Route::get('application_requirement', [AnnouncementController::class, 'applicationRequirements']);
    Route::post('post', [AnnouncementController::class, 'create']);
    Route::put('put/{id}', [AnnouncementController::class, 'update']);
    Route::get('get/{id}', [AnnouncementController::class, 'show']);
    Route::delete('delete/{id}', [AnnouncementController::class, 'destroy']);
    Route::post('report/get', [AnnouncementController::class, 'generateReport']);
    Route::post('/report/applications', [AnnouncementController::class, 'downloadApplicationsReport']);
    Route::post('/report/experience', [AnnouncementController::class, 'downloadApplicationExperienceReport']);
    Route::post('report/candidates', [AnnouncementController::class, 'downloadCandidatesReport']);;
});

Route::get('/announcement/get/recent_announcements', [AnnouncementController::class, 'getSixMonthOldAnnouncements']);

Route::prefix('application')->group(function() {
    Route::get('get', [ApplicationController::class, 'index']);
    Route::get('get/{id}', [ApplicationController::class, 'show']);
    Route::get('get_by_announcement/{announcementId}', [ApplicationController::class, 'getApplicationsByAnnouncementId']);
    Route::post('post', [ApplicationController::class, 'create']);
    Route::put('put/{id}', [ApplicationController::class, 'update']);
    Route::post('application_requirement', [ApplicationController::class, 'applicationRequirements']);
//    Route::get('get/{id}', [ApplicationController::class, 'show']);
    Route::delete('delete/{id}', [ApplicationController::class, 'destroy']);
    Route::get('get_by_user_id/{userId?}', [ApplicationController::class, 'getByUserId']);
    Route::get('verify-challan/{application_id}', [ApplicationController::class, 'verifyChallan']);
    Route::put('update-user/{id}', [ApplicationController::class, 'updateUserApplicationData']);
    Route::post('payment/report/get', [ApplicationController::class, 'getPaymentReport']);
    Route::put('payment/import', [ApplicationController::class, 'importPaidApplications']);

    Route::get('qualifications/get/{id}', [ApplicationQualificationController::class, 'getUserApplicationQualifications']);
    Route::put('qualifications/update/{id}', [ApplicationQualificationController::class, 'updateUserApplicationQualifications']);
    Route::get('experience/get/{id}', [ApplicationExperienceController::class, 'getUserApplicationExperience']);
    Route::put('experience/update/{id}', [ApplicationExperienceController::class, 'updateUserApplicationExperience']);
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

Route::prefix('institute')->group(function() {
   Route::get('/get', [InstituteController::class, 'index']);
   Route::get('/type/get', [InstituteController::class, 'getInstTypes']);
   Route::post('post', [InstituteController::class, 'create']);
   Route::put('put/{id}', [InstituteController::class, 'update']);
});

Route::get('/announcement/recent/{cutoff?}', [AnnouncementController::class, 'getRecentAnnouncements']);
Route::post('/assign_role', [UserRoleController::class, 'assignRole']);
Route::get('/delete_role/{roleId}', [UserRoleController::class, 'destroy']);

Route::get('/get_payments', [ApplicationController::class, 'getPayments']);

Route::get('/debug-token', function (Request $request) {
    $header = $request->header('Authorization');
    return response()->json([
        'authorization_header' => $header,
        'token_parts' => explode('.', str_replace('Bearer ', '', $header ?? '')),
    ]);
});


Route::get('/test-token', function () {
    try {
        $user = JWTAuth::parseToken()->authenticate();
        return response()->json(['user' => $user]);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 401);
    }
});

