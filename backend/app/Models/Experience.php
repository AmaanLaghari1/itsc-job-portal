<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Experience extends Model
{
    use HasFactory;

    public $table = 'experiances';
    protected $primaryKey = 'EXPERIANCE_ID';
    public $timestamps = false;
    protected $fillable = [
        'USER_ID',
        'EMP_TYPE',
        'ORGANIZATION_NAME',
        'ADDRESS',
        'CONTACT_NO',
        'START_DATE',
        'END_DATE',
        'JOB_DESCRIPTION',
        'IS_JOB_CONTINUE',
        'SALARY',
        'REASON_FOR_LEAVING',
        'REMARKS',
        'ACTIVE'
    ];

    public function user(){
        return $this->belongsTo(User::class, 'USER_ID');
    }

    public function getInstituteAttribute()
    {
        return DB::table('institute')->where('INSTITUTE_ID', $this->INSTITUTE_ID)->first();
    }

    public function discipline(){
        return $this->belongsTo(User::class);
    }

    public function getExperienceCompletenessAttribute()
    {
        // List of important profile fields you want to check
        $fields = [
            'EMP_TYPE',
            'ORGANIZATION_NAME',
            'ADDRESS',
            'CONTACT_NO',
            'START_DATE',
            'END_DATE',
            'JOB_DESCRIPTION',
            'IS_JOB_CONTINUE',
            'SALARY',
            'REASON_FOR_LEAVING',
        ];

        $filled = 0;

        foreach ($fields as $field) {
            if (!empty($this->$field)) {
                $filled++;
            }else {

            }

        }

        $total = count($fields);
        $percentage = ($filled / $total) * 100;

        return round($percentage); // Return whole number
    }

}
