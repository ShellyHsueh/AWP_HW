<?php

$folders = ['lib', 'youtube_mappers'];
foreach ($folders as $folder) {
  require_once __DIR__ . '/' . $folder . '/init.php';
}

?>