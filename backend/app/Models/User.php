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
        'ROLE',
        'REF_NO',
        'EMAIL',
        'FIRST_NAME',
        'LAST_NAME',
        'FNAME',
        'CNIC_NO',
        'PREFIX_ID',
        'DESIGNATION_ID',
        'GENDER',
        'MOBILE_NO',
        'HOME_ADDRESS',
        'PERMANENT_ADDRESS',
        'DATE_OF_BIRTH',
        'PLACE_OF_BIRTH',
        'BLOOD_GROUP',
        'ZIP_CODE',
        'IS_CNIC_PASS',
        'MOBILE_CODE',
        'FAMILY_CONTACT_NO',
        'PHONE',
        'CNIC',
        'DISTRICT',
        'PASSPORT_NO',
        'PASSPORT_EXPIRY',
        'CNIC_EXPIRY',
        'NATIONALITY',
        'CNIC_OF',
        'PROFILE_IMAGE',
        'CNIC_FRONT_IMAGE',
        'CNIC_BACK_IMAGE',
        'PASSPORT_FRONT_IMAGE',
        'PASSPORT_BACK_IMAGE',
        'RELIGION',
        'CITY_ID',
        'UC_ID',
        'COUNTRY_ID',
        'MARITAL_STATUS',
        'DISTRICT_ID',
        'PROVINCE_ID',
        'REMARKS',
        'ACCT_OPENING_DATE',
        'ACTIVE',
        'PASSWORD',
        'PASSWORD_TOKEN',
        'BATCH_ID',
        'U_R',
        'DOMICILE_PROVINCE',
        'URL_AUTHENTICATION_TOKEN',
        'URL_TOKEN_DATETIME',
        'TOKEN_EXPIRY_DURATION',
        'STATUS',
        'WHATSAPP_NO',
        'ACTIVE_TIME',
        'LAST_LOGIN_TIME',
        'CURRENT_LOGIN_TIME',
        'FORGET_PASSWORD',
        'FORGET_DATE_TIME',
        'DOMICILE_IMAGE',
        'DOMICILE_FORM_C_IMAGE',
        'APPLICATION_ID'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    public function setAttribute($key, $value)
    {
        if (is_string($value)) {
            if($key !== 'EMAIL' && $key !== 'PASSWORD' && $key !== 'PROFILE_IMAGE'){
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
