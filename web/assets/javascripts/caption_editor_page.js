//##################################
//### Caption Editor Page Initialization
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
        // Session.set('captions_arr', captions_arr);
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
        <div class='d-flex flex-column mr-auto col-4 col-md-3 editor-timestamp-container'>\
          <input type='text' class='editor-time-input start-time' placeholder='00:00.0' value='" + secToMinSec(caption['start']) + "' ></input>\
          <input type='text' class='editor-time-input end-time' placeholder='00:00.0' value='" + secToMinSec(caption['end'])   + "' ></input>\
        </div>\
        <textarea class='editor-text-area d-flex col-5 col-md-7'>" + caption['content'] + "</textarea>\
        <div class='d-flex flex-column col-3 col-md-2'>\
          <button class='btn btn-danger btn-delete p-0'>x</button>\
          <button class='btn btn-light btn-add p-0'>+</button>\
        </div>\
      </div>\
    </div>"
  );
}


function sortCardsByStart() {
  var sorted_cards = $('.caption-card').sort(function(first, second) {
    return $(first).data('start') - $(second).data('start');
  })

  $('.caption-card').remove();
  $(sorted_cards).appendTo('#caption-cards');
  addEventsToCards();
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
    },

    success: function(res, res_status) { // res_status=='success'
      console.log(res)
      var updated_data = JSON.parse(res['result']);
      
      // Update cards data attributs & resort cards if updated successfully
      if (updated_data != null || typeof updated_data != 'undefined') {
        console.log(updated_data['id'])
        card_dom.dataset.id = updated_data['id'];

        if ('start' in input_data || 'end' in input_data) {
          card_dom.dataset.start = updated_data['start'];
          card_dom.dataset.end = updated_data['end'];
          
          sortCardsByStart();
        }
      }
    }

  });
}


function deleteDBCaptionAndCard(db_id, card_dom) {
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

      $(card_dom).remove();
    }
  })
}


//############################
//### Caption Editor Events


function addEventsToCards() {
  onCaptionClicked();
  onCaptionUpdate();
  onCaptionInsert();
  onCaptionDelete();
}


// When a caption card is clicked, the player plays it
function onCaptionClicked() {
  $('.caption-card').click(function() {
    playVideo(this.dataset.start, this.dataset.end);
  });
}


// When keying any things on inputs/textarea of a caption card, it should update DB immediately
function onCaptionUpdate() {
  $('.editor-text-area').keyup(function() {
    var caption_card = $(this).parents('.caption-card')[0],
        caption_data = {
          id: caption_card.dataset.id,
          video_id: getUrlValue('video_id'),
          content: this.value
        };

    updateDBAndCard(caption_data, caption_card);
  });

  $('.start-time, .end-time').change(function() {
    var caption_card = $(this).parents('.caption-card')[0],
        caption_data = {
          id: caption_card.dataset.id,
          video_id: getUrlValue('video_id')
        };

    if (this.className.includes('start-time')) {
      caption_data['start'] = minsecToSec(this.value);
    }
    if (this.className.includes('end-time')) {
      caption_data['end'] = minsecToSec(this.value);
    }

    updateDBAndCard(caption_data, caption_card);
    this.setAttribute('value', this.value); // Update the hidden value in input dom
  });
}


function onCaptionInsert() {
  $('.btn-add').click(function() {
    var add_btn = this,
        caption_card = $(add_btn).parents('.caption-card')[0], // The card clicked (prior to the new empty card)
        default_caption_data = {
          id: null,
          video_id: getUrlValue('video_id'),
          start: caption_card.dataset.end, // Default start & end of new card is current card's end time
          end: caption_card.dataset.end,
          content: ''
        };

    // Insert an empty card after the current caption card
    var new_empty_card = createCaptionCard(default_caption_data);
    $(caption_card).after( new_empty_card );

    var created_card_dom = $(caption_card).next('.caption-card')[0];

    // Update the created caption data
    updateDBAndCard(default_caption_data, created_card_dom);
    
    // When new cards created, refresh event listeners of all elements
    addEventsToCards();
  });
}



function onCaptionDelete() {
  $('.btn-delete').click(function() {
    var del_btn = this,
        caption_card = $(del_btn).parents('.caption-card')[0];

    deleteDBCaptionAndCard(caption_card.dataset.id, caption_card);
  })
}



// var video_id = getUrlValue('video_id');
// var caption_editor = new OURTUBE.Caption.Editor('caption_editor', {
//   video_id: video_id,
//   events: {
//     'onCaptionInsert': onCaptionInsert,
//     'onCaptionUpdate': onCaptionUpdate,
//     'onCaptionDelete': onCaptionDelete
//   }
// });


// function onCaptionInsert(event) {
// }


// function onCaptionUpdate(event) {
// }


// function onCaptionDelete(event) {
// }



//##############################

// OURTUBE.namespace('OURTUBE.CaptionEditor');

// OURTUBE.CaptionEditor = (function() {
//   createCaptionCard = function(caption=null) {....}, 
//
// }());
