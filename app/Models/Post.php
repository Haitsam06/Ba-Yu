<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Post extends Model
{
    protected $connection = 'mongodb';
    protected $table = 'post';

    protected $fillable = [
        'user_id',
        'topic_id',
        'category_id',
        'title',
        'content',
        'visibility',
        'images',
        'likes_count',
        'comments_count',
    ];

    protected $attributes = [
        'visibility' => 'public',
        'likes_count' => 0,
        'comments_count' => 0,
    ];

    protected $casts = [
        'images' => 'array',
        'likes_count' => 'integer',
        'comments_count' => 'integer',
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
