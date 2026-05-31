<?php

namespace App\Models;

use App\Helpers\NotificationTranslator;
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\Notification as FirebaseNotification;
use MongoDB\Laravel\Eloquent\Model;

class Notification extends Model
{
    protected $collection = 'notifications';

    protected $fillable = [
        'user_id',
        'actor_id',
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
        return $this->belongsTo(User::class, 'user_id');
    }

    public function actor()
    {
        return $this->belongsTo(User::class, 'actor_id');
    }

    protected static function booted()
    {
        static::created(function ($notification) {
            try {
                $user = User::find($notification->user_id);
                if ($user && $user->fcm_token) {
                    $locale = $user->locale ?? 'id';
                    $translated = NotificationTranslator::translate($notification->title, $notification->message, $locale);

                    $messaging = app('firebase.messaging');
                    $message = CloudMessage::withTarget('token', $user->fcm_token)
                        ->withNotification(FirebaseNotification::create($translated['title'], $translated['message']))
                        ->withData([
                            'type' => $notification->type ?? '',
                            'link' => $notification->link ?? '',
                            'id' => (string) $notification->_id,
                        ]);
                    $messaging->send($message);
                }
            } catch (\Exception $e) {
                \Log::error('FCM Error: '.$e->getMessage());
            }
        });
    }
}
