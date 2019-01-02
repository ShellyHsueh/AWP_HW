<?php
require_once __DIR__.'/init.php';
?>

<!DOCTYPE html>
<html style="height:100%">
<head>
  <?php echoBootstrapAndJqueryDependencies(); ?>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>
  <script src="https://www.youtube.com/iframe_api"></script>

  <script src="assets/javascripts/utility.js"></script>
  <script src="assets/javascripts/CaptionEditor.js"></script>
  <script src="assets/javascripts/YtPlayer.js"></script>
  <script src="assets/javascripts/video.js"></script>
  
  <link rel="stylesheet" href="assets/css/general.css">
  <link rel="stylesheet" href="assets/css/caption_editor.css">
</head>

<body style="height:100%">
  <?php echoNavbar()?>
  <div class="container-fluid h-100" style="padding-top:7rem">

    <div class="row h-100">

      <div class="col-12 col-md-6">
        <div class="video" id="player"></div>
        <button id="btn-go-edit" class="btn btn-outline-light btn-sm">EDIT SUBTITLE</button>
      </div>

      <div class="caption-area col-12 col-md-6 h-100" style="overflow-y:scroll">
        <div id="caption-editor">
          <!-- caption cards will be appended here -->
          <div id="caption-cards"></div>
        </div>
      </div>
      
    </div>

  </div>
</body>

</html>