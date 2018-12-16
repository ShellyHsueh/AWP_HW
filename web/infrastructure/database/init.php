<?php

define('DATABASE_URL', $DATABASE_URL);

////// ORM Connection
ActiveRecord\Config::initialize(function($config) {
  $config->set_model_directory(__DIR__.'/orm');
  $config->set_connections(
    array(
      'development' => DATABASE_URL,
      'production'  => DATABASE_URL
    )
  );
});

// To override the default string containing timezone, which will cause error when storing into DB
ActiveRecord\Connection::$datetime_format = 'Y-m-d H:i:s';

?>