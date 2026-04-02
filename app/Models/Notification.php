<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Notification extends Model
{
    protected $collection = 'notifications';

    protected $fillable = [
        'user_id',   
        'title',     
        'message',  
        'type',      
        'link',
        'is_read', 
    ];

    protected $casts = [
        'is_read' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}