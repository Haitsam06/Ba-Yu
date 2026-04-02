<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Post extends Model
{
    protected $connection = 'mongodb';
    protected $table = 'post';
    protected $collection = 'post';

    protected $fillable = [
        'user_id',
        'topic_id',
        'category_id',
        'title',
        'content',
        'mapel',
        'jenjang',
        'kelas',
        'semester',
        'tags',
        'thumbnail',
        'thumbnail_fit',
        'description',
        'visibility',
        'is_verified',
        'likes_count',
        'comments_count',
    ];

    protected $attributes = [
        'visibility' => 'public',
        'is_verified' => false,
        'likes_count' => 0,
        'comments_count' => 0,
    ];

    protected $casts = [
        'likes_count' => 'integer',
        'comments_count' => 'integer',
        'tags' => 'array',
        'is_verified' => 'boolean',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function topic()
    {
        return $this->belongsTo(Topic::class, 'topic_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'post_id');
    }

    public function likes()
    {
        return $this->hasMany(Like::class, 'post_id');
    }

    public function reports()
    {
        return $this->hasMany(Report::class, 'post_id');
    }
}
