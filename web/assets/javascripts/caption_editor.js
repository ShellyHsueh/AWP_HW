//##################################
//### Caption Editor Page Init
var caption_api = 'api/caption_api.php'; // relative path based on caption edit page


$(document).ready(function() {
  onGoVideoClicked();
  onFileSelected();
  onFileUploadClicked();
});



function onGoVideoClicked() {
  $('#btn-go-video').click(function() {
    // Redirect to the file in the root directory of the current page
    redirect_url = 'video.php?video_id=' + getUrlValue('video_id');
    $(location).attr('href', redirect_url);
  });
}





//###################################
// Namespace Pattern


var video_id = getUrlValue('video_id'),
    caption_editor,
    yt_player;


caption_editor = new OURTUBE.CaptionEditor('caption-cards', {
  video_id: video_id,
  card_type: 'time-caption',
  events: {
    'onCaptionLoaded': onCaptionLoaded,
    'onCaptionClicked': onCaptionClicked,
    'onCaptionInsert': onCaptionInsert,
    'onCaptionUpdate': onCaptionUpdate,
    'onCaptionDelete': onCaptionDelete
  }
});


function onCaptionLoaded() {
  yt_player = new OURTUBE.YtPlayer(video_id, {
    events: {
      'onPlayerPlaying': onPlayerPlaying
    }
  });

  yt_player.ytPlayerConfig('player');
}



function onCaptionClicked(caption_card) {
  yt_player.playVideo(caption_card.dataset.start, caption_card.dataset.end);
}



function onCaptionUpdate(caption_data, caption_card) {
  updateDBAndCard(caption_data, caption_card)
}



function onCaptionInsert(default_caption_data, new_caption_card) {
  updateDBAndCard(default_caption_data, new_caption_card)
}


function onCaptionDelete(del_caption_card) {
  deleteDBCaptionAndCard(del_caption_card.dataset.id);
}



function onPlayerPlaying(current_time) {
  var cards_num = caption_editor.caption_cards.length;
  for (var i=0; i < cards_num; i ++) {
    var start = $('.caption-card')[i].dataset.start,
        end = $('.caption-card')[i].dataset.end;

    if (current_time >= start && current_time < end) {
      caption_editor.scrollToCaption(i);
      caption_editor.captionHighlight(i);
    }
  }
}



//############################
// Upload Caption File


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
            var captions_arr = JSON.parse(res['result']),
                cards_container = document.getElementById('caption-cards');

            // If caption cards exist, then remove all and append new ones
            if ($('.caption-card').length) {
              $('.caption-card').remove();
            }

            caption_editor.createCaptionCards(captions_arr, cards_container);
            caption_editor.addCaptionCardEvents();
          }
        },
        cache: false,
        contentType: false,
        processData: false

      });
    };
    
  })
}



function fileValidationAndAlert(file) {
  // if (!file.name.includes('.srt')) <---- IE not support
  if (file.name.indexOf('.srt') <= -1) {
    alert('Please upload .srt file');
    return false;
  } else {
    return true;
  };
}





//############################
//### Access Database

// Input: { id:'<db_id>', video_id:'<video_id>', start:0.00, end:0.00 }
function updateDBAndCard(input_data, card_dom) {
  $.ajax({
    type: 'POST',
    url: caption_api,
    dataType: 'json',
    data: {
      functionname: 'updateCaption',
      arguments: JSON.stringify(input_data)
    }
  });
}


function deleteDBCaptionAndCard(db_id) {
  $.ajax({
    type: 'POST',
    url: caption_api,
    dataType: 'json',
    data: {
      functionname: 'deleteCaption',
      arguments: db_id
    },
    success: function(res, res_status) {
      var deleted_caption = JSON.parse(res['result']); // It should return the deleted caption data if successfully deleted

      if (typeof deleted_caption == 'undefined' || deleted_caption==null) {
        alert('Failed to delete the caption from database');
        return;
      }
    }
  })
}