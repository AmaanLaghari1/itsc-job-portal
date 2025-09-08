<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    protected $table = 'department';

    protected $primaryKey = 'DEPT_ID';

    protected $fillable = [
        'DEPT_NAME',
        'FAC_ID',
        'INST_ID',
        'IS_INST',
        'CODE',
        'REMARKS',
        'EMAIL',
        'SAC_PASSWORD',
        'RESET_TOKEN',
        'USER_TEMP',
        'PASS_TEMP',
        'CITY_NAME',
        'FORM_FINAL_PER'
    ];

    function announcements()
    {
       return $this->hasMany(Announcement::class, 'DEPT_ID');
    }
}
