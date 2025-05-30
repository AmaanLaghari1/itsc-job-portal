<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Experience;
use App\Models\Qualification;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    public $table = 'users_reg';
    protected $primaryKey = 'USER_ID';
    public $timestamps = false;

    protected $fillable = [
        'ROLE',
        'REF_NO',
        'EMAIL',
        'FIRST_NAME',
        'LAST_NAME',
        'FNAME',
        'CNIC_NO',
        'PREFIX_ID',
        'DESIGNATION_ID',
        'GENDER',
        'MOBILE_NO',
        'HOME_ADDRESS',
        'PERMANENT_ADDRESS',
        'DATE_OF_BIRTH',
        'PLACE_OF_BIRTH',
        'BLOOD_GROUP',
        'ZIP_CODE',
        'IS_CNIC_PASS',
        'MOBILE_CODE',
        'FAMILY_CONTACT_NO',
        'PHONE',
        'CNIC',
        'DISTRICT',
        'PASSPORT_NO',
        'PASSPORT_EXPIRY',
        'CNIC_EXPIRY',
        'NATIONALITY',
        'CNIC_OF',
        'PROFILE_IMAGE',
        'CNIC_FRONT_IMAGE',
        'CNIC_BACK_IMAGE',
        'PASSPORT_FRONT_IMAGE',
        'PASSPORT_BACK_IMAGE',
        'RELIGION',
        'CITY_ID',
        'UC_ID',
        'COUNTRY_ID',
        'MARITAL_STATUS',
        'DISTRICT_ID',
        'PROVINCE_ID',
        'REMARKS',
        'ACCT_OPENING_DATE',
        'ACTIVE',
        'PASSWORD',
        'PASSWORD_TOKEN',
        'BATCH_ID',
        'U_R',
        'DOMICILE_PROVINCE',
        'URL_AUTHENTICATION_TOKEN',
        'URL_TOKEN_DATETIME',
        'TOKEN_EXPIRY_DURATION',
        'STATUS',
        'WHATSAPP_NO',
        'ACTIVE_TIME',
        'LAST_LOGIN_TIME',
        'CURRENT_LOGIN_TIME',
        'FORGET_PASSWORD',
        'FORGET_DATE_TIME',
        'DOMICILE_IMAGE',
        'DOMICILE_FORM_C_IMAGE',
        'APPLICATION_ID'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    public function setAttribute($key, $value)
    {
        if (is_string($value)) {
            if($key !== 'EMAIL' && $key !== 'PASSWORD' && $key !== 'PROFILE_IMAGE'){
                $value = strtoupper($value); // Convert the value to uppercase
            }
        }

        parent::setAttribute($key, $value);
    }

    public function getProfileCompletenessAttribute()
    {
        // List of important profile fields you want to check
        $fields = [
            'EMAIL',
            'FIRST_NAME',
            'LAST_NAME',
            'FNAME',
            'CNIC_NO',
            'MOBILE_NO',
            'HOME_ADDRESS',
            'PERMANENT_ADDRESS',
            'DATE_OF_BIRTH',
            'PLACE_OF_BIRTH',
            'GENDER',
            'PROFILE_IMAGE',
            'NATIONALITY',
            'RELIGION',
            'COUNTRY_ID',
            'DISTRICT_ID',
            'PROVINCE_ID',
            'MARITAL_STATUS'
        ];

        $filled = 0;

        foreach ($fields as $field) {
            if (!empty($this->$field)) {
                $filled++;
            }
        }

        $total = count($fields);
        $percentage = ($filled / $total) * 100;

        return round($percentage); // Return whole number
    }

    protected $hidden = [
        'PASSWORD',
        'PASSWORD_TOKEN',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'PASSWORD' => 'hashed',
        'FORGET_PASSWORD' => 'hashed',
    ];

    public function getAuthIdentifierName()
    {
        return 'CNIC_NO'; // Set 'cnic_no' as the username column
    }

    public function qualifications()
    {
       return $this->hasMany(Qualification::class, 'USER_ID');
    }

    public function getQualificationCompletenessAttribute()
    {
        $totalFields = 23; // Adjust based on the fields you consider
        $qualifications = $this->qualifications;

        $filled = 0;
        $totalPossible = $qualifications->count() * $totalFields;

        foreach ($qualifications as $qualification) {
            foreach ($qualification->getAttributes() as $key => $value) {
                if (in_array($key, $qualification->getFillable()) && !is_null($value) && $value !== '') {
                    $filled++;
                }
            }
        }

        return $totalPossible > 0 ? round(($filled / $totalPossible) * 100, 2) : 0;
    }

    public function experiences()
    {
        return $this->hasMany(Experience::class, 'USER_ID');
    }

    public function getExperienceCompletenessAttribute()
    {
        $totalFields = 13; // Adjust based on the fields you consider
        $experiences = $this->experiences;

        $filled = 0;
        $totalPossible = $experiences->count() * $totalFields;

        foreach ($experiences as $experience) {
            foreach ($experience->getAttributes() as $key => $value) {
                if (in_array($key, $experience->getFillable()) && !is_null($value) && $value !== '') {
                    $filled++;
                }
            }
        }

        return $totalPossible > 0 ? round(($filled / $totalPossible) * 100, 2) : 0;
    }

    public function getAge($date)
    {
        if (empty($this->DATE_OF_BIRTH)) {
            return null;
        }

        try {
            $dob = \Carbon\Carbon::parse($this->DATE_OF_BIRTH);
            $referenceDate = \Carbon\Carbon::parse($date);
            return $dob->diffInYears($referenceDate);
        } catch (\Exception $e) {
            return null; // or throw, or log, based on your app needs
        }
    }


//    public function getQualificationCompletenessAttribute()
//    {
//        $qualifications = $this->qualifications()->get(); // assuming a hasMany relationship
//
//        if ($qualifications->isEmpty()) {
//            return 0;
//        }
//
//        $fields = [
//            'DISCIPLINE_ID',
//            'USER_ID',
//            'ORGANIZATION_ID',
//            'INSTITUTE_ID',
//            'START_DATE',
//            'END_DATE',
//            'IS_RESULT_DECLARE',
//            'RESULT_DATE',
//            'MAJOR',
//            'ROLL_NO',
//            'TOTAL_MARKS',
//            'OBTAINED_MARKS',
//            'CGPA',
//            'OUT_OF',
//            'GRADE',
//            'GRADING_AS',
//        ];
//
//        $total = count($fields);
//        $totalCompleteness = 0;
//
//        foreach ($qualifications as $qualification) {
//            $filled = 0;
//            foreach ($fields as $field) {
//                if (!empty($qualification->$field)) {
//                    $filled++;
//                }
//            }
//            $totalCompleteness += ($filled / $total) * 100;
//        }
//
//        // Return average percentage across all qualifications
//        return round($totalCompleteness / $qualifications->count());
//    }

}
