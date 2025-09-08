<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\UserRoleRelation;

class Role extends Model
{
    use HasFactory, SoftDeletes;

    public $table = 'roles';
    protected $primaryKey = 'ROLE_ID';
    public $timestamps = false;

    protected $fillable = [
        'ROLE_NAME',
        'REMARKS'
    ];

    public function userRoleRelation(){
        return $this->hasMany(UserRoleRelation::class, 'ROLE_ID');
    }
}
