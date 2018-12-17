var video_id = getUrlValue('video_id');
var caption_api = 'api/caption_api.php'; // relative path based on 'caption_editor.php'


$(document).ready(function() {
  setCaptionEditorAndPlayer();
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
      console.log(captions_arr)
      Session.set('captions_arr', captions_arr);
      create_caption_cards(captions_arr);
      loadPlayer();
    }
    else {
      console.log(res['error']);
    }
  }
})
}


function create_caption_cards(captions_arr) {
  for (var i in captions_arr) {
    var caption_card = create_caption_card(captions_arr[i]);
    $(caption_card).appendTo("#caption-cards");
  }
}


function create_caption_card(caption) {
  return (
    "<div data-id='"+ caption['id'] +"' \
          data-start=" + caption['start'] + " data-end="+ caption['end'] +
          " class='card caption-card border-top-0 border-right-0 border-bottom border-left-0 rounded-0'>\
      <div class='card-body d-flex'>\
        <div class='d-flex flex-column mr-auto col-4 col-md-3 editor-timestamp-container'>\
          <input type='text' class='editor-time-input start-time' placeholder='00:00.0' value='" + convertSecToTime(caption['start']) + "' ></input>\
          <input type='text' class='editor-time-input end-time' placeholder='00:00.0' value='" + convertSecToTime(caption['end'])   + "' ></input>\
        </div>\
        <textarea class='editor-text-area d-flex col-5 col-md-7'>" + caption['content'] + "</textarea>\
        <div class='d-flex flex-column col-3 col-md-2'>\
          <button class='btn btn-danger p-0' id='btn-delete'>x</button>\
          <button class='btn btn-light p-0' id='btn-add'>+</button>\
        </div>\
      </div>\
    </div>"
  );
}
