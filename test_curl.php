<?php
$token = '6a122985a93263787c068902|c7O9N3X31RN97abWH7APPl3p4jkmID3cIS3Krobr';
$id = '6a122846d7fed41ab10a725e';
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "http://localhost:8001/api/v1/notifikasi/$id");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer $token"
]);
$output = curl_exec($ch);
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);
echo "Code: $httpcode\n";
echo "Output: $output\n";
