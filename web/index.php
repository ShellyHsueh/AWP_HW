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
        <div class="col-12 m-2 affix">
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
        <div id="current_caption"></div>
      </div>

    </div>
  </div>
</body>

<script>

var caption_api = 'api/caption_api.php'; // relative path based on caption edit page

// File validation (.srt only)
$(':file').on('change', function() {
  var file = this.files[0];
  if (!fileValidationAndAlert(file)) {
    return;
  };
});


function fileValidationAndAlert(file) {
  // if (!file.name.includes('.srt')) <---- IE not support
  if (file.name.indexOf('.srt') <= -1) {
    alert('Please upload .srt file');
    return false;
  };
}


$('#caption-upload-form').submit(function(event) {
  event.preventDefault();

  var file = $('#file')[0].files[0];
  if (!fileValidationAndAlert(file)) {
    return;
  };

  var reader = new FileReader();
  reader.readAsText(file);

  // file讀取完成時觸發: 將file text(string)送到後端
  reader.onload = function(event) {
    var formData = new FormData($('#caption-upload-form'));
    formData.append('functionname', 'handleCaptionFile');
    var data = { caption_str: event.target.result,
                 video_id: getUrlValue('video_id')}
    formData.append('arguments', JSON.stringify(data));

    $.ajax({
      url: caption_api,  
      type: 'POST',
      data: formData,
      success: function(res, res_state) {
        if( !('error' in res) ) {
          var captions_arr = JSON.parse(res['result']);

          // If caption cards exist, then remove all and append new ones
          if ($('.caption-card').length) {
            console.log('removed all!')
            $('.caption-card').remove();
          }
          console.log('append new captions!!')
          createCaptionCards(captions_arr);
          addEventsToCards();
        }
        else {
          console.log(res['error']);
        }
      },
      cache: false,
      contentType: false,
      processData: false

    });
  };
  
})

</script>

</html>

