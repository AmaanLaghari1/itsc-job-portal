<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApplicationScrutiny extends Model
{
    use HasFactory;

    protected $table = 'applications_scrutiny';
    protected $primaryKey = 'ID';

    protected $fillable = [
        'APPLICATION_ID',
        'USER_ID',
        'ANNOUNCEMENT_ID',
        'REMARKS',
        'APPLICATION_STATUS_ID'
    ];

    public function application(){
        return $this->belongsTo(Application::class, 'APPLICATION_ID');
    }

    public function user(){
        return $this->belongsTo(User::class, 'USER_ID');
    }

    public function announcement(){
        return $this->belongsTo(Announcement::class, 'ANNOUNCEMENT_ID');
    }
}
