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

    public function followers($userId)
    {
        $followers = Follow::where('following_id', (string)$userId)
                           ->with('followerUser')
                           ->get()
                           ->pluck('followerUser')
                           ->filter();
                           
        if (auth('sanctum')->check()) {
            $me = auth('sanctum')->user();
            $myFollowingIds = Follow::where('follower_id', (string)$me->id)->pluck('following_id')->toArray();
            
            $followers = $followers->map(function ($user) use ($myFollowingIds) {
                $user->is_followed_by_me = in_array((string)$user->id, $myFollowingIds);
                return $user;
            });
        }

        return response()->json($followers);
    }

    public function following($userId)
    {
        $following = Follow::where('follower_id', (string)$userId)
                           ->with('followingUser')
                           ->get()
                           ->pluck('followingUser')
                           ->filter();
                           
        if (auth('sanctum')->check()) {
            $me = auth('sanctum')->user();
            $myFollowingIds = Follow::where('follower_id', (string)$me->id)->pluck('following_id')->toArray();
            
            $following = $following->map(function ($user) use ($myFollowingIds) {
                $user->is_followed_by_me = in_array((string)$user->id, $myFollowingIds);
                return $user;
            });
        }

        return response()->json($following);
    }
}