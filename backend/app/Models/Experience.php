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
    private $primarykey = 'EXPERIANCE_ID';
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
}
