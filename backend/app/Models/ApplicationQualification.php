<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Discipline;
use App\Models\DegreeProgram;
use Illuminate\Support\Facades\DB;

class ApplicationQualification extends Model
{
    use HasFactory;

    public $table = 'application_qualifications';

    protected $primaryKey = 'QUALIFICATION_ID';

    public $timestamps = false;

    protected $fillable = [
        'APPLICATION_ID',
        'DISCIPLINE_ID',
        'USER_ID',
        'ORGANIZATION_ID',
        'INSTITUTE_ID',
        'START_DATE',
        'END_DATE',
        'IS_RESULT_DECLARE',
        'RESULT_DATE',
        'MAJOR',
        'ROLL_NO',
        'TOTAL_MARKS',
        'OBTAINED_MARKS',
        'CGPA',
        'OUT_OF',
        'GRADE',
        'GRADING_AS',
        'REMARKS',
        'ACTIVE',
        'MARKSHEET_IMAGE',
        'PASSCERTIFICATE_IMAGE',
        'PASSING_YEAR',
        'STATUS',
        'APPLICATION_ID'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'USER_ID');
    }

    public function getInstituteAttribute()
    {
        return DB::table('institute')->where('INSTITUTE_ID', $this->INSTITUTE_ID)->first();
    }

    public function discipline()
    {
        return $this->belongsTo(Discipline::class, 'DISCIPLINE_ID');
    }

    public function degree()
    {
        return DB::table('degree_program')
            ->where('DEGREE_ID', $this->discipline->DEGREE_ID)
            ->first();
    }

}
