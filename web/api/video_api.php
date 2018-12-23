<?php

require_once __DIR__.'/../init.php';

### Interface to js
# Usage:
// $.ajax({
//   type: 'POST',
//   url: video_api,
//   dataType: 'json',
//   data: {
//     functionname: 'function_name',
//     arguments: video_id/list_id
//   },
//   success: function(res, res_status) {...} // no need to parse res
// })

header('Content-Type: application/json');

$result = [];

if( !isset($_POST['functionname']) ) { $result['error'] = 'No function name'; }
if( !isset($_POST['arguments']) ) { $result['error'] = 'No function arguments'; }

if( !isset($result['error']) ) {
  switch($_POST['functionname']) {
    case 'videoInfo':
      $result['result'] = json_encode(videoInfo($YOUTUBE_SERVICE, $_POST['arguments']), true);
      break;
    case 'playlistVideosInfo':
      $result['result'] = json_encode(playlistVideosInfo($YOUTUBE_SERVICE, $_POST['arguments']), true);
      break;
    default:
      $result['error'] = 'Not found function '.$_POST['functionname'];
      break;
  }
}

echo json_encode($result, true);

?>