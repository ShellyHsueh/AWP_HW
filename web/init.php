<?php

define('WEB_ROOT', __DIR__);

// Require the google/apiclient library
if (!file_exists($_SERVER['DOCUMENT_ROOT'].'/vendor/autoload.php')) {
  throw new \Exception('please run "composer require google/apiclient:~2.0 php-activerecord/php-activerecord" in "' . $_SERVER['DOCUMENT_ROOT'] .'"');
}
require_once $_SERVER['DOCUMENT_ROOT'].'/vendor/autoload.php';

// Require all files we need
$folders = array('config', 'infrastructure', 'domain');
foreach ($folders as $folder) {
  require_once __DIR__ . '/' . $folder . '/init.php';
}


?>