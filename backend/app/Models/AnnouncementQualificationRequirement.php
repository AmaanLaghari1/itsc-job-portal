<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnnouncementQualificationRequirement extends Model
{
    use HasFactory;

    public $table = 'announcement_qualification_requirements';

    public $primaryKey = 'REQ_ID';

    public $timestamps = false;

    protected $fillable = [
        'ANNOUNCEMENT_ID',
        'DEGREE_ID',
        'IS_REQUIRED',
        'REMARKS'
    ];

    public function announcement(){
        return $this->belongsTo(Announcement::class, 'ANNOUNCEMENT_ID');
    }

    public function degree(){
        return $this->hasOne(DegreeProgram::class, 'DEGREE_ID', 'DEGREE_ID');
    }
}
