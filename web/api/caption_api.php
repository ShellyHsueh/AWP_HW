<?php

require_once __DIR__.'/../init.php';

### Interface to js
# Usage:
// $.ajax({
//   type: 'POST',
//   url: caption_api,
//   dataType: 'json',
//   data: {
//     functionname: 'function_name',
//     arguments: video_id
//   },
//   success: function(res, res_status) {...} // no need to parse res
// })

header('Content-Type: application/json');

$result = [];

if( !isset($_POST['functionname']) ) { $result['error'] = 'No function name'; }
if( !isset($_POST['arguments']) ) { $result['error'] = 'No function arguments'; }

if( !isset($result['error']) ) {
  switch($_POST['functionname']) {
    case 'englishCaptionContents':
      $result['result'] = json_encode(englishCaptionContents($YOUTUBE_SERVICE, $_POST['arguments']), true);
      break;
    case 'handleCaptionFile':
      $caption_str = json_decode($_POST['arguments'], true)['caption_str'];
      $video_id = json_decode($_POST['arguments'], true)['video_id'];

      $caption_arr = handleCaptionFile($caption_str, $video_id);
      $result['result'] = json_encode($caption_arr, true);
      break;
    case 'updateCaption':
      $result['result'] = json_encode(updateCaption($_POST['arguments']), true);
      break;
    case 'deleteCaption':
      $result['result'] = json_encode(deleteCaption($_POST['arguments']), true);
      break;
    default:
      $result['error'] = 'Not found function '.$_POST['functionname'];
      break;
  }
}

echo json_encode($result, true);

?>