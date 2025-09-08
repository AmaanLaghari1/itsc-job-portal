<?php

namespace App\Services;

use FPDF;
use App\Services\ApplicationPDF;
use App\Services\ChallanPDF;

class PdfService
{
    protected $challanPDF;
    protected $applicationPDF;

    public function __construct($applicationId = null)
    {
        $this->challanPDF = new ChallanPDF('L', 'mm', 'A4');
        $this->applicationPDF = new ApplicationPDF('P', 'mm', 'A4');
    }

    public function generatePdf($applicationData)
    {
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
        $this->challanPDF->myFunction("MIS COPY", $x, $challan, $applicationData);

        return $this->challanPDF->Output('I');
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
        $this->SectionTitle('Personal Information' . dirname(base_path()));
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

    public function generateApplicationPdf($applicationData)
    {
//        return $applicationData;
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

        $this->applicationPDF->Output('I');
        exit;
    }
}
