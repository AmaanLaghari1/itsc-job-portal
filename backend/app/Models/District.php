<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class District extends Model
{
    protected $table = 'districts';
    protected $primaryKey = 'DISTRICT_ID';
    public $timestamps = false; // if your table has no timestamps

    protected $fillable = ['DISTRICT_NAME'];
}
