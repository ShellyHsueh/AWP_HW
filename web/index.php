<?php
var_dump(__DIR__);
require_once __DIR__.'init.php';

var_dump( videoInfo($YOUTUBE_KEY, '6k8aYUDHF_E')->description );
var_dump( playlistVideosInfo($YOUTUBE_KEY, 'PLSEFni51m3VKv5OjLvD10CH2kz0TTQGDU') );
var_dump( englishCaptionContents($YOUTUBE_SERVICE, 'vYEvdiKibQY')[0]->content );

?>
