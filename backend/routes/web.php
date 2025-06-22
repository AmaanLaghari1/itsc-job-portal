<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PdfController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test', function () {
    $_param = array(
        'CHALLAN_NO' => '70'.sprintf('%07d', 1),
        'REF_NO' => '70'.sprintf('%07d', 1),
        'SECTION_ACCOUNT_ID' => 70,
        'CHALLAN_DATE' => date('Y-m-d'),
        'DUE_DATE' => date('Y-m-d', strtotime('+7 days')),
        'AMOUNT_AFTER_DUE_DATE' => 200,
    );
    $response = postCURL('https://itsc.usindh.edu.pk/payments/challan/upload', $_param);
    dd($response);
});

Route::get('/test2', function () {
    $_param = array(
        "p_UserName" => env('PAYMENT_INQUIRY_USERNAME'),
        "p_Password" => env('PAYMENT_INQUIRY_PASSWORD'),
        "p_ConsumerNumber" => env('PAYMENT_INQUIRY_CONSUMER_NO')
    );

    $response = postCURL(env('PAYMENT_INQUIRY_API'), $_param);
    dd($response);
});


Route::get('/pdf/{id?}', [PdfController::class, 'generateChallan']);
Route::get('/application-pdf/{id?}', [PdfController::class, 'generateApplication']);


