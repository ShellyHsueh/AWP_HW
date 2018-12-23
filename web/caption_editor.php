<?php
require_once __DIR__.'/init.php';
?>

<!DOCTYPE html>
<html style="height:100%">
<head>
  <?php echoBootstrapAndJqueryDependencies(); ?>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>

  <script src="assets/javascripts/utility.js"></script>
  <script src="assets/javascripts/caption_editor.js"></script>
  <script src="assets/javascripts/youtube_player.js"></script>
  <script src="assets/javascripts/caption_file_uploader.js"></script>

  <link rel="stylesheet" href="assets/css/general.css">
  <link rel="stylesheet" href="assets/css/caption_editor.css">
</head>


<body style="height:100%">
  <?php echoNavbar()?>

  <div class="container-fluid h-100" style="padding-top:5rem">
    <div class="row h-100">

      <div class="caption-area col-6 h-100" style="overflow-y:scroll">
        <div class="col-12 m-2">
          <form id="caption-upload-form">
            <input type="file" id="file" name="file" class="" />
            <input type="submit" id="btn-file-upload" value="UPLOAD" />
            <p class="small text-danger">NOTE: Uploading new srt file will replace the old one.</p>
          </form>
        </div>
        <div id="caption-editor">
          <!-- caption cards will be appended here -->
          <div id="caption-cards"></div>
        </div>
      </div>

      <div class="col-6">
        <div class="video" id="player"></div>

        <button id="btn-go-video" class="btn btn-outline-light btn-sm">FINISH</button>
      </div>

    </div>
  </div>
</body>



</html>

