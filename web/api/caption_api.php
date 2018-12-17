<?php

require_once __DIR__.'/../init.php';

### Interface to js

header('Content-Type: application/json');

$result = [];

if( !isset($_POST['functionname']) ) { $result['error'] = 'No function name'; }
if( !isset($_POST['arguments']) ) { $result['error'] = 'No function arguments'; }

if( !isset($result['error']) ) {
  switch($_POST['functionname']) {
    case 'englishCaptionContents':
      $result['result'] = json_encode(englishCaptionContents($YOUTUBE_SERVICE, $_POST['arguments']), true);
      break;
    default:
      $result['error'] = 'Not found function '.$_POST['functionname'];
      break;
  }
}

echo json_encode($result, true);

?>