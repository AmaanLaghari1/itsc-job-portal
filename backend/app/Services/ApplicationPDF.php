<?php

namespace App\Services;

use App\Models\Application;
use App\Models\Qualification;
use FPDF;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ApplicationPDF extends FPDF
{
    public function __construct()
    {
        parent::__construct();
    }

    public function Header()
    {
        $this->SetXY(0, 0);
        $this->SetFont('Arial', 'B', 10);

        $this->Ln(5);

        $this->SetFont('Arial', 'B', 16);
        $this->SetTextColor(0, 0, 0);
        $this->Cell(190, 10, 'University of Sindh', 0, 1, 'C');

        $this->SetFont('Arial', 'B', 12);
        $this->Cell(190, 5, 'Application Form', 0, 1, 'C');

        $this->Image(public_path('images/usindh_logo.png'), 10, 5, 20, 20, '', '');

        $this->Ln(5);
    }

    public function Footer()
    {
        $this->setMargins(10, 10, 10);
        $this->SetY(285);
        $this->SetFont('Times', '', 8);

        $this->Cell(50, 0, '', 1, 1, 'C');
        $this->Cell(50, 5, 'Signature of Applicant', 0, 0, 'C');
    }

    public function NbLines($w, $txt)
    {
        $cw = &$this->CurrentFont['cw'];

        if ($w == 0) {
            $w = $this->w - $this->rMargin - $this->x;
        }

        $wmax = ($w - 2 * $this->cMargin) * 1000 / $this->FontSize;

        $s = str_replace("\r", '', $txt);
        $nb = strlen($s);
        if ($nb > 0 && $s[$nb - 1] == "\n") {
            $nb--;
        }

        $sep = -1;
        $i = 0;
        $j = 0;
        $l = 0;
        $nl = 1;

        while ($i < $nb) {
            $c = $s[$i];

            if ($c == "\n") {
                $i++;
                $sep = -1;
                $j = $i;
                $l = 0;
                $nl++;
                continue;
            }

            if ($c == ' ')
                $sep = $i;

            $l += $cw[$c];

            if ($l > $wmax) {
                if ($sep == -1) {
                    if ($i == $j)
                        $i++;
                } else {
                    $i = $sep + 1;
                }

                $sep = -1;
                $j = $i;
                $l = 0;
                $nl++;
            } else {
                $i++;
            }
        }

        return $nl;
    }

    // -------------------------------
    // FIXED TABLE FUNCTION (stable)
    // -------------------------------
    function FancyTable($header, $data, $colWidths, $headerStyle='B')
    {
        // ---------------------
        // Draw Header
        // ---------------------
        $this->SetFont('Arial', $headerStyle, 10);

        $nb = [];
        foreach ($header as $i => $col) {
            $nb[$i] = $this->NbLines($colWidths[$i], $col);
        }

        $headerHeight = 6 * max($nb);

        $startX = $this->GetX();
        $startY = $this->GetY();
        $x = $startX;
        $y = $startY;

        foreach ($header as $i => $col) {
            $this->SetXY($x, $y);
            $this->Rect($x, $y, $colWidths[$i], $headerHeight);
            $this->MultiCell($colWidths[$i], 6, $col, 0, 'C');
            $x += $colWidths[$i];
        }

        $this->SetXY($startX, $startY + $headerHeight);

        // ---------------------
        // TABLE BODY
        // ---------------------
        $this->SetFont('Arial', '', 9);

        foreach ($data as $row) {

            // Compute row height
            $nbLines = [];
            foreach ($row as $i => $cell) {
                $nbLines[$i] = $this->NbLines($colWidths[$i], $cell);
            }

            $rowHeight = 6 * max($nbLines);

            // Page break check
            if ($this->GetY() + $rowHeight > $this->PageBreakTrigger) {
                $this->AddPage();

                // Draw header again
                $this->SetFont('Arial', 'B', 10);

                $x = $this->GetX();
                $y = $this->GetY();

                foreach ($header as $i => $col) {
                    $this->SetXY($x, $y);
                    $this->Rect($x, $y, $colWidths[$i], $headerHeight);
                    $this->MultiCell($colWidths[$i], 6, $col, 0, 'C');
                    $x += $colWidths[$i];
                }

                $this->SetXY($startX, $y + $headerHeight);
                $this->SetFont('Arial', '', 9);
            }

            // Draw row
            $x = $this->GetX();
            $y = $this->GetY();

            foreach ($row as $i => $cell) {
                $this->SetXY($x, $y);
                $this->Rect($x, $y, $colWidths[$i], $rowHeight);
                $this->MultiCell($colWidths[$i], 6, $cell, 0, 'L');
                $x += $colWidths[$i];
            }

            // Move cursor to next row (fixed drift)
            $this->SetXY($startX, $y + $rowHeight);
        }
    }

    public function fieldWithLabel($labelTxt, $valueTxt, $labelWidth, $valueWidth, $fieldHeight, $border = 0, $align = 'L')
    {
        $startX = $this->GetX();
        $startY = $this->GetY();

        $this->setFont('', 'B');
        $this->setXY($startX + $labelWidth, $startY);
        $this->MultiCell($valueWidth, $fieldHeight, $valueTxt, $border, $align);

        $endY = $this->GetY();
        $cellHeight = $endY - $startY;

        $this->setFont('', '');
        $this->setXY($startX, $startY);
        $this->MultiCell($labelWidth, $cellHeight, $labelTxt, $border, $align);
    }

    public function getTotalExperience($start_date, $end_date)
    {
        $start = Carbon::createFromFormat('d-m-Y', $start_date);
        $end_date = $end_date == 'continued' ? Carbon::now()->format('d-m-Y') : $end_date;
        $end = Carbon::createFromFormat('d-m-Y', $end_date);

        return $start->diff($end);
    }

    public function sumTotalExperience($experienceData)
    {
        $totalYears = 0;
        $totalMonths = 0;
        $totalDays = 0;

        foreach ($experienceData as $item) {
            $startDate = date('d-m-Y', strtotime($item->START_DATE));
            $endDate = empty($item->END_DATE) ? date('d-m-Y') : date('d-m-Y', strtotime($item->END_DATE));

            $diff = $this->getTotalExperience($startDate, $endDate);

            $totalYears += $diff->y;
            $totalMonths += $diff->m;
            $totalDays += $diff->d;
        }

        if ($totalDays >= 30) {
            $extraMonths = floor($totalDays / 30);
            $totalDays %= 30;
            $totalMonths += $extraMonths;
        }

        if ($totalMonths >= 12) {
            $extraYears = floor($totalMonths / 12);
            $totalMonths %= 12;
            $totalYears += $extraYears;
        }

        return "{$totalYears} Years {$totalMonths} Months {$totalDays} Days";
    }

    public function RequiredData($data = [])
    {
        $application = Application::with(['qualifications', 'experiences'])
            ->find($data['APPLICATION_ID']);

        $researchData = DB::table('research_publications')
            ->where('USER_ID', $data['USER_ID'])
            ->orderBy('PUBLICATION_YEAR', 'desc')
            ->get()->toArray();

        $projectsData = DB::table('design_project_exhibitions')
            ->where('USER_ID', $data['USER_ID'])
            ->orderBy('DATE', 'desc')
            ->get()->toArray();

        $countryName = DB::table('countries')->where('COUNTRY_ID', $data['COUNTRY_ID'])->value('COUNTRY_NAME');
        $provinceName = DB::table('provinces')->where('PROVINCE_ID', $data['PROVINCE_ID'])->value('PROVINCE_NAME');
        $districtName = DB::table('districts')->where('DISTRICT_ID', $data['DISTRICT_ID'])->value('DISTRICT_NAME');

        $qualifications = Qualification::where('USER_ID', $data['USER_ID'])
            ->get()
            ->sortByDesc(fn($item) => $item->degree()->DEGREE_ID)
            ->values()
            ->map(function ($item) {
                return [
                    $item->degree()->DEGREE_TITLE,
                    strtoupper($item->institute->INSTITUTE_NAME),
                    $item->PASSING_YEAR,
                    $item->OBTAINED_MARKS,
                    $item->TOTAL_MARKS,
                ];
            });

        $experience = $application->experiences->map(function ($item) {
            $startDate = date('d-m-Y', strtotime($item->START_DATE));
            $endDate = empty($item->END_DATE) ? 'continued' : date('d-m-Y', strtotime($item->END_DATE));
            $totalExperience = $this->getTotalExperience($startDate, $endDate);

            return [
                $item->ORGANIZATION_NAME,
                $item->EMP_TYPE,
                $startDate,
                $endDate,
                "{$totalExperience->y} Years {$totalExperience->m} Months {$totalExperience->d} Days",
            ];
        });

        $sumTotalExperience = $this->sumTotalExperience($application->experiences);

        return [
            "APPLICATION_NO" => $data['APPLICATION_ID'] ?? '',
            "POSITION_APPLIED_FOR" => $data['announcement']['POSITION_NAME'] . " at " . $data['announcement']['department']['DEPT_NAME'],
            "APPLICATION_FEE" => $data['announcement']['APPLICATION_FEE'] ?? '',
            "CHALLAN_NO" => sprintf("%07d", $data['APPLICATION_ID']) ?? '',
            "PAYMENT_DATE" => date('d-m-Y', strtotime($data['PAID_DATE'])) ?? '',
            "NAME" => $data['FIRST_NAME'] ?? '',
            "SURNAME" => $data['LAST_NAME'] ?? '',
            "FNAME" => $data['FNAME'] ?? '',
            "EMAIL" => $data['EMAIL'] ?? '',
            "MOBILE_NO" => $data['MOBILE_NO'] ?? '',
            "CNIC_NO" => $data['CNIC_NO'] ?? '',
            "DATE_OF_BIRTH" => date('d-m-Y', strtotime($data['DATE_OF_BIRTH'])) ?? '',
            "PLACE_OF_BIRTH" => $data['PLACE_OF_BIRTH'] ?? '',
            "GENDER" => $data['GENDER'] == 'M' ? 'MALE' : 'FEMALE',
            "MARITAL_STATUS" => $data['MARITAL_STATUS'],
            "RELIGION" => $data['RELIGION'] ?? '',
            "HOME_ADDRESS" => $data['HOME_ADDRESS'] ?? '',
            "PERMANENT_ADDRESS" => $data['PERMANENT_ADDRESS'] ?? '',
            "COUNTRY_NAME" => $countryName,
            "PROVINCE_NAME" => $provinceName,
            "DISTRICT_NAME" => $districtName,
            "qualifications" => $qualifications,
            "experience" => $experience,
            "total_experience" => $sumTotalExperience,
            "PROFILE_IMAGE" => $data['PROFILE_IMAGE'] ?? '',
            "REF_NO" => $data['announcement']['REF_NO'] ?? '',
            "RESEARCH_PUBLICATIONS" => $researchData,
            "PROJECT_EXHIBITIONS" => $projectsData
        ];
    }

    public function getQrCode($content)
    {
        $qrCodeService = new QRCodeService();
        return $qrCodeService->generate($content, 'qr_frames/' . $content . 'qr_code.png');
    }
}
