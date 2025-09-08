<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class ApplicationExperience extends Model
{
    use HasFactory;

    public $table = 'application_experiences';

    protected $primaryKey = 'EXPERIENCE_ID';

    public $timestamps = false;

    protected $fillable = [
        'APPLICATION_ID',
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
}
