<?php

namespace App\Models;

use MongoDB\Laravel\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

/**
 * @property string $_id
 * @property string $id
 * @property string $name
 * @property string $email
 * @property string $avatar
 * @property string $password
 * @property string $role
 * @property string $jenjang_pendidikan
 * @property string $profesi
 * @property string $username
 * @property string $display_name
 * @property string $phone
 * @property string $bio
 * @property string $school
 * @property boolean $is_verified
 * @property boolean $is_private
 * @property boolean $is_dormant
 * @property \Illuminate\Support\Carbon|null $deactivated_at
 * @property \Illuminate\Support\Carbon|null $username_updated_at
 * @property string $provider
 * @property string $provider_id
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property boolean $profile_completed
 * @property int|null $target_belajar
 * 
 * @property boolean $is_followed_by_me
 * @property boolean $is_follow_pending
 * @property boolean $follows_me
 * @property int $followers_count
 * @property int $following_count
 * @property int $posts_count
 */
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
        'jenjang_pendidikan',
        'profesi',
        'username',
        'display_name',
        'phone',
        'bio',
        'school',
        'is_verified',
        'is_private',
        'is_dormant',
        'deactivated_at',
        'username_updated_at',
        'provider',
        'provider_id',
        'email_verified_at',
        'profile_completed',
    ];

    protected $attributes = [
        'role' => 'user',
        'is_verified' => false,
        'is_private' => false,
        'is_dormant' => false,
        'profile_completed' => true,
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'is_verified' => 'boolean',
        'is_private' => 'boolean',
        'is_dormant' => 'boolean',
        'profile_completed' => 'boolean',
        'deactivated_at' => 'datetime',
        'username_updated_at' => 'datetime',
        'email_verified_at' => 'datetime',
    ];

    // Relationships
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new \App\Notifications\CustomResetPassword($token));
    }

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
        return \App\Models\Follow::where('follower_id', (string)$this->id)
                                 ->where('following_id', (string)$userId)
                                 ->where('status', \App\Models\Follow::STATUS_ACCEPTED)
                                 ->exists();
    }

    public function followings()
    {
        return $this->hasMany(\App\Models\Follow::class, 'follower_id')->where('status', \App\Models\Follow::STATUS_ACCEPTED);
    }

    public function followers()
    {
        return $this->hasMany(\App\Models\Follow::class, 'following_id')->where('status', \App\Models\Follow::STATUS_ACCEPTED);
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