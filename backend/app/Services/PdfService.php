<?php

namespace App\Services;

use App\Services\ApplicationPDF;
use Carbon\Carbon;
use FPDF;
use App\Services\ChallanPDF;
use Illuminate\Support\Facades\Date;

class PdfService
{
    protected $challanPDF;
    protected $applicationPDF;

    protected $applicationReportPdf;

    protected $experienceReportPDF;

    protected $candidateInfoReportPDF;

    public function __construct($applicationId = null)
    {
        $this->challanPDF = new ChallanPDF('L', 'mm', 'A4');
        $this->applicationPDF = new ApplicationPDF('P', 'mm', 'A4');
//        $this->applicationReportPdf = new ApplicationReportPDF('L', 'mm', 'Legal');
        $this->applicationReportPdf = new ApplicationReportPDF('L', 'mm', 'A3');
        $this->applicationReportPdf->AliasNbPages();     // Enable {nb}

        $this->experienceReportPDF = new ExperienceReportPDF('P', 'mm', 'A3');
        $this->candidateInfoReportPDF = new CandidateInfoPDF('P', 'mm', 'A4');
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
        $maritalStatus = $data['MARITAL_STATUS'] == 1 ? 'SINGLE' : ($data['MARITAL_STATUS'] == 2 ? 'MARRIED' : ($data['MARITAL_STATUS'] == 3 ? 'WIDOWED' : 'DIVORCED'));
        $this->applicationPDF->Cell(55, 7, $maritalStatus, 1, 1, 'L', true);
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
        $qualColWidths = [50, 75, 20, 25, 20]; // 5 columns
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
            $estimatedHeight = 20; // adjust based on layout
            $this->checkPageBreak($estimatedHeight);
        $this->applicationPDF->fieldWithLabel('Total Experience', $data['total_experience'], 50, 0, 7, 1, 'L');
        }
    }

    function checkPageBreak($height)
    {
        $pageHeight = $this->applicationPDF->GetPageHeight();

        // assume bottom margin ~15
        if ($this->applicationPDF->GetY() + $height > ($pageHeight - 15)) {
            $this->applicationPDF->AddPage();
        }
    }

    public function designProjectExhibitionSection($data){
        if(count($data) > 0){
            $this->applicationPDF->addPage();
            $this->applicationPDF->setTitle('University of Sindh');
            $this->applicationPDF->SetFont('Arial', 'B', 12);
            $this->applicationPDF->Cell(0, 7, 'Design Projects / Exhibitions', 0, 1, 'L');

            $this->applicationPDF->Ln(5);
            $this->applicationPDF->SetFont('Arial', '', 10);

            foreach ($data as $row) {
                $estimatedHeight = 40; // adjust based on layout
                $this->checkPageBreak($estimatedHeight);

                $this->applicationPDF->SetFont('Arial', '', 10);
                $this->applicationPDF->fieldWithLabel('Project / Exhibition Title', $row->TITLE, 45, 0, 7, 1, 'L');
                $header = [
                    'Client / Sponsor',
                    'Nature of Project / Exhibition',
                    'Date',
                    'Venue'
                ];

                $values = [
                    [
                        $row->CLIENT,
                        $row->NATURE_OF_PROJECT,
                        Date::make($row->DATE)->format('d-m-Y'),
                        $row->VENUE,
                    ]
                ];

                $colWidths = [45, 90, 25, 30];

                $this->applicationPDF->FancyTable($header, $values, $colWidths, $headerStyle='');

                $this->applicationPDF->Ln(2);
            }
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

        if(count($requiredData['RESEARCH_PUBLICATIONS']) > 0){
            $this->applicationPDF->addPage();
            $this->applicationPDF->setTitle('University of Sindh');
            $this->applicationPDF->SetFont('Arial', 'B', 12);
            $this->applicationPDF->Cell(0, 7, 'Research Publications', 0, 1, 'L');

            $this->applicationPDF->Ln(5);
            $this->applicationPDF->SetFont('Arial', '', 10);

            foreach ($requiredData['RESEARCH_PUBLICATIONS'] as $publication) {
                $estimatedHeight = 50; // adjust based on layout
                $this->checkPageBreak($estimatedHeight);

                $this->applicationPDF->SetFont('Arial', '', 10);
                $this->applicationPDF->fieldWithLabel('Research Title', $publication->RESEARCH_TITLE, 30, 0, 7, 1, 'L');
                $header = [
                    'ISSN No.',
                    'Author No.',
                    'Corresponding Author',
                    'Research Journal Name',
                    'Publication Year'
                ];

                $values = [
                    [
                        $publication->ISSN_NO,
                        $publication->AUTHOR_NO,
                        $publication->CORRESPONDING_AUTHOR == 1 ? 'Yes' : 'No',
                        $publication->RESEARCH_JOURNAL,
                        $publication->PUBLICATION_YEAR??'-'
                    ]
                ];

                $colWidths = [30, 25, 30, 75, 30];

                $this->applicationPDF->FancyTable($header, $values, $colWidths, $headerStyle='');

                $this->applicationPDF->fieldWithLabel('Source', $publication->RESEARCH_JOURNAL_LINK??'NA', 30, 0, 7, 1, 'L');


                $this->applicationPDF->Ln(2);
            }
        }

        $this->designProjectExhibitionSection($requiredData['PROJECT_EXHIBITIONS']);

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

    public function generateExperienceReportPdf($announcementIds)
    {
        $reportData = $this->experienceReportPDF->requiredData($announcementIds);

        // Must call before AddPage() for {nb}
        $this->experienceReportPDF->AliasNbPages();
        $this->experienceReportPDF->SetMargins(15, 10, 15);
        $this->experienceReportPDF->SetAutoPageBreak(true, 15);


        foreach ($reportData as $report) {
            // Pass dynamic data to PDF header
            $this->experienceReportPDF->ref_no = $report->REF_NO;
            $this->experienceReportPDF->announcement_title = $report->ANNOUNCEMENT_TITLE;

            $this->experienceReportPDF->AddPage('P', 'A3');
            $this->experienceReportPDF->SetTitle('Career Applications Experience Report');

            // Draw subtitle centered under header
            $this->experienceReportPDF->SetFont('Arial', 'B', 12);
            $this->experienceReportPDF->MultiCell(0, 7, 'Position Applied For: ' . $report->ANNOUNCEMENT_TITLE, 0, 'C');

            //            /** ---------------- TABLE DATA ------------------- **/

            $qualHeader = [
                'No.',
                'Name',
                "Father's Name",
                'Surname',
                'Experience Duration',
                'Current Experience'
            ];

            $applications = $report->applications; // already an array (Eloquent relation)

            $qualData = [];

            if(count($applications) == 0){
                $this->experienceReportPDF->Ln(10);
                $this->experienceReportPDF->setFont('Arial', '', 9);
                $this->experienceReportPDF->Cell(0, 7, 'No applications found for this position.', 0, 1, 'C');
            }
            else{
                foreach ($applications as $index => $application) {

                    $user = $application->user;
                    $experiences = $user->experiences ?? [];

                    $totalDays = 0;

                    foreach ($experiences as $experience) {
                        $start_date = Carbon::parse($experience->START_DATE);
                        $end_date = $experience->END_DATE
                            ? Carbon::parse($experience->END_DATE)
                            : Carbon::now(); // if still working

                        $totalDays += $end_date->diffInDays($start_date);
                    }

                    $duration = Carbon::now()->addDays($totalDays)->diff(Carbon::now());

                    $experienceDurationText =
                        $duration->y . ' Years, ' .
                        $duration->m . ' Months, ' .
                        $duration->d . ' Days';

                    // ------------------ CURRENT EXPERIENCE (MOST RECENT JOB) --------------------

                    $currentExpText = 'N/A';
                    $currentJobTitle = '';
                    $currentJobDesc = '';

                    if ($experiences->count() > 0) {

                        // Sort by END_DATE or fallback to START_DATE
                        $latestExperience = $experiences
                            ->sortByDesc(function ($e) {
                                return $e->END_DATE
                                    ? Carbon::parse($e->END_DATE)
                                    : Carbon::now();   // null END_DATE → most recent
                            })
                            ->first();


                        $cStart = Carbon::parse($latestExperience->START_DATE);
                        $cEnd = $latestExperience->END_DATE
                            ? Carbon::parse($latestExperience->END_DATE)
                            : Carbon::now();

                        $cDuration = $cEnd->diff($cStart);

                        $currentExpText =
                            $cDuration->y . ' Years, ' .
                            $cDuration->m . ' Months, ' .
                            $cDuration->d . ' Days';

                        $currentJobTitle = $latestExperience->JOB_TITLE ?? 'N/A';
                        $currentJobDesc  = $latestExperience->JOB_DESCRIPTION ?? 'N/A';
                    }

                    // Combine for PDF column:
                    $currentExperience = $duration->y == 0 && $duration->m == 0 && $duration->d == 0 ? 'N/A' :
                        "Title: $currentJobTitle\n" .
                        "Description: $currentJobDesc\n" .
                        "Duration: $currentExpText";

                    $qualData[] = [
                        $index + 1,
                        $user->FIRST_NAME ?? '',
                        $user->FNAME ?? '',
                        $user->LAST_NAME ?? '',
                        $duration->y == 0 && $duration->m == 0 && $duration->d == 0 ? 'N/A' : $experienceDurationText,
                        $currentExperience??'N/A'
                    ];
                }
            }

            if(count($applications) > 0) {

                /** Widths: 13 columns **/
                $qualColWidths = [
                    10,  // No
                    35,  // Name
                    40,  // Father's Name
                    25,  // Surname
                    55, // Experience Duration
                    100 // Current Experience
                ];

                $alignments = [
                    'C', 'L', 'L', 'L', 'L', 'L'
                ];


                // Table Header
                $this->experienceReportPDF->TableHeader($qualHeader, $qualColWidths);

                // Then call FancyTable
                $this->experienceReportPDF->FancyTable($qualHeader, $qualData, $qualColWidths, $alignments);
            }
        }

        // Send PDF to browser
//        $this->applicationReportPdf->Output('I', 'report.pdf');
        return $this->experienceReportPDF->Output('S');
//        exit();
    }

    public function generateCandidateReportPdf($announcementIds){
        $reportData = $this->candidateInfoReportPDF->requiredData($announcementIds);

        // Must call before AddPage() for {nb}
        $this->candidateInfoReportPDF->AliasNbPages();
        $this->candidateInfoReportPDF->SetMargins(15, 10, 15);
        $this->candidateInfoReportPDF->SetAutoPageBreak(true, 15);


        $qualColWidths = [
            10, // Sno
            40,  // Name
            45,  // Email
            25,  // CNIC
            30, // Mobile No.
            30 // Apply Date
        ];

        $alignments = [
            'C', 'L', 'L', 'L', 'L', 'L'
        ];

        foreach ($reportData as $announcement){
            $this->candidateInfoReportPDF->AddPage('P', 'A4');
            $this->candidateInfoReportPDF->SetTitle('Candidate Information Report');
            $this->candidateInfoReportPDF->setFont('Arial', 'B', 12);
            $this->candidateInfoReportPDF->MultiCell(0, 7, $announcement->ANNOUNCEMENT_TITLE, 0, 'C');
            $tableData = [];

                foreach ($announcement->applications as $i => $application) {
                    $user = $application->user;
                    $tableHeaders = ['SNo.', 'Name', 'Email', 'CNIC No.', 'Mobile No.', 'Application Date'];

                    $tableData[] = [
                        $i + 1,
                        $user->FIRST_NAME ?? '',
                        $user->EMAIL ?? '',
                        $user->CNIC_NO ?? '',
                        $user->MOBILE_NO ?? '',
                        $application->APPLY_DATE ?? ''
                    ];

                }
                    $this->candidateInfoReportPDF->TableHeader($tableHeaders, $qualColWidths);
                    $this->candidateInfoReportPDF->FancyTable($tableHeaders, $tableData, $qualColWidths, $alignments);

            $this->candidateInfoReportPDF->Ln(10);

        }

        return $this->candidateInfoReportPDF->Output('S', 'report.pdf');

    }

}
