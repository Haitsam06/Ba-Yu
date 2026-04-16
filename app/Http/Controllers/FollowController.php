<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Follow;
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

        $existingFollow = Follow::where('follower_id', $myIdStr)
                                ->where('following_id', $targetIdStr)
                                ->first();

        if ($existingFollow) {
            $existingFollow->delete();
            return response()->json(['status' => 'unfollowed', 'message' => 'Berhenti mengikuti']);
        } 
        else {
            Follow::create([
                'follower_id' => $myIdStr,
                'following_id' => $targetIdStr
            ]);
            return response()->json(['status' => 'followed', 'message' => 'Berhasil mengikuti']);
        }
    }
}