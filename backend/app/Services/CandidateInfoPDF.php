<?php

namespace App\Services;

use App\Models\Announcement;
use App\Models\Application;
use App\Models\Qualification;
use FPDF;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CandidateInfoPDF extends FPDF
{
    public function __construct()
    {
        parent::__construct();
    }

    function Header()
    {
        // Logo
        $this->Image(public_path('images/usindh_logo.png'), 15, 5, 20, 20);

        // Main Title
        $this->SetFont('Arial', 'B', 16);
        $this->SetXY(15, 10);
        $this->Cell(0, 10, 'UNIVERSITY OF SINDH', 0, 1, 'C');

        // Subtitle row
        $this->SetFont('Arial', 'B', 10);
        $this->setY(25);

        // Ref No (must be set dynamically)
        if (!empty($this->ref_no)) {
            $this->Cell(100, 7, 'Ref No. ' . $this->ref_no, 0, 0, 'L');
        }

        // Printed Date
        $this->SetFont('Arial', '', 8);
        $this->Cell(0, 7, 'Printed: ' . date('d-m-Y H:i'), 0, 1, 'R');

        // Space before content
        $this->Ln(5);
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
        if ($nb > 0 and $s[$nb - 1] == "\n")
            $nb--;
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

    public function TableHeader($header, $widths)
    {
        $this->SetFont('Arial', 'B', 9);

        foreach ($header as $i => $col) {
            $this->Cell($widths[$i], 8, $col, 1, 0, 'C');
        }
        $this->Ln();
    }

    function FancyTable($header, $data, $colWidths, $alignments = [])
    {
        // Default all columns to left if alignment not provided
        foreach ($colWidths as $i => $w) {
            if (!isset($alignments[$i])) {
                $alignments[$i] = 'L';   // default alignment
            }
        }

        // Function to print the table header (we need this on every page)
        $printHeader = function () use ($header, $colWidths) {
            $this->SetFont('Arial', 'B', 10);
            $x = $this->GetX();
            $y = $this->GetY();
            $height = 6;

            foreach ($header as $i => $col) {
                $this->Rect($x, $y, $colWidths[$i], $height);
                $this->MultiCell($colWidths[$i], 5, $col, 0, 'C');
                $x += $colWidths[$i];
                $this->SetXY($x, $y);
            }

            $this->Ln($height);
            $this->SetFont('Arial', '', 9);
        };

        // Print header first time
//        $printHeader();

        $this->SetFont('Arial', '', 8);
        // ---- DATA ROWS ----
        foreach ($data as $row) {

            // Calculate row height depending on wrapped text
            $nbLines = 0;
            foreach ($row as $i => $cell) {
                $nbLines = max($nbLines, $this->NbLines($colWidths[$i], $cell));
            }
            $rowHeight = 6 * $nbLines;

            // Page break? Add new page and print table header again
            if ($this->GetY() + $rowHeight > $this->PageBreakTrigger) {
                $this->AddPage('P', 'A4');
                $this->SetFont('Arial', '', 9);
                $printHeader();
            }

            // Draw row
            $x = $this->GetX();
            $y = $this->GetY();

            foreach ($row as $i => $cell) {
                $this->Rect($x, $y, $colWidths[$i], $rowHeight);

                $align = $alignments[$i];

                $this->MultiCell($colWidths[$i], 5, $cell, 0, $align);
                $x += $colWidths[$i];
                $this->SetXY($x, $y);
            }

            $this->Ln($rowHeight);
        }
    }

    public function fieldWithLabel($labelTxt, $valueTxt, $labelWidth, $valueWidth, $fieldHeight, $border=0, $align='L'){
        $startX = $this->GetX();
        $startY = $this->GetY();

        // Value
        $this->setFont('', 'B');
        $this->setXY($startX+$labelWidth, $startY);
        $this->MultiCell($valueWidth, $fieldHeight, $valueTxt, $border, $align);

        // Get height used
        $endY = $this->GetY();
        $cellHeight = $endY - $startY;

        // Label
        $this->setFont('', '');
        $this->setXY($startX, $startY);
        $this->MultiCell($labelWidth, $cellHeight, $labelTxt, $border, $align);
        // $this->ln(0);
    }

    public function requiredData($announcementIds)
    {
        $data = Announcement::whereIn('ANNOUNCEMENT_ID', $announcementIds)
            ->whereHas('applications', function ($q) {
                $q->where('APPLICATION_STATUS', 1);
            })
            ->with([
                'applications' => function ($q) {
                    $q->where('APPLICATION_STATUS', 1);
                },
                'applications.user'
            ])
            ->get();

        return $data;
    }



    function Footer()
    {
        // Position footer 20 mm from bottom
        $this->SetY(-20);

        // Footer font
        $this->SetFont('Arial', 'I', 8);

        // Left footer text
        $this->Cell(
            0,
            5,
            'Developed by: Information Technology and Services Centre, University of Sindh, Jamshoro',
            0,
            0,
            'L'
        );

        // Page number (right aligned)
        $this->Cell(
            0,
            5,
            'Page ' . $this->PageNo() . ' of {nb}',
            0,
            0,
            'R'
        );
    }


}
