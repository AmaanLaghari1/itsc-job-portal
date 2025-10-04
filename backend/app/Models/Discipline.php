<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discipline extends Model
{
    use HasFactory;

    public $table = 'discipline';

    protected $primaryKey = 'DISCIPLINE_ID';

    public $timestamps = false;

    protected $fillable = [
        'DISCIPLINE_NAME',
        'REMARKS',
        'DEGREE_ID',
        'ACTIVE'
    ];

    public function degree(){
        return $this->hasOne(DegreeProgram::class,'DEGREE_ID','DEGREE_ID');
    }
}
