<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Discipline;
use Illuminate\Support\Facades\DB;

class Announcement extends Model
{
    use HasFactory;

    public $table = 'announcements';

    protected $primaryKey = 'ANNOUNCEMENT_ID';

    public $timestamps = false;

    protected $fillable = [
        'DEPT_NAME',
        'POSITION_NAME',
        'START_DATE',
        'END_DATE',
        'DESCRIPTION',
        'APPLICATION_FEE',
        'AGE_FROM',
        'AGE_TO',
        'PROGRAM_ID',
        'EXPERIENCE_YEARS',
        'ACTIVE',
        'REMARKS'
    ];

    public function applications()
    {
        return $this->hasMany(Application::class, 'ANNOUNCEMENT_ID');
    }

    public function program(){
        return $this->hasOne(Announcement::class, 'PROGRAM_ID', 'DEGREE_ID');
    }

    public function checkAge($userAge){
        $ageFrom = $this->AGE_FROM;
        $ageTo = $this->AGE_TO;

        if($ageFrom == null ||  $ageTo == null){
            return true;
        }

        if($userAge >= $ageFrom && $userAge <= $ageTo){
            return true;
        }

        return false;
    }

    public function checkQualifications($data=[]){
        foreach($data as $value){
//           to do
            $program = Discipline::where('DISCIPLINE_ID', $value['DISCIPLINE_ID'])->first();
            if($program->DEGREE_ID == $this->PROGRAM_ID){
                return true;
            }
        }

        return false;
    }

}
