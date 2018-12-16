<?php

// To get "list of caption id",  based on video_id
function getVideoCaptionsInfo_API($youtube_service, $video_id, $part='snippet') {
  $caption_list_res = $youtube_service->captions->listCaptions($part, 
                                                               $video_id);
  return json_encode($caption_list_res);
}


// To get "caption contents (a string of lines of captions)", based on caption_id
// params: 'tfmt'  => return caption in a specific format (sbv, scc, srt, ttml, vtt)
//         'tlang' => translate the caption to a specific language
function getCaptionContents_API($youtube_service, $caption_id, $params=array('tfmt'=>'srt', 'alt'=>'media', 'tlang'=>'')) {
  $params = array_filter($params);  // Filter out empty params
  $captionResource = $youtube_service->captions->download($caption_id, 
                                                          $params);
  $captionContents = $captionResource->getBody()->getContents(); 

  return $captionContents;
}



?>