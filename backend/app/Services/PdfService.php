<?php

namespace App\Services;

use FPDF;

class PdfService
{
    protected $pdf;
    protected $applicationPDF;

    public function __construct($applicationId = null)
    {
        $this->pdf = new FPDF('L', 'mm', 'A4');
        $this->applicationPDF = new FPDF('P', 'mm', 'A4');
    }

    // Custom header for challan PDF
    protected function addChallanHeader(FPDF $pdf)
    {
        $pdf->SetFont('Arial', 'B', 15);
        // You can add any institution-specific header here
    }

    public function addSpaceY($space=0){
        // Additional Space
        return $this->applicationPDF->Cell(30, $space, '', 0, 1, 'L');
    }

    // Custom header for application PDF
    protected function addApplicationHeader(FPDF $pdf)
    {
        $this->applicationPDF->SetXY(0, 0);
        $this->applicationPDF->SetFont('Arial', 'B', 10);

        // Additional Space
        $this->addSpaceY(5);

        $this->applicationPDF->SetFont('Arial', 'B', 16);
        $this->applicationPDF->SetTextColor(0, 0, 0);
        $this->applicationPDF->Cell(190, 10, 'University of Sindh', 0, 1, 'C');
        $this->applicationPDF->SetFont('Arial', 'B', 12);
        $this->applicationPDF->Cell(190, 10, 'Application Form', 0, 1, 'C');

        $this->applicationPDF->Image(public_path('images/usindh-logo2.PNG'), 10, 5, 20, 20, '', '');
        $this->applicationPDF->Image(public_path('images/qr_frame.png'), 180, 5, 20, 20, '', '');

        $this->applicationPDF->Ln(5);
//        $this->applicationPDF->addSpaceY(5);
    }

    protected function line($x)
    {
        $this->pdf->Line($x + 70, 5, $x + 70, 213);
    }

    protected function myFunction($copy, $x, $challan, $applicationData)
    {
        $pdf = $this->pdf;

        $stdName = $applicationData->FIRST_NAME;
        $fName = $applicationData->FNAME;
        $surName = $applicationData->LAST_NAME;
        $applicationId = 9;

        $fee_label = "APPLICATION FEE";
        $fee_amount = $applicationData->announcement->APPLICATION_FEE ?? 0;
        $due = 0;
        $total_amount = ($fee_amount + $due);
        $category_name = "JOB APPLICATION";

        $valid_upto = $challan['PAYMENT_DUE_DATE'] ?? "EXPIRED";
        $allotment_expiry = ($challan['EXPIRY'] ?? "00-00-0000") === "00-00-0000" ? '' : $challan['EXPIRY'];

        $account_no = "00427991822903";
        $campus_name = "JAMSHORO";

        $challan_no = 9977867678;
        $oneBillID = 67677677;
        $challan_date = "07-09-2025";
        $cnic_no = $applicationData->CNIC_NO ?? "";
        $mobile_no = $applicationData->MOBILE_NO ?? "";
        $email = $applicationData->EMAIL ?? "";
        $program_title = $applicationData->PROGRAM_TITLE ?? "BS";
        $dept_name = "Software Engineering";
        $shift = "Morning";
        $payment_due_date_db = "07-09-2025";
        $type_code = "456";
        $challan_type_id = "234";
        $current_date = date("d-m-Y");

        $pdf->SetFont('Arial', '', 12);
        $pdf->setTextColor(247, 7, 7);
        $pdf->text(85, 195, "Please DO NOT pay this challan at Easypaisa/ UBL Omni/ TCS/ JazzCash.");
        $pdf->setTextColor(0, 0, 0);

        // Logos
        $pdf->Image(public_path('images/usindh_logo.png'), 5 + $x, 3, 18);
        $pdf->Image(public_path('images/1bill.jpeg'), 25 + $x, 4, 15);
        $pdf->Image(public_path('images/HBL_logo.png'), 23 + $x, 17, 23);

        $pdf->SetFont('Times', '', 8);
        $pdf->text(8 + $x, 25, $copy);
        $pdf->text(37 + $x, 25, "Print Date: $current_date");

        $height = 23;
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->text($x + 12, $height + 7, "University of Sindh Jamshoro");
        $pdf->SetFont('Arial', 'B', 8);
        $pdf->text($x + 4, $height + 11, "Institutional Fee Collection: YTS-31");

        $height += 12;
        $pdf->SetFont('Times', 'B', 13);
        $pdf->SetXY($x + 3, $height);
        $pdf->MultiCell(65, 6, '1-Bill ID', 1, "C");

        $height += 6;
        $pdf->SetXY($x + 3, $height);
        $pdf->Cell(65, 6, $oneBillID, 1, "", "C");

        $height += 6;
        $pdf->SetXY($x + 3, $height);
        $pdf->Cell(32, 6, "Challan No.", 1, "", "C");
        $pdf->Cell(33, 6, $challan_no, 1, "", "C");

        $height += 10;
        $pdf->SetFont('Arial', '', 9);
        $pdf->text($x + 7, $height, "This challan is valid upto: $valid_upto");

        $pdf->SetFont('Arial', 'B', 10);
        $height += 2;
        $pdf->SetXY($x + 5, $height);
        $pdf->SetTextColor(255, 255, 255);
        $pdf->MultiCell(60, 6, $category_name, 1, 'C', true);
        $pdf->SetTextColor(0, 0, 0);

        $height += 9;
        $pdf->text($x + 5, $height, "APPLICATION ID:      " . str_pad($applicationId, 7, '0', STR_PAD_LEFT));

        $pdf->SetFont('Arial', '', 8);
        $height += 4;
        $pdf->text($x + 5, $height, "CNIC NO:");
        $height += 4;
        $pdf->SetFont('Arial', 'B', 9);
        $pdf->text($x + 5, $height, strtoupper($cnic_no));

        $pdf->SetFont('Arial', '', 8);
        $height += 4;
        $pdf->text($x + 5, $height, "CANDIDATE NAME:");
        $pdf->SetFont('Arial', 'B', 9);
        $height += 4;
        $pdf->text($x + 5, $height, strtoupper($stdName));

        $pdf->SetFont('Arial', '', 8);
        $height += 4;
        $pdf->text($x + 5, $height, "FATHER'S NAME:");
        $pdf->SetFont('Arial', 'B', 9);
        $height += 4;
        $pdf->text($x + 5, $height, strtoupper($fName));

        $pdf->SetFont('Arial', '', 8);
        $height += 4;
        $pdf->text($x + 5, $height, "SURNAME:");
        $pdf->SetFont('Arial', 'B', 9);
        $height += 4;
        $pdf->text($x + 5, $height, strtoupper($surName));

        $pdf->SetFont('Arial', '', 8);
        $height += 4;
        $pdf->text($x + 5, $height, "MOBILE NO:");
        $pdf->SetFont('Arial', 'B', 9);
        $height += 3;
        $pdf->text($x + 5, $height, strtoupper($mobile_no));

        if ($challan_type_id != 8) {
            $pdf->SetFont('Arial', '', 8);
            $height += 4;
            $pdf->text($x + 5, $height, "POSITION APPLIED:");
            $pdf->SetFont('Arial', 'B', 9);
            $pdf->SetXY($x + 4, $height);
            $pdf->MultiCell(65, 4, strtoupper($campus_name), 0, "L");

            $pdf->SetFont('Arial', '', 8);
            $height += 7;
            $pdf->text($x + 5, $height, "DEPARTMENT:");
            $pdf->SetFont('Arial', 'B', 9);
            $pdf->SetXY($x + 4, $height += 1);
            $pdf->MultiCell(65, 4, "$dept_name", 0, "L");
        }

        $pdf->SetXY($x + 3, $height += 3);
        $pdf->SetFont('Times', 'B', 9);
        $pdf->Cell(40, 6, "$fee_label", 1, "", "R");
        $pdf->Cell(25, 6, "Rs. " . number_format($fee_amount, 2), 1, "", "R");

        $pdf->SetXY($x + 3, $height += 6);
        $pdf->Cell(40, 6, "DUES", 1, "", "R");
        $pdf->Cell(25, 6, "Rs. " . number_format($due, 2), 1, "", "R");

        $pdf->SetXY($x + 3, $height += 6);
        $pdf->Cell(40, 6, "TOTAL FEE", 1, "", "R");
        $pdf->Cell(25, 6, "Rs. " . number_format($total_amount, 2), 1, "", "R");

        $pdf->SetXY($x + 3, $height += 7);
        $pdf->SetFont('Arial', '', 7);
        $pdf->MultiCell(65, 4, "                           IMPORTANT NOTE
         This paid amount (Rs: " . number_format($total_amount, 2) . "/=) is non-transferable. In case any applicant submitted / provided wrong information (detected at any stage), his/her challan shall be cancelled. The University of Sindh reserves the right to rectify any error / omission detected at any stage.", 1, "L");
    }

    public function generatePdf($applicationData)
    {
        $this->pdf->AddPage();
        $this->addChallanHeader($this->pdf);

        $challan = [
            'PAYMENT_DUE_DATE' => date("d-m-Y"),
            'EXPIRY' => '00-00-0000',
        ];

        $x = 7;
        $this->myFunction("BANK COPY", $x, $challan, $applicationData);
        $this->line($x);

        $x = 75;
        $this->myFunction("FINANCE COPY", $x, $challan, $applicationData);
        $this->line($x);

        $x = 145;
        $this->myFunction("CANDIDATE COPY", $x, $challan, $applicationData);
        $this->line($x);

        $x = 215;
        $this->myFunction("MIS COPY", $x, $challan, $applicationData);

        return $this->pdf->Output('I');
    }


//    Application Form Methods
    function SectionTitle($title)
    {
//        $this->applicationPDF->SetFillColor(0, 0, 0); // dark purple header
//        $this->applicationPDF->SetTextColor(255);
        $this->applicationPDF->SetFont('Arial', 'B', 10);
        $this->applicationPDF->Cell(0, 10, $title, 1, 1, 'L', true);
        $this->applicationPDF->SetTextColor(0);
    }

    function LineLabel($label, $width = 40)
    {
        $this->applicationPDF->SetFont('Arial', '', 10);
        $this->applicationPDF->Cell($width, 8, $label, 0, 0);
        $this->applicationPDF->Cell(0, 8, '', 'B', 1);
    }

    public function applicationContent($data)
    {
        //        Position Applied
        $this->applicationPDF->SetFillColor(255); // dark purple header
//        $this->applicationPDF->SetTextColor(255);
        $this->applicationPDF->SetFont('Arial', 'B', 10);
        $this->applicationPDF->Cell(40, 10, 'Position Applied For:', 0, 0, 'L', true);
        $this->applicationPDF->SetTextColor(0);
//        $this->SectionTitle('Web Developer');
        $this->applicationPDF->Cell(50, 10, 'Web Developer', 0, 1, 'L', true);


//        Space
        $this->applicationPDF->ln(2);
//      Personal Info
        $this->SectionTitle('Personal Information');

        $this->applicationPDF->Image(public_path('images/passport-sized-photo.jpeg'), 165, 53, 35, 40);
//        $this->LineLabel('Surname');
        $this->applicationPDF->Cell(40, 7, 'Name', 1, 0, 'L', true);
        $this->applicationPDF->Cell(110, 7, 'Amaan Laghari', 1, 1, 'L', true);
        $this->applicationPDF->Cell(40, 7, 'Father\'s Name', 1, 0, 'L', true);
        $this->applicationPDF->Cell(110, 7, 'Amaan Laghari', 1, 1, 'L', true);
        $this->applicationPDF->Cell(40, 7, 'Email', 1, 0, 'L', true);
        $this->applicationPDF->Cell(110, 7, 'Amaan Laghari', 1, 1, 'L', true);
        $this->applicationPDF->Cell(40, 7, 'CNIC No.', 1, 0, 'L', true);
        $this->applicationPDF->Cell(110, 7, 'Amaan Laghari', 1, 1, 'L', true);
        $this->applicationPDF->Cell(40, 7, 'Date of Birth', 1, 0, 'L', true);
        $this->applicationPDF->Cell(110, 7, 'Amaan Laghari', 1, 1, 'L', true);
        $this->applicationPDF->Cell(40, 7, 'Mobile No.', 1, 0, 'L', true);
        $this->applicationPDF->Cell(110, 7, 'Amaan Laghari', 1, 1, 'L', true);

//        $this->LineLabel('Given name');
//        $this->LineLabel('Preferred name');
//        $this->LineLabel('Address');
//        $this->LineLabel('Work phone');
//        $this->LineLabel('Home phone');
//        $this->LineLabel('Mobile phone');
//        $this->LineLabel('Email');
    }

    public function generateApplicationPdf($applicationData)
    {
        if (ob_get_length()) {
            ob_end_clean();
        }

        header('Content-Type: application/pdf');
        header('Content-Disposition: inline; filename="application.pdf"');
        $this->applicationPDF->AddPage('P');
        $this->addApplicationHeader($this->applicationPDF);

        $this->applicationContent($applicationData);

        $this->applicationPDF->Output('I');
        exit;
    }
}
