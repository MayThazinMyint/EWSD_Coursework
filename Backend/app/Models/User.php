<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use App\Models\Department;
use App\Models\UserRole;
use Illuminate\Database\Eloquent\Casts\Attribute;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        
        'user_name',
        'email',
        'user_phone',
        'password',
        'user_code',
        'user_dob',
        'created_date',
        'is_active',
        'updated_date',
        'address',
        'department_id',
        'user_role_id',
    ];

    public $timestamps = false;
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        // 'department',
        // 'user_role'
    ];

    protected $visible = [
        'id',
        'user_name',
        'email',
        'user_phone',
        'password',
        'user_code',
        'user_dob',
        'created_date',
        'is_active',
        'updated_date',
        'address',
        'department_id',
        'user_role_id',
        'user_role_name',
        'department_name'
    ];

    /**
     * Get the password for the user.
     *
     * @return string
     */
    // public function getAuthPassword()
    // {
    //     return $this->user_password;
    // }

    // public function getPasswordAttribute() {
    //     return $this->user_password;

    // } 
    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }


    public function department()
    {
        return $this->belongsTo(Department::class, 'department_id', 'department_id');
    }

    public function user_role()
    {
        return $this->belongsTo(UserRole::class, 'user_role_id', 'user_role_id');
    }
}
