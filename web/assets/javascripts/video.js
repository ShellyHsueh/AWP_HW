var video_id = getUrlValue('video_id');
var caption_api = 'api/caption_api.php'; // relative path based on caption edit page


$(document).ready(function() {
  setCaptionEditorAndPlayer();
  onCaptionClicked();
  onGoEditClicked();
});


function setCaptionEditorAndPlayer() {
  $.ajax({
    type: 'POST',
    url: caption_api,
    dataType: 'json',
    data: {
      functionname: 'englishCaptionContents',
      arguments: video_id
    },

    // res already parsed by ajax, but res['result'] needs to be parsed
    success: function(res, res_status) {
      if( !('error' in res) ) {
        var captions_arr = JSON.parse(res['result']);
        createCaptionCards(captions_arr);
        loadPlayer();
      }
      else {
        console.log(res['error']);
      }
    }
  })
}


function createCaptionCards(captions_arr) {
  var sorted_arr = captions_arr.sort(function(first, second) {
    return first.start - second.start;
  });

  for (var i in sorted_arr) {
    var caption_card = createCaptionCard(sorted_arr[i]);
    $(caption_card).appendTo("#caption-cards");
  }
}


function createCaptionCard(caption) {
  return (
    "<div data-id='"+ caption['id'] +"' \
          data-start=" + caption['start'] + " data-end="+ caption['end'] +
          " class='card caption-card border-top-0 border-right-0 border-bottom border-left-0 rounded-0'>\
      <div class='card-body d-flex'>\
        <div class='d-flex flex-column mr-auto col-5 col-md-3'>\
          <span class='start-time'>" + secToMinSec(caption['start']) + "</span>\
          <span class='end-time' >" + secToMinSec(caption['end']) + "</span>\
        </div>\
        <p class='d-flex col-7 col-md-9'>" + caption['content'] + "</p>\
      </div>\
    </div>"
  );
}


function onGoEditClicked() {
  $('#btn-go-edit').click(function() {
    // Redirect to the file in the root directory of the current page
    redirect_url = 'caption_editor.php?video_id=' + getUrlValue('video_id');
    $(location).attr('href', redirect_url);
  });
}




//############################
//### Caption Events

function addEventsToCards() {
  onCaptionClicked();
}


// When a caption card is clicked, the player plays it
function onCaptionClicked() {
  $('.caption-card').click(function() {
    playVideo(this.dataset.start, this.dataset.end);
  });
}
