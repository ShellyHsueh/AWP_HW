<?php

use ActiveRecord as AR;

class Videos extends AR\Model {
  public static $table_name = 'videos';  // Not required (default assuming table_name=小寫class_name)
  public static $primary_key = 'video_id';
}

?>