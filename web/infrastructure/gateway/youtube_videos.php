<?php





// GET https://www.googleapis.com/youtube/v3/videos?part=snippet&id=<video_id>&key=<YOTUBE_KEY>
function getVideoInfo_API($youtube_key, $video_id) {
  $query = array(
    'part'   => 'snippet',
    'id'     => $video_id,
    'key'    => $youtube_key
  );
  $query_str = http_build_query($query);

  return getYoutubeAPI('videos', $query_str);
}


// GET https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=<playlist_id>&maxResults=50&key=<YOUTUBE_KEY>
function getPlaylistInfo_API($youtube_key, $playlist_id) {
  $query = array(
    'part'         => 'contentDetails',
    'playlistId'   => $playlist_id,
    'maxResults'   => 50, // Maximum of 'maxResults' is 50
    'key'          => $youtube_key
  );
  $query_str = http_build_query($query);

  return getYoutubeAPI('playlistItems', $query_str);
}



##########################
### For functions above

// Sending GET request to youtube API with cURL
function getYoutubeAPI($path, $query_str) {
  $req_url = 'https://www.googleapis.com/youtube/v3/' . $path . '?' . $query_str;

  $ch = curl_init($req_url);                      // Initialize cURL session
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Return the result, rather than just true/false
  // curl_setOpt($ch, CURLOPT_SSL_VERIFYPEER, false);
  $response = curl_exec($ch);                     // Perform the request, and save content to $response(json)
  
  // print_r(curl_getinfo($ch));  // To see the http request contents
  if($errno = curl_errno($ch)) {
    $error_message = curl_strerror($errno);
    echo "cURL error ({$errno}):\n {$error_message}";
  }

  curl_close($ch);                                // Close the cURL resource to free up system resources
  return $response;
}

?>