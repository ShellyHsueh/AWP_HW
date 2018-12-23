
var caption_api = 'api/caption_api.php'; // relative path based on caption edit page

$(document).ready(function() {
  onFileSelected();
  onFileUploadClicked();
});


function onFileSelected() {
  // File validation (.srt only)
  $(':file').on('change', function() {
    var file = this.files[0];
    if (!fileValidationAndAlert(file)) {
      return;
    };
  });
}


function onFileUploadClicked() {
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
}


//###############################
//### Used by bellow functions

function fileValidationAndAlert(file) {
  // if (!file.name.includes('.srt')) <---- IE not support
  if (file.name.indexOf('.srt') <= -1) {
    alert('Please upload .srt file');
    return false;
  } else {
    return true;
  };
}