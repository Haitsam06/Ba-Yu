<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class CleanupDormantAccounts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'accounts:cleanup-dormant';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Permanently delete users and their data if they have been dormant for more than 30 days';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $cutoffDate = now()->subDays(30);
        
        $usersToDelete = \App\Models\User::where('is_dormant', true)
                             ->where('deactivated_at', '<=', $cutoffDate)
                             ->get();
                             
        $count = 0;
        foreach ($usersToDelete as $user) {
            $userIdStr = (string)$user->_id;

            // Delete all related content
            \App\Models\Post::where('user_id', $userIdStr)->delete();
            \App\Models\Comment::where('user_id', $userIdStr)->delete();
            \App\Models\Like::where('user_id', $userIdStr)->delete();
            \App\Models\Follow::where('follower_id', $userIdStr)->orWhere('following_id', $userIdStr)->delete();
            \App\Models\Notification::where('user_id', $userIdStr)->orWhere('actor_id', $userIdStr)->delete();
            
            $user->delete();
            $count++;
        }

        $this->info("Successfully deleted {$count} dormant accounts and their associated data.");
    }
}
