<?php

namespace App\Models;

use MongoDB\Laravel\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $connection = 'mongodb';
    protected $collection = 'user';
    protected $table = 'user';
    protected $primaryKey = '_id';

    protected $fillable = [
        'name',
        'email',
        'avatar',
        'password',
        'role',
        'jenjang_pendidikan',
        'username',
        'display_name',
        'phone',
        'bio',
        'is_verified',
    ];

    protected $attributes = [
        'role' => 'user',
        'is_verified' => false,
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'is_verified' => 'boolean',
    ];

    // Relationships
    public function posts()
    {
        return $this->hasMany(Post::class, 'user_id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'user_id');
    }

    public function likes()
    {
        return $this->hasMany(Like::class, 'user_id');
    }

    public function sertifikasi()
    {
        return $this->hasMany(Sertifikasi::class, 'user_id');
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class, 'user_id');
    }


    public function isFollowing($userId)
    {
        return \App\Models\Follow::where('follower_id', (string)$this->id)->where('following_id', (string)$userId)->exists();
    }

    public function followings()
    {
        return $this->hasMany(\App\Models\Follow::class, 'follower_id');
    }

    public function followers()
    {
        return $this->hasMany(\App\Models\Follow::class, 'following_id');
    }

    public function createToken(string $name, array $abilities = ['*'], ?\DateTimeInterface $expiresAt = null)
    {
        $plainTextToken = \Illuminate\Support\Str::random(40);

        $token = $this->tokens()->create([
            'name' => $name,
            'token' => hash('sha256', $plainTextToken),
            'abilities' => $abilities,
            'expires_at' => $expiresAt,
        ]);

        return new class ($token, $token->getKey() . '|' . $plainTextToken) {
            public $accessToken, $plainTextToken;
            public function __construct($token, $plainText)
            {
                $this->accessToken = $token;
                $this->plainTextToken = $plainText;
            }
        };
    }
}