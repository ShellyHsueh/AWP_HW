<?php
  require_once __DIR__.'/init.php';
  // require_once __DIR__.'/infrastructure/database.php';

  require_once WEB_ROOT.'/infrastructure/gateway/youtube_captions.php';
  require_once WEB_ROOT.'/infrastructure/gateway/youtube_videos.php';

  // if ($_SERVER['HTTP_HOST']=='localhost') {
  //   echo 'true';
  // } else {
  //   echo 'false';
  // }
  $res = getCaptionContents($youtube_service, 'UkcffB3oTovbbTne3sd0m0mya6NXa0TI');
  print_r($res);
  // $res = getVideoCaptionsList($youtube_service, 'qPYIrI0-FV4');
  // print_r(json_encode($res['items'][0]));

  // $list_info_res = getPlaylistInfo('PLSEFni51m3VKv5OjLvD10CH2kz0TTQGDU', 25, $youtube_key);
  // print_r($list_info_res);
  // $video_info_res = getVideoInfo('qPYIrI0-FV4', $youtube_key);
  // print_r($video_info_res);
?>