<?php

$configs_file = __DIR__.'/secrets.dev.json';

if (file_exists($configs_file)) {
  define('ENV', 'development');
  $configs = json_decode(file_get_contents($configs_file), true);

  $GOOGLE_API_PRIVATE_KEY  = $configs['GOOGLE_API_PRIVATE_KEY'];
  $GOOGLE_API_CLIENT_EMAIL = $configs['GOOGLE_API_CLIENT_EMAIL'];
  $GOOGLE_API_CLIENT_ID    = $configs['GOOGLE_API_CLIENT_ID'];
  $YOUTUBE_KEY             = $configs['YOUTUBE_KEY'];
  $DATABASE_URL            = $configs['DATABASE_URL'];
} else {  // No credential file in production
  define('ENV', 'production');

  $GOOGLE_API_PRIVATE_KEY  = str_replace('\n', "\n", getenv('GOOGLE_API_PRIVATE_KEY')); // For getting correct private key format from heroku config
  $GOOGLE_API_CLIENT_EMAIL = getenv('GOOGLE_API_CLIENT_EMAIL');
  $GOOGLE_API_CLIENT_ID    = getenv('GOOGLE_API_CLIENT_ID');
  $YOUTUBE_KEY             = getenv('YOUTUBE_KEY');
  $DATABASE_URL            = getenv('CLEARDB_DATABASE_URL');
}



##########################
### For youtube API

// Require the google/apiclient library
if (!file_exists($_SERVER['DOCUMENT_ROOT'].'/vendor/autoload.php')) {
  throw new \Exception('please run "composer require google/apiclient:~2.0" in "' . $_SERVER['DOCUMENT_ROOT'] .'"');
}

require_once $_SERVER['DOCUMENT_ROOT'].'/vendor/autoload.php';


// The redirect path set to current file (FILTER_SANITIZE_URL: 刪除非法url字符)
$redirect_url = filter_var('http://' . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF'], FILTER_SANITIZE_URL);
// Use $client to make Google API requests
$client = createGoogleClientToCallAPI($GOOGLE_API_PRIVATE_KEY, 
                                      $GOOGLE_API_CLIENT_EMAIL, 
                                      $GOOGLE_API_CLIENT_ID, 
                                      $redirect_url);
$YOUTUBE_SERVICE = new Google_Service_YouTube($client);


function createGoogleClientToCallAPI($private_key, $client_email, $client_id, $redirect_url) {
  $client_parameters = array(
    'client_email'      => $client_email,
    'signing_algorithm' => 'HS256',
    'signing_key'       => $private_key
  );

  $client = new Google_Client( $client_parameters );
  $client->setClientId($client_id); 

  $client->useApplicationDefaultCredentials();
  $client->setScopes(['https://www.googleapis.com/auth/youtube.force-ssl', 'https://www.googleapis.com/auth/youtubepartner']);
  $client->setRedirectUri($redirect_url);
  
  return $client;
}

############################

?>