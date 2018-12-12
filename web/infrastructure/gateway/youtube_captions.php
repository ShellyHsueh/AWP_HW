<?php
// Require the google/apiclient library
if (!file_exists($_SERVER['DOCUMENT_ROOT'].'/vendor/autoload.php')) {
  throw new \Exception('please run "composer require google/apiclient:~2.0" in "' . $_SERVER['DOCUMENT_ROOT'] .'"');
}

require_once $_SERVER['DOCUMENT_ROOT'].'/vendor/autoload.php';


// The redirect path set to current file (FILTER_SANITIZE_URL: 刪除非法url字符)
$redirect_url = filter_var('http://' . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF'], FILTER_SANITIZE_URL);
// Use $client to make Google API requests
$client = createGoogleClientToCallAPI($private_key, $client_email, $client_id, $redirect_url);
$youtube_service = new Google_Service_YouTube($client);


function createGoogleClientToCallAPI($private_key, $client_email, $client_id, $redirect_url) {
  $client_parameters = array(
    'client_email'      => $client_email,
    'signing_algorithm' => 'HS256',
    'signing_key'       => $private_key
  );

  $client = new Google_Client( $client_parameters );
  $client->setClientId($client_id); 

  $client->useApplicationDefaultCredentials();
  $client->setScopes(['https://www.googleapis.com/auth/youtube.force-ssl', 'https://www.googleapis.com/auth/youtubepartner']);
  $client->setRedirectUri($redirect_url);
  
  return $client;
}


// To get "list of caption id",  based on video_id
function getVideoCaptionsList($youtube_service, $video_id, $part='snippet') {
  $caption_list_res = $youtube_service->captions->listCaptions($part, 
                                                               $video_id);
  return json_encode($caption_list);
}


// To get "caption contents (a string of lines of captions)", based on caption_id
// params: 'tfmt'  => return caption in a specific format (sbv, scc, srt, ttml, vtt)
//         'tlang' => translate the caption to a specific language
function getCaptionContents($youtube_service, $caption_id, $params=array('tfmt'=>'srt', 'alt'=>'media', 'tlang'=>'')) {
  $params = array_filter($params);  // Filter out empty params
  $captionResource = $youtube_service->captions->download($caption_id, 
                                                          $params);
  $captionContents = $captionResource->getBody()->getContents(); 

  return $captionContents;
}



?>