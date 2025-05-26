<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class DegreeProgram extends Model
{
    protected $table = 'degree_program';
    protected $primaryKey = 'DEGREE_ID';
    public $timestamps = false; // disable timestamps if not used

    public $fillable = ['DEGREE_ID','DEGREE_TITLE','DURATION', 'REMARKS', 'DEGREE_ORDER'];
}
