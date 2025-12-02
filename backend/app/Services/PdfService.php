<?php

namespace App\Services;

use App\Services\ApplicationPDF;
use Carbon\Carbon;
use FPDF;
use App\Services\ChallanPDF;

class PdfService
{
    protected $challanPDF;
    protected $applicationPDF;

    protected $applicationReportPdf;

    public function __construct($applicationId = null)
    {
        $this->challanPDF = new ChallanPDF('L', 'mm', 'A4');
        $this->applicationPDF = new ApplicationPDF('P', 'mm', 'A4');
//        $this->applicationReportPdf = new ApplicationReportPDF('L', 'mm', 'Legal');
        $this->applicationReportPdf = new ApplicationReportPDF('L', 'mm', 'A3');
        $this->applicationReportPdf->AliasNbPages();     // Enable {nb}
    }

    public function generatePdf($applicationData)
    {
//        dd();
        $this->challanPDF->AddPage('L');

        $challan = [
            'PAYMENT_DUE_DATE' => date("d-m-Y"),
            'EXPIRY' => '00-00-0000',
        ];

        $x = 7;
        $this->challanPDF->myFunction("BANK COPY", $x, $challan, $applicationData);
        $this->challanPDF->myLine($x);

        $x = 75;
        $this->challanPDF->myFunction("FINANCE COPY", $x, $challan, $applicationData);
        $this->challanPDF->myLine($x);

        $x = 145;
        $this->challanPDF->myFunction("CANDIDATE COPY", $x, $challan, $applicationData);
        $this->challanPDF->myLine($x);

        $x = 215;
        $this->challanPDF->myFunction("OFFICE COPY", $x, $challan, $applicationData);

        return $this->challanPDF->Output('I', $this->challanPDF->file_name.'.pdf');
    }


//    Application Form Methods
    function SectionTitle($title, $w=0)
    {
//        $this->applicationPDF->SetFillColor(0, 0, 0); // dark purple header
//        $this->applicationPDF->SetTextColor(255);
        $this->applicationPDF->SetFont('Arial', 'B', 10);
        $this->applicationPDF->Cell($w, 8, $title, 1, 1, 'L', true);
//        $this->applicationPDF->SetTextColor(0);
    }

    public function setFontStyle($style='', $font='Times', $size=10, $align='L')
    {
        $this->applicationPDF->setFont($font, $style, $size, $align);
    }

    public function applicationContent($data)
    {
        $this->applicationPDF->Image($this->applicationPDF->getQrCode($data['APPLICATION_NO']), 180, 5, 20, 20, '', '');

//        $this->applicationPDF->Image(public_path('images/qr_frame.png'), 180, 5, 20, 20, '', '');

        //        Position Applied
        $this->applicationPDF->SetFillColor(255); // dark purple header
//        $this->applicationPDF->SetTextColor(255);
        $this->setFontStyle('');
        $this->applicationPDF->Cell(35, 6, 'Application No:', 0, 0, 'L', true);
        $this->applicationPDF->SetTextColor(0);
        $this->setFontStyle('B');
        $this->applicationPDF->Cell(0, 6, $data['APPLICATION_NO'], 0, 1, 'L', true);
        $this->setFontStyle('');
        $this->applicationPDF->Cell(35, 6, 'Reference No:', 0, 0, 'L', true);
        $this->applicationPDF->SetTextColor(0);
        $this->setFontStyle('B');
        $this->applicationPDF->Cell(0, 6, $data['REF_NO'], 0, 1, 'L', true);

        $this->applicationPDF->fieldWithLabel('Position Applied For:', $data['POSITION_APPLIED_FOR'], 35, 0, 6, 0, 'L');

        if($data['APPLICATION_FEE'] !== ''){
            $this->setFontStyle('');
            $this->applicationPDF->Cell(50, 7, 'Application Processing Fee', 1, 0, 'L', true);
            $this->setFontStyle('B');
            $this->applicationPDF->Cell(20, 7, $data['APPLICATION_FEE'], 1, 0, 'L', true);
            $this->setFontStyle('');
            $this->applicationPDF->Cell(30, 7, 'Challan No.', 1, 0, 'L', true);
            $this->setFontStyle('B');
            $this->applicationPDF->Cell(30, 7, $data['CHALLAN_NO'], 1, 0, 'L', true);
            $this->setFontStyle('');
            $this->applicationPDF->Cell(30, 7, 'Payment Date', 1, 0, 'L', true);
            $this->setFontStyle('B');
            $this->applicationPDF->Cell(30, 7, $data['PAYMENT_DATE'], 1, 1, 'L', true);
        }

        $imagePath = realpath(base_path('../resource/uploads/' . $data['PROFILE_IMAGE']));

//        Space
        $this->applicationPDF->ln(2);
//      Personal Info
        $this->SectionTitle('Personal Information');
        $y = $this->applicationPDF->GetY();
//        $this->applicationPDF->Image(base_path('../resource/uploads/' . $data['PROFILE_IMAGE']), 161, $y+1, 39, 40);
        $this->applicationPDF->Image(dirname(base_path()) . '/resource/uploads/' . $data['PROFILE_IMAGE'], 161, $y+1, 39, 40);
//        $this->LineLabel('Surname');

        $this->setFontStyle('');
        $this->applicationPDF->Cell(40, 7, 'Name', 1, 0, 'L', true);
        $this->setFontStyle('B');
        $this->applicationPDF->Cell(110, 7, $data['NAME'], 1, 1, 'L', true);
        $this->setFontStyle('');
        $this->applicationPDF->Cell(40, 7, 'Surname', 1, 0, 'L', true);
        $this->setFontStyle('B');
        $this->applicationPDF->Cell(110, 7, $data['SURNAME'], 1, 1, 'L', true);
        $this->setFontStyle('');
        $this->applicationPDF->Cell(40, 7, 'Father\'s Name', 1, 0, 'L', true);
        $this->setFontStyle('B');
        $this->applicationPDF->Cell(110, 7, $data['FNAME'], 1, 1, 'L', true);
        $this->setFontStyle('');
        $this->applicationPDF->Cell(40, 7, 'Email', 1, 0, 'L', true);
        $this->setFontStyle('B');
        $this->applicationPDF->Cell(110, 7, $data['EMAIL'], 1, 1, 'L', true);
        $this->setFontStyle('');
        $this->applicationPDF->Cell(40, 7, 'CNIC No.', 1, 0, 'L', true);
        $this->setFontStyle('B');
        $this->applicationPDF->Cell(110, 7, $data['CNIC_NO'], 1, 1, 'L', true);
        $this->setFontStyle('');
        $this->applicationPDF->Cell(40, 7, 'Mobile No.', 1, 0, 'L', true);
        $this->setFontStyle('B');
        $this->applicationPDF->Cell(110, 7, $data['MOBILE_NO'], 1, 1, 'L', true);
        $this->setFontStyle('');
        $this->applicationPDF->Cell(40, 7, 'Date of Birth', 1, 0, 'L', true);
        $this->setFontStyle('B');
        $this->applicationPDF->Cell(55, 7, $data['DATE_OF_BIRTH'], 1, 0, 'L', true);
        $this->setFontStyle('');
        $this->applicationPDF->Cell(40, 7, 'Place of Birth', 1, 0, 'L', true);
        $this->setFontStyle('B');
        $this->applicationPDF->Cell(55, 7, $data['PLACE_OF_BIRTH'], 1, 1, 'L', true);
        $this->setFontStyle('');
        $this->applicationPDF->Cell(40, 7, 'Gender', 1, 0, 'L', true);
        $this->setFontStyle('B');
        $this->applicationPDF->Cell(55, 7, $data['GENDER'], 1, 0, 'L', true);
        $this->setFontStyle('');
        $this->applicationPDF->Cell(40, 7, 'Marital Status', 1, 0, 'L', true);
        $this->setFontStyle('B');
        $this->applicationPDF->Cell(55, 7, $data['MARITAL_STATUS'], 1, 1, 'L', true);
        $this->setFontStyle('');
        $this->applicationPDF->Cell(40, 7, 'Country', 1, 0, 'L', true);
        $this->setFontStyle('B');
        $this->applicationPDF->Cell(55, 7, $data['COUNTRY_NAME'], 1, 0, 'L', true);
        $this->setFontStyle('');
        $this->applicationPDF->Cell(40, 7, 'Domicile Province', 1, 0, 'L', true);
        $this->setFontStyle('B');
        $this->applicationPDF->Cell(55, 7, $data['PROVINCE_NAME'], 1, 1, 'L', true);
        $this->setFontStyle('');
        $this->applicationPDF->Cell(40, 7, 'Domicile District', 1, 0, 'L', true);
        $this->setFontStyle('B');
        $this->applicationPDF->Cell(55, 7, $data['DISTRICT_NAME'], 1, 0, 'L', true);
        $this->setFontStyle('');
        $this->applicationPDF->Cell(40, 7, 'Religion', 1, 0, 'L', true);
        $this->setFontStyle('B');
        $this->applicationPDF->Cell(55, 7, $data['RELIGION'], 1, 1, 'L', true);
        $this->setFontStyle('');
        $this->applicationPDF->fieldWithLabel('Present Address', $data['HOME_ADDRESS'], 40, 0, 7, 1, 'L');
        $this->applicationPDF->fieldWithLabel('Permanent Address', $data['PERMANENT_ADDRESS'], 40, 0, 7, 1, 'L');


        //        Space
        $this->applicationPDF->Ln(5);
//        Qualification Section
        $qualHeader = ['Degree Program', 'Board/University', 'Passing Year', 'Obtained Marks', 'Total Marks'];
        $qualData = $data['qualifications'];
        $qualColWidths = [50, 75, 20, 25, 20]; // ✅ 5 columns
        $this->SectionTitle('Qualifications');
        $this->setFontStyle('B', 'Times', 8);
        $this->applicationPDF->FancyTable($qualHeader, $qualData, $qualColWidths);;

        //        Space
        $this->applicationPDF->Ln(5);

//        Experience Section
        if(count($data['experience']) > 0){
        $this->SectionTitle('Experience');
        $expHeader = ['Organization Name', 'Employment Type', 'Start Date', 'End Date', 'Total Experience'];
        $expData = [
            ['University of Sindh', 'B.Sc. in Computer Science', '2019', '2021', 2 .'years'. ' '. '1' .'month'. ' '. '1' .'day']
        ];
        $expColWidths = [50, 50, 25, 25, 40];
        $this->setFontStyle('B', 'Times', 8);
        $this->applicationPDF->FancyTable($expHeader, $data['experience'], $expColWidths);
        $this->applicationPDF->fieldWithLabel('Total Experience', $data['total_experience'], 50, 0, 7, 1, 'L');
        }
    }

    public function generateApplicationPdf($applicationData)
    {
//        dd($applicationData->toArray());
        $requiredData = $this->applicationPDF->RequiredData($applicationData);
//        return $requiredData['qualifications'];
        if (ob_get_length()) {
            ob_end_clean();
        }

        header('Content-Type: application/pdf');
        header('Content-Disposition: inline; filename="application.pdf"');
        $this->applicationPDF->AddPage('P');
        $this->applicationPDF->setTitle('University of Sindh');

        $this->applicationContent($requiredData);

        $this->applicationPDF->Output('I', $applicationData->toArray()['APPLICATION_ID'].'.pdf');
        exit;
    }

    public function generateReportPdf($announcementIds)
    {
        $reportData = $this->applicationReportPdf->requiredData($announcementIds);

        // Must call before AddPage() for {nb}
        $this->applicationReportPdf->AliasNbPages();
        $this->applicationReportPdf->SetMargins(15, 10, 15);
        $this->applicationReportPdf->SetAutoPageBreak(true, 15);

//        foreach ($reportData as $report) {
//
//            $this->applicationReportPdf->AddPage('L', 'A3');
//            $this->applicationReportPdf->SetTitle('Career Applications Report');
//
//            /** ---------------- HEADER ------------------- **/
//            $this->applicationReportPdf->Image(public_path('images/usindh_logo.png'), 15, 5, 20, 20);
//
//            $this->applicationReportPdf->SetFont('Arial', 'B', 16);
//            $this->applicationReportPdf->SetXY(15, 10);
//            $this->applicationReportPdf->Cell(0, 10, 'UNIVERSITY OF SINDH', 0, 1, 'C');
//
//            $this->applicationReportPdf->SetFont('Arial', 'B', 10);
//            $this->applicationReportPdf->setY(25);
//
//            // Ref No
//            $this->applicationReportPdf->Cell(100, 7, 'Ref No. ' . ($report->REF_NO ?? ''), 0, 1, 'L');
//
//            // Printed date
//            $this->applicationReportPdf->setY(25);
//            $this->applicationReportPdf->Cell(0, 7, 'Printed: ' . Carbon::now()->format('d-m-Y'), 0, 1, 'R');
//
//            /** ---------------- SUB TITLE ------------------- **/
//            $this->applicationReportPdf->SetFont('Arial', 'B', 12);
//            $this->applicationReportPdf->MultiCell(0, 7, 'Position Applied For: ' . ($report->ANNOUNCEMENT_TITLE ?? ''), 0, 'C');
//
//            /** ---------------- TABLE DATA ------------------- **/
//
//            $qualHeader = [
//                'No.',
//                'Name',
//                "Father's Name",
//                'Cast',
//                'Gender',
//                'Age',
//                'SSC',
//                'HSC',
//                'BS',
//                'MPhil/MS',
//                'PhD',
//                'Domicile District',
//                'Remarks'
//            ];
//
//            $applications = $report->applications; // already an array (Eloquent relation)
//
//            $qualData = [];
//
//            foreach ($applications as $index => $application) {
//
//                $user = $application->user;
//                $qualifications = $user->qualifications ?? [];
//
//                $ssc = $this->applicationReportPdf->extractQualificationValue($qualifications, 'MATRICULATION/O-LEVEL (10TH GRADE)');
//                $hsc = $this->applicationReportPdf->extractQualificationValue($qualifications, 'INTERMIDIATE/A-LEVEL (12TH GRADE)');
//                $bs  = $this->applicationReportPdf->extractQualificationValue($qualifications, 'BACHELOR / MASTER (16 YEAR)');
//                $ms  = $this->applicationReportPdf->extractQualificationValue($qualifications, 'M.Phil / MS (18 YEAR)');
//                $phd = $this->applicationReportPdf->extractQualificationValue($qualifications, 'PHD');
//
//                $age = null;
//                if ($user->DATE_OF_BIRTH) {
//                    $age = Carbon::parse($user->DATE_OF_BIRTH)->diffInYears(Carbon::parse($report->END_DATE));
//                }
//
//                $qualData[] = [
//                    $index + 1,
//                    $user->FIRST_NAME ?? '',
//                    $user->FNAME ?? '',
//                    $user->LAST_NAME ?? '',
//                    $user->GENDER == 'M' ? 'MALE' : 'FEMALE',
//                    $age,
//                    $ssc,
//                    $hsc,
//                    $bs,
//                    $ms,
//                    $phd,
//                    $user->district->DISTRICT_NAME ?? '',
//                    ''
//                ];
//            }
//
//            /** Widths: 13 columns **/
//            $qualColWidths = [
//                10,  // No
//                30,  // Name
//                40,  // Father's Name
//                25,  // Cast
//                25,  // Gender
//                15,  // Age
//                20,  // SSC
//                20,  // HSC
//                40,  // BS
//                40,  // MS
//                40,  // PhD
//                40,  // District
//                42   // Remarks
//            ];
//
//            $alignments = [
//                'C', 'L', 'L', 'L', 'C', 'C', 'L', 'L', 'L', 'L', 'L', 'L', 'L'
//            ];
//
//            $this->applicationReportPdf->FancyTable($qualHeader, $qualData, $qualColWidths, $alignments);
//        }

        foreach ($reportData as $report) {
            // Pass dynamic data to PDF header
            $this->applicationReportPdf->ref_no = $report->REF_NO;
            $this->applicationReportPdf->announcement_title = $report->ANNOUNCEMENT_TITLE;

            $this->applicationReportPdf->AddPage('L', 'A3');
            $this->applicationReportPdf->SetTitle('Career Applications Report');

            // Draw subtitle centered under header
            $this->applicationReportPdf->SetFont('Arial', 'B', 12);
            $this->applicationReportPdf->MultiCell(0, 7, 'Position Applied For: ' . $report->ANNOUNCEMENT_TITLE, 0, 'C');

            //            /** ---------------- TABLE DATA ------------------- **/
//
            $qualHeader = [
                'No.',
                'Name',
                "Father's Name",
                'Surname',
                'Gender',
                'Age',
                'SSC',
                'HSC',
                'BS',
                'MPhil/MS',
                'PhD',
                'Domicile District',
                'Remarks'
            ];

            $applications = $report->applications; // already an array (Eloquent relation)

            $qualData = [];

            if(count($applications) == 0){
                $this->applicationReportPdf->Ln(10);
                $this->applicationReportPdf->setFont('Arial', '', 10);
                $this->applicationReportPdf->Cell(0, 7, 'No applications found for this position.', 0, 1, 'C');
            }
            else{
                foreach ($applications as $index => $application) {

                    $user = $application->user;
                    $qualifications = $user->qualifications ?? [];

                    $ssc = $this->applicationReportPdf->extractQualificationValue($qualifications, 'MATRICULATION/O-LEVEL (10TH GRADE)');
                    $hsc = $this->applicationReportPdf->extractQualificationValue($qualifications, 'INTERMIDIATE/A-LEVEL (12TH GRADE)');
                    $bs  = $this->applicationReportPdf->extractQualificationValue($qualifications, 'BACHELOR / MASTER (16 YEAR)');
                    $ms  = $this->applicationReportPdf->extractQualificationValue($qualifications, 'M.Phil / MS (18 YEAR)');
                    $phd = $this->applicationReportPdf->extractQualificationValue($qualifications, 'PHD');

                    $age = null;
                    if ($user->DATE_OF_BIRTH) {
                        $age = Carbon::parse($user->DATE_OF_BIRTH)->diffInYears(Carbon::parse($report->END_DATE));
                    }

                    $qualData[] = [
                        $index + 1,
                        $user->FIRST_NAME ?? '',
                        $user->FNAME ?? '',
                        $user->LAST_NAME ?? '',
                        $user->GENDER == 'M' ? 'MALE' : 'FEMALE',
                        $age,
                        $ssc,
                        $hsc,
                        $bs,
                        $ms,
                        $phd,
                        $user->district->DISTRICT_NAME ?? '',
                        ''
                    ];
                }
            }

           if(count($applications) > 0) {

               /** Widths: 13 columns **/
               $qualColWidths = [
                   10,  // No
                   30,  // Name
                   35,  // Father's Name
                   25,  // Surname
                   20,  // Gender
                   15,  // Age
                   20,  // SSC
                   35,  // HSC
                   40,  // BS
                   40,  // MS
                   40,  // PhD
                   40,  // District
                   40   // Remarks
               ];

               $alignments = [
                   'C', 'L', 'L', 'L', 'L', 'C', 'L', 'L', 'L', 'L', 'L', 'L', 'L'
               ];


               // Table Header
               $this->applicationReportPdf->TableHeader($qualHeader, $qualColWidths);

               // Then call FancyTable
               $this->applicationReportPdf->FancyTable($qualHeader, $qualData, $qualColWidths, $alignments);
           }
        }

        // Send PDF to browser
//        $this->applicationReportPdf->Output('I', 'report.pdf');
        return $this->applicationReportPdf->Output('S');
//        exit();
    }


}
