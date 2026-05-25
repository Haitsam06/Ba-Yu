<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

foreach(\App\Models\Post::all() as $p) {
    echo $p->id . ' : ' . $p->read_time . ' min (' . str_word_count(strip_tags($p->plain_content ?? $p->content ?? '')) . ' words)' . PHP_EOL;
}
