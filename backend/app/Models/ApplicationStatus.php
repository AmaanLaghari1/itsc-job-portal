<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Application;

class ApplicationStatus extends Model
{
    use HasFactory;

    public $table = 'application_status';

    protected $primaryKey = 'APPLICATION_STATUS_ID';

    protected $fillable = [
        'STATUS',
        'REMARKS'
    ];

    public $timestamps = false;

    public function application(){
        return $this->belongsTo(Application::class, 'APPLICATION_ID');
    }
}
