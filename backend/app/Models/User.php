<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    public $table = 'users_reg';
    protected $primaryKey = 'USER_ID';
    public $timestamps = false;

    protected $fillable = [
        'EMAIL',
        'PASSWORD',
        'FIRST_NAME',
        'LAST_NAME',
        'FNAME',
        'CNIC_NO'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'PASSWORD',
        'PASSWORD_TOKEN',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'PASSWORD' => 'hashed',
    ];

    public function setAttribute($key, $value)
    {
        // Capitalize the field name
        $key = strtoupper($key);

        return parent::setAttribute($key, $value);
    }

    public function getAuthIdentifierName()
    {
        return 'CNIC_NO'; // Set 'cnic_no' as the username column
    }

}
