<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();
$n = \App\Models\Notification::where('type', 'sertifikasi')->orderBy('created_at', 'desc')->first();
$u = \App\Models\User::find($n->user_id);
$token = $u->createToken('test')->plainTextToken;
echo "Token: $token\n";
echo "ID Notif: " . $n->_id . "\n";
