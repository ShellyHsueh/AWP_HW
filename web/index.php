<?php
require_once __DIR__.'/init.php';
?>

<!DOCTYPE html>
<html style="height:100%">
<head>
  <?php echoBootstrapAndJqueryDependencies(); ?>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>
  <script src="assets/javascripts/utility.js"></script>
  <script src="assets/javascripts/caption_editor_page.js"></script>
  <script src="assets/javascripts/youtube_player.js"></script>
  <link rel="stylesheet" href="assets/css/caption_editor.css">
</head>


<body style="height:100%">
  <?php echoNavbar()?>

  <div class="container-fluid h-100" style="padding-top:5rem">
    <div class="row h-100">

      <div class="caption-editor-area col-6 h-100" style="overflow-y:scroll">
        <!-- <div class="col-12">
          <form id="form">
            <input type="file" name="file" id="file" />
            <input type="submit" name="do" id="do" value="submit" />
          </form>
        </div> -->
        <div id="caption-editor">
          <!-- caption cards will be appended here -->
          <div id="caption-cards"></div>
        </div>
      </div>

      <div class="col-6">
        <div class="video" id="player"></div>
        <div id="current_caption"></div>
      </div>

    </div>
  </div>
</body>

</html>

