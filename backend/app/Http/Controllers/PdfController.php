<?php

namespace App\Http\Controllers;

use App\Services\PdfService;
use App\Models\Application;

class PdfController extends Controller
{
    public function generateChallan(PdfService $pdfService, $id)
    {
//        dd($id);
        $id = base64_decode($id);
        $data = Application::with(['announcement.qualification_requirements.degree', 'announcement.department'])->find($id);

        $_param = array (
            'p_ConsumerNumber'=> env('SECTION_ACCOUNT_ID') . sprintf("%07d", $id),
            'p_UserName'=> env('PAYMENT_VERIFY_USERNAME'),
            'p_Password'=> env('PAYMENT_VERIFY_PASSWORD')
        );

//        Verify Challan
        $verifyResponse = postCURL(env('PAYMENT_VERIFY_API'), $_param);
//        dd($verifyResponse);
        if($verifyResponse['response_code'] == 200) {
            $params = array(
                'CHALLAN_NO' => env('SECTION_ACCOUNT_ID') . sprintf("%07d", $id),
                'REF_NO' => $data->APPLICATION_ID,
//                'AMOUNT' => $data->announcement->APPLICATION_FEE,
                'AMOUNT_AsFTER_DUE_DATE' => $data->announcement->APPLICATION_FEE,
                'DUE_DATE' => $data->announcement->END_DATE
            );
        }
        else {
//        Upload Challan
        $params = array(
            'CHALLAN_NO' => env('SECTION_ACCOUNT_ID') . sprintf("%07d", $id),
            'SECTION_ACCOUNT_ID' => env('SECTION_ACCOUNT_ID'),
            'REF_NO' => $data->APPLICATION_ID??'',
            'DESCRIPTION' => 'APPLICATION PROCESSING FEE',
            'AMOUNT' => $data->announcement->APPLICATION_FEE??'',
            'CHALLAN_DATE'=>date('Y-m-d'),
            'CNIC_NO' => $data->CNIC_NO??'',
            'NAME' => $data->FIRST_NAME??'',
            'FNAME' => $data->FNAME??'',
            'SURNAME' => $data->LAST_NAME??'',
            'MOBILE_NO' => $data->MOBILE_NO??'',
            'EMAIL' => $data->EMAIL??'',
            'PROGRAM' => $data->announcement->ANNOUNCEMENT_TITLE??'',
//            'POSITION' => $data->announcement->POSITION_NAME??'',
            'DEPT_NAME' => $data->announcement->department->DEPT_NAME??'',
            'DUE_DATE' => $data->announcement->END_DATE??'',
            'AMOUNT_AFTER_DUE_DATE' => $data->announcement->APPLICATION_FEE??'',
            'TYPE_CODE' => env('TYPE_CODE')
        );
        }

//        dd($params);


        $response = postCURL(env('PAYMENT_URL'), $params);

        if($response['response_code'] == 502) {
            dd($response);
            die('Please try again after some time!');
        }

//        dd($response);
        $pdfContent = $pdfService->generatePdf($data);

        return $pdfContent;

//        return response($pdfContent, 200)
//            ->header('Content-Type', 'application/pdf')
//            ->header('Content-Disposition', 'inline; filename="demo.pdf"');
    }

    public function generateApplication(PdfService $pdfService, $id)
    {
        $id = base64_decode($id);
        $data = Application::with('announcement.qualification_requirements.degree')->find($id);
        $pdfContent = $pdfService->generateApplicationPdf($data);;
        return $pdfContent;
    }

}
