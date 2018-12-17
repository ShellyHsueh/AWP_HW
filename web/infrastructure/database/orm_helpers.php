<?php

// Input: selected activerecord object
//        (e.g. Captions::find_by_id('5c168316baf20'))
// Usage: getResultArr($ar_obj)['content'];
function getResultArr($ar_obj) {
  $ar_arr = (array) $ar_obj;
  $result_arr = array_values($ar_arr)[1];
  return $result_arr;
}

// Input: array of selected activerecord objects 
//        (e.g. Captions::find_all_by_caption_id('GnUUpSDxEMqvLUf2SIkkl-OdhrUz3Fj5'))
// Usage: getArrayofResultArr($ar_objs_arr)[idx]['content'];
function getArrayofResultArr($ar_objs_arr) {
  $array_of_result_arr = [];
  foreach ($ar_objs_arr as $ar_obj) {
    array_push($array_of_result_arr, getResultArr($ar_obj));
  }

  return $array_of_result_arr;
}


?>