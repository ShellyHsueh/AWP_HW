<?php

$folders = ['database', 'gateway'];
foreach ($folders as $folder) {
  require_once __DIR__ . '/' . $folder . '/init.php';
}

?>