<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Announcement;

class Application extends Model
{
    use HasFactory;

    public $table = 'applications';

    protected $primaryKey = 'APPLICATION_ID';

    public $timestamps = false;

    protected $fillable = [
        'ANNOUNCEMENT_ID',
        'USER_ID',
        'APPLY_DATE',
        'PAID_DATE',
        'PAID_AMOUNT',
        'CHANNEL',
        'ACTIVE',
        'REMARKS'
    ];

    public function announcement(){
        return $this->belongsTo(Announcement::class, 'ANNOUNCEMENT_ID');
    }

    public function user(){
        return $this->belongsTo(User::class, 'USER_ID');
    }
}
