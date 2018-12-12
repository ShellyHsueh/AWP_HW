<?php
define('WEB_ROOT', $_SERVER['DOCUMENT_ROOT'].'/web');


$configs_file = __DIR__.'/secrets.dev.json';

if (file_exists($configs_file)) {
  define('ENV', 'development');
  $configs = json_decode(file_get_contents($configs_file), true);

  $private_key     = $configs['GOOGLE_API_PRIVATE_KEY'];
  $client_email    = $configs['GOOGLE_API_CLIENT_EMAIL'];
  $client_id       = $configs['GOOGLE_API_CLIENT_ID'];
  $youtube_key     = $configs['YOUTUBE_KEY'];
  $database_url    = $configs['DATABASE_URL'];
} else {  // No credential file in production
  define('ENV', 'production');
  
  $private_key     = str_replace('\n', "\n", getenv('GOOGLE_API_PRIVATE_KEY')); // For getting correct private key format from heroku config
  $client_email    = getenv('GOOGLE_API_CLIENT_EMAIL');
  $client_id       = getenv('GOOGLE_API_CLIENT_ID');
  $youtube_key     = getenv('YOUTUBE_KEY');
  $database_url    = getenv('CLEARDB_DATABASE_URL');
}

?>