<?php

// Input: datetime str from YT API 'YYYY-MM-DDThh:mm:ss.sZ'(iso8601) 
// Return: datetime str for mysql DATETIME 'YYYY-MM-DD hh:mm:ss'(UTC)
function isoToDateTime($datetime_str){
  $datetime_obj = new ActiveRecord\DateTime($datetime_str);
  return $datetime_obj->format('db'); // 'db' == 'Y-m-d H:i:s'(UTC)
}

// '00:00:00,383' -> 0.383 (float)
function ytCaptionTimeToSec($time_str) {
  $ms = explode(',', $time_str)[1];
  $sec = strtotime(str_replace(',', '.', $time_str)) - strtotime('00:00:00'); // To subtract the init time
  $sec_float= floatval($sec . '.' . $ms);
  
  return $sec_float;
}

?>