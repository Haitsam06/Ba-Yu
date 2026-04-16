<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Follow extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'follows';

    protected $fillable = [
        'follower_id',
        'following_id',
    ];

    // Relasi balik ke User (Opsional tapi sangat berguna kedepannya)
    public function followerUser()
    {
        return $this->belongsTo(User::class, 'follower_id');
    }

    public function followingUser()
    {
        return $this->belongsTo(User::class, 'following_id');
    }
}