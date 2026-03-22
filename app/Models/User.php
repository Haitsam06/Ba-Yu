<?php

namespace App\Models;

use MongoDB\Laravel\Auth\User as Authenticatable; 
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; 

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role', 
        'jenjang_pendidikan',
    ];

    protected $attributes = [
        'role' => 'user', 
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
}