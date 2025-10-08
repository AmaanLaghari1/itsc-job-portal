<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Institute extends Model
{
    use HasFactory;

    protected $table = 'institute';
    protected $primaryKey = 'INSTITUTE_ID';
    public $timestamps = false;

    protected $fillable = [
        'PARENT_ID',
        'INSTITUTE_NAME',
        'IS_INST',
        'ADDRESS',
        'MOBILE',
        'LANDLINE',
        'REMARKS',
        'INSTITUTE_TYPE_ID',
        'ACTIVE',
        'USER_ID',
        'DATE_TIME'
    ];
}
