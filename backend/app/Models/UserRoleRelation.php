<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserRoleRelation extends Model
{
    use HasFactory, SoftDeletes;
    public $table = 'user_role_relations';
    public $primaryKey = 'R_R_ID';
    public $timestamps = false;

    protected $fillable = [
        'USER_ID',
        'ROLE_ID',
        'REMARKS',
    ];

    public function user(){
        return $this->belongsTo(User::class, 'USER_ID');
    }

    public function role(){
        return $this->belongsTo(Role::class, 'ROLE_ID');
    }
}
