<?php



// Usage: e.g. englishCaptionContents($YOUTUBE_SERVICE, <video_id>)[idx]['content']
// Return an array of caption contents objects
function englishCaptionContents($youtube_service, $video_id) {
  $en_caption_id = langsCaptionIds($youtube_service, $video_id)['en'];

  // If captions of the caption_id are already in DB, then return db captions
  $db_captions = Captions::find_all_by_caption_id($en_caption_id);
  if (!empty($db_captions)) {
    return getArrayofResultArr($db_captions);
  }

  // Call API for captions and store results, only if not found in DB
  $raw_captions_str = getCaptionContents_API($youtube_service, $en_caption_id);
  $captions_str_arr = explode("\n\n", $raw_captions_str);

  $all_captions = [];
  foreach ($captions_str_arr as $caption_str) {
    $caption = captionStrParser($caption_str); // containing: start, end, content

    if ($caption) {
      $caption['id'] = uniqid();  // Random id string
      $caption['caption_id'] = $en_caption_id;
      $caption['video_id'] = $video_id;
      $caption['locale'] = 'en';
      storeCaption($caption);
      
      array_push($all_captions, $caption);
    }
  }
  return $all_captions;
}


// Input: [ 'id'=><id>, 'caption_id'=><caption_id>, ... ]
// Output: the updated data (same as input)
function updateCaption($new_data_obj) {
  $db_caption = Captions::find_by_id($new_data_obj['id']);

  if (empty($db_caption)) {
    var_dump('not in DB, go storing new data');
    return storeCaption($new_data_obj);
  }

  $db_caption->update_attributes($new_data_obj); // => true
  return $new_data_obj;
}




################################
### For main functions

function langsCaptionIds($youtube_service, $video_id) {
  $captions_info_json = getVideoCaptionsInfo_API($youtube_service, $video_id);
  $captions_info = json_decode($captions_info_json, true);

  $land_caption_obj = [];
  foreach ($captions_info['items'] as $caption_info) {
    $land_caption_obj[ $caption_info['snippet']['language'] ] = $caption_info['id'];
  }
  return $land_caption_obj; // Return an associative arrays: [ 'en':'caption_id_here', ... ]
}

// $caption_str: e.g. "1\n00:00:00,383 --> 00:00:01,973\nHello it's Kinoshita Yuka\n( English subtitles By ~Aphexx~ )"
// Return [ 'start'=>'0.383', 'end'=>'1.973', 'content'=>"Hello it's Kinoshita Yuka" ]
function captionStrParser($caption_str) {
  $caption_data_arr = explode("\n", $caption_str);

  // Return NULL if it's empty caption (no caption time / no content)
  if (empty($caption_data_arr[1]) || empty($caption_data_arr[2])) {
    return;
  }

  $caption = [];
  $caption_time = explode(" --> ", $caption_data_arr[1]);

  $caption['start'] = convertTimeToSec($caption_time[0]);
  $caption['end'] = convertTimeToSec($caption_time[1]);
  $caption['content'] = $caption_data_arr[2];

  return $caption;
}

// To store caption into DB by an array of caption data
// Input: an array of caption data
// Output: an array of created data
function storeCaption($data) {
  $created_caption = Captions::create(
    [
      'id'           => $data['id'],
      'caption_id'   => $data['caption_id'],
      'video_id'     => $data['video_id'],
      'locale'       => $data['locale'],
      'start'        => $data['start'],
      'end'          => $data['end'],
      'content'      => $data['content']
    ]
  );

  return getResultArr($created_caption);
}



?>