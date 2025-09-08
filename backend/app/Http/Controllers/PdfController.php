<?php

namespace App\Http\Controllers;

use App\Services\PdfService;
use App\Models\Application;

class PdfController extends Controller
{
    public function generateChallan(PdfService $pdfService, $id)
    {
        $id = base64_decode($id);
        $data = Application::with('announcement.qualification_requirements.degree')->find($id);

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
