<?php

define('WEB_ROOT', __DIR__);

// Require all files we need
$folders = array('config', 'infrastructure', 'domain');
foreach ($folders as $folder) {
  require_once __DIR__ . '/' . $folder . '/init.php';
}

var_dump('ENV: ' . ENV);
var_dump('DOCUMENT_ROOT: ' . $_SERVER['DOCUMENT_ROOT']);
// Require the google/apiclient library when run on local
// if (ENV=='development' && !file_exists($_SERVER['DOCUMENT_ROOT'].'/vendor/autoload.php')) {
//   throw new \Exception('please run "composer require google/apiclient:~2.0 php-activerecord/php-activerecord" in "' . $_SERVER['DOCUMENT_ROOT'] .'"');
// }
require_once $_SERVER['DOCUMENT_ROOT'].'/vendor/autoload.php';


?>