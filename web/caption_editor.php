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
  <script src="assets/javascripts/caption_editor.js"></script>

  <link rel="stylesheet" href="assets/css/general.css">
  <link rel="stylesheet" href="assets/css/caption_editor.css">
</head>


<body style="height:100%">
  <?php echoNavbar()?>

  <div class="container-fluid h-100" style="padding-top:5rem">
    <div class="row col-12 mt-2">
      <div class="col-11">
        <form id="caption-upload-form">
          <label for="file" class="btn btn-sm btn-outline-light mb-0 cursor-pointer">
            <i class="fa fa-cloud-upload"></i>
            SELECT FILE
          </label>
          <input type="file" id="file" class="d-none" name="file" />
          <span id="selected-filename" class="text-muted mx-2 align-middle">No files</span>
          <input type="submit" class="btn btn-sm btn-outline-light cursor-pointer" value="UPLOAD" />
          <p class="small text-danger">* Uploading a new srt file will replace current subtitles.</p>
        </form>
      </div>
      <div class="col-1">
        <button id="btn-go-video" class="btn btn-outline-secondary btn-sm">FINISH</button>
      </div>
    </div>
    <div class="row h-100">

      <div class="caption-area col-6 h-100" style="overflow-y:scroll">
        <div id="caption-editor">
          <!-- caption cards will be appended here -->
          <div id="caption-cards"></div>
        </div>
      </div>

      <div class="col-6">
        <div class="video" id="player"></div>
        <p class="small text-muted">NOTE: Please follow the correct time format. The player will not play the suptitle with invalid start/end time.</p>
      </div>

    </div>
  </div>
</body>



</html>

