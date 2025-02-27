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
    public function setAttribute($key, $value)
    {
        if (is_string($value)) {
            if($key !== 'EMAIL' && $key !== 'PASSWORD'){
                $value = strtoupper($value); // Convert the value to uppercase
            }
        }

        parent::setAttribute($key, $value);
    }

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
        'FORGET_PASSWORD' => 'hashed',
    ];

    public function getAuthIdentifierName()
    {
        return 'CNIC_NO'; // Set 'cnic_no' as the username column
    }

}
