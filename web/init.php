<?php

define('WEB_ROOT', __DIR__);

// Require all files we need
$folders = array('config', 'infrastructure', 'domain');
foreach ($folders as $folder) {
  require_once __DIR__ . '/' . $folder . '/init.php';
}


?>