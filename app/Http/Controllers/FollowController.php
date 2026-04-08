<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class FollowController extends Controller
{
    public function toggleFollow($userId)
    {
        $targetUser = User::findOrFail($userId);
        $me = auth()->user();

        if ($me->id === $targetUser->id) {
            return response()->json(['message' => 'Nggak bisa follow diri sendiri bro!'], 400);
        }

        if ($me->isFollowing($targetUser->id)) {
            $me->followings()->detach($targetUser->id);
            return response()->json(['status' => 'unfollowed', 'message' => 'Berhenti mengikuti']);
        } 
        else {
            $me->followings()->attach($targetUser->id);
            return response()->json(['status' => 'followed', 'message' => 'Berhasil mengikuti']);
        }
    }
}