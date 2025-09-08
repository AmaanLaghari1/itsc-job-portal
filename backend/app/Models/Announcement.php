<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Discipline;
use App\Models\Department;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Announcement extends Model
{
    use HasFactory, SoftDeletes;

    public $table = 'announcements';

    protected $primaryKey = 'ANNOUNCEMENT_ID';

    public $timestamps = false;

    protected $fillable = [
        'ANNOUNCEMENT_TITLE',
        'DEPT_NAME',
        'DEPT_ID',
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
        'REMARKS',
        'ACCESS_ID',
        'REF_NO'
    ];

    public function applications()
    {
        return $this->hasMany(Application::class, 'ANNOUNCEMENT_ID');
    }

    public function program(){
        return $this->hasOne(Announcement::class, 'PROGRAM_ID', 'DEGREE_ID');
    }

    public function department(){
        return $this->belongsTo(Department::class, 'DEPT_ID');
    }

    public function qualification_requirements(){
        return $this->hasMany(AnnouncementQualificationRequirement::class, 'ANNOUNCEMENT_ID');
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

    public function checkQualifications($data = [])
    {
        // Extract DEGREE_IDs from the given discipline data
        $providedDegreeIds = [];

        foreach ($data as $value) {
            $program = Discipline::where('DISCIPLINE_ID', $value['DISCIPLINE_ID'])->first();
            if ($program) {
                $providedDegreeIds[] = $program->DEGREE_ID;
            }
        }

        // Get all required DEGREE_IDs from the qualification requirements
        $requiredDegreeIds = $this->qualification_requirements->where('IS_REQUIRED', 1)->pluck('DEGREE_ID')->unique();


        // Check if all required DEGREE_IDs are in the provided list
        $allMatch = $requiredDegreeIds->every(function ($degreeId) use ($providedDegreeIds) {
            return in_array($degreeId, $providedDegreeIds);
        });

        return $allMatch;
    }

    public function checkExperience($experience){
        $check = false;

        if($experience > $this->EXPERIENCE_YEARS){
            $check = true;
        }

        return $check;
    }
}
