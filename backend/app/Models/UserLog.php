<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserLog extends Model
{
    use HasFactory;

    public $table = 'user_logs';
    public $primaryKey = 'USER_LOG_ID';
    public $timestamps = false;
    protected $fillable = [
        'USER_ID',
        'USER_DATA',
        'REMARKS',
        'CREATED_AT',
    ];
}
