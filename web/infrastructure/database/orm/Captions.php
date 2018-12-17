<?php

class Captions extends ActiveRecord\Model {
  public static $table_name = 'captions';  // Not required (default assuming table_name=小寫class_name)
  public static $primary_key = 'id';
  public static $belongs_to = array(
    array(
      'videos', 
      'foreign_key' => 'videos_id', 
      'class_name' => 'Videos'
    )
  );
}

?>