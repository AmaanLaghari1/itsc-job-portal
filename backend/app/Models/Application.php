<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Announcement;
use App\Models\ApplicationStatus;
use App\Models\ApplicationQualification;
use App\Models\ApplicationExperience;
use Carbon\Carbon;

class Application extends Model
{
    use HasFactory;

    public $table = 'applications';

    protected $primaryKey = 'APPLICATION_ID';

    public $timestamps = false;

    protected $fillable = [
        'ANNOUNCEMENT_ID',
        'USER_ID',
        'APPLY_DATE',
        'PAID_DATE',
        'PAID_AMOUNT',
        'CHANNEL',
        'ACTIVE',
        'REMARKS',
        'FIRST_NAME',
        'LAST_NAME',
        'FNAME',
        'EMAIL',
        'CNIC_NO',
        'MOBILE_NO',
        'GENDER',
        'MARITAL_STATUS',
        'RELIGION',
        'DATE_OF_BIRTH',
        'PLACE_OF_BIRTH',
        'HOME_ADDRESS',
        'PERMANENT_ADDRESS',
        'COUNTRY_ID',
        'PROVINCE_ID',
        'DISTRICT_ID',
        'PROFILE_IMAGE',
        'APPLICATION_STATUS',
        'APPLICATION_URL',
    ];

    public function announcement(){
        return $this->belongsTo(Announcement::class, 'ANNOUNCEMENT_ID', 'ANNOUNCEMENT_ID');
    }

    public function user(){
        return $this->belongsTo(User::class, 'USER_ID');
    }

    public function application_status(){
        return $this->belongsTo(ApplicationStatus::class, 'APPLICATION_STATUS');
    }

    // Accessor to format APPLY_DATE to d-M-Y format
    public function getApplyDateAttribute($value)
    {
        // Ensure the date is in the correct timezone before formatting
        // Optional: Set to application timezone if needed
        $timezone = config('app.timezone');  // Default application timezone
        $value->setTimezone($timezone);

        return $value->format('d-M-Y'); // Format to d-M-Y
    }

    public function qualifications(){
        return $this->hasMany(ApplicationQualification::class, 'APPLICATION_ID');
    }

    public function experiences(){
        return $this->hasMany(ApplicationExperience::class, 'APPLICATION_ID');
    }
}
