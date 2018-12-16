<?php


// Usage: e.g. videoInfo($YOUTUBE_SERVICE, <video_id>)->video_id
// Return video info obj
function videoInfo($youtube_key, $video_id) {
  // Check if the video exists in DB
  $db_video = Videos::find_by_video_id($video_id, 0);
  if ($db_video != null) {
    var_dump('db video:  ');
    return $db_video;
  }

  // Call API for the video and store results, only if not found in DB
  $raw_info_json = getVideoInfo_API($youtube_key, $video_id);
  $raw_info = json_decode($raw_info_json, true);
  if (count($raw_info['items']) == 0 ) {
    return;
  };

  $publish_date_converted = convertDateTime($raw_info['items'][0]['snippet']['publishedAt']);

  return Videos::create(
    array(
      'video_id'           => $video_id,
      'title'              => $raw_info['items'][0]['snippet']['title'],
      'description'        => $raw_info['items'][0]['snippet']['description'],
      'thumbnail_url'      => $raw_info['items'][0]['snippet']['thumbnails']['medium']['url'],
      'thumbnail_width'    => $raw_info['items'][0]['snippet']['thumbnails']['medium']['width'],
      'thumbnail_height'   => $raw_info['items'][0]['snippet']['thumbnails']['medium']['height'],
      'channel_id'         => $raw_info['items'][0]['snippet']['channelId'],
      'author_name'        => $raw_info['items'][0]['snippet']['channelTitle'],
      'publish_date'       => $publish_date_converted,
      'default_lang'       => $raw_info['items'][0]['snippet']['defaultLanguage'],
      'default_audio_lang' => $raw_info['items'][0]['snippet']['defaultAudioLanguage']
    )
  );
}


function playlistVideosInfo($youtube_key, $playlist_id) {
  $raw_info_json = getPlaylistInfo_API($youtube_key, $playlist_id);
  $raw_info = json_decode($raw_info_json, true);

  // If API returns error, then return an array of the error details. 
  // To see error_code: $raw_info['error']['code'] or error_msg: $raw_info['error']['message']
  if ($raw_info['error'] != null) {
    return $raw_info['error']; 
  }

  $videos_arr = [];
  foreach ($raw_info['items'] as $video) {
    $video_info = videoInfo($youtube_key, $video['contentDetails']['videoId']);
    array_push($videos_arr, $video_info);
  }

  return $videos_arr;
}


?>