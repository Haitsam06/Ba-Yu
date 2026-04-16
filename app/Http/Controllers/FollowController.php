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

        $targetIdStr = (string)$targetUser->id;
        $myIdStr = (string)$me->id;

        if ($me->isFollowing($targetUser->id)) {
            $me->pull('following_ids', $targetIdStr);
            $targetUser->pull('follower_ids', $myIdStr);
            return response()->json(['status' => 'unfollowed', 'message' => 'Berhenti mengikuti']);
        } 
        else {
            $me->push('following_ids', $targetIdStr, true);
            $targetUser->push('follower_ids', $myIdStr, true);
            return response()->json(['status' => 'followed', 'message' => 'Berhasil mengikuti']);
        }
    }
}