OURTUBE.namespace('OURTUBE.CaptionEditor');

OURTUBE.CaptionEditor = (function() {
  var _video_id,
      _caption_api = 'api/caption_api.php',
      _container_id,
      _card_type,
      _events;



  _createCard_TimeCaptionAddDel = function(caption) {
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


  _createCard_TimeCaption = function(caption) {
    return (
      "<div data-id='"+ caption['id'] +"' \
            data-start=" + caption['start'] + " data-end="+ caption['end'] +
            " class='card caption-card border-top-0 border-right-0 border-bottom border-left-0 rounded-0'>\
        <div class='card-body d-flex'>\
          <div class='d-flex flex-column mr-auto col-4 col-md-3 editor-timestamp-container'>\
            <input type='text' class='editor-time-input start-time' value='" + secToMinSec(caption['start']) + "' ></input>\
            <input type='text' class='editor-time-input end-time' value='" + secToMinSec(caption['end'])   + "' ></input>\
          </div>\
          <p class='editor-text-area d-flex col-5 col-md-7'>" + caption['content'] + "</p>\
        </div>\
      </div>"
    );
  }


  _sortCardsByStart = function() {
    var cards_container = document.getElementById(_container_id);

    var sorted_cards = $('.caption-card').sort(function(first, second) {
      return $(first).data('start') - $(second).data('start');
    })
  
    $('.caption-card').remove();
    $(sorted_cards).appendTo(cards_container);

    addCaptionCardEvents();
  },


  _onCaptionLoaded = function() {
    if (typeof _events['onCaptionLoaded'] === 'function') {
      return _events['onCaptionLoaded']();
    }
  },



  _onCaptionClicked = function() {
    $('.caption-card').click(function() {
      var caption_card = this;
      
      _events['onCaptionClicked'](caption_card);
    });
  },



  _onCaptionUpdate = function() {
    $('.editor-text-area').keyup(function() {
      var caption_card = $(this).parents('.caption-card')[0],
          caption_data = {
            id: caption_card.dataset.id,
            video_id: _video_id,
            content: this.value
          };
  
      _events['onCaptionUpdate'](caption_data, caption_card);
    });
  
    $('.start-time, .end-time').change(function() {
      var caption_card = $(this).parents('.caption-card')[0],
          caption_data = {
            id: caption_card.dataset.id,
            video_id: getUrlValue('video_id')
          };
  
      // if (this.className.includes('start-time'))   <-- IE not supports
      if (this.className.indexOf('start-time') > -1) {
        caption_data['start'] = minsecToSec(this.value);
        caption_card.dataset.start = caption_data['start'];
      }
      if (this.className.indexOf('end-time') > -1) {
        caption_data['end'] = minsecToSec(this.value);
        caption_card.dataset.end = caption_data['end'];
      }
  
      _events['onCaptionUpdate'](caption_data, caption_card);
      caption_card.dataset.id = caption_data.id;
      this.setAttribute('value', this.value); // Update the hidden value in input dom

      _sortCardsByStart();
    });
  },


  _onCaptionInsert = function() {
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
      var new_empty_card = _createCard_TimeCaptionAddDel(default_caption_data);
      $(caption_card).after( new_empty_card );

      var new_card_element = caption_card.nextSibling;

      _events['onCaptionInsert'](default_caption_data, new_card_element);
      addCaptionCardEvents();
    });
  },


  _onCaptionDelete = function() {
    $('.btn-delete').click(function() {
      var del_btn = this,
          caption_card = $(del_btn).parents('.caption-card')[0];
  
      _events['onCaptionDelete'](caption_card);
      $(caption_card).remove();
    })
  },




  //#################################
  // Public


  createCaptionCards = function(captions_arr, cards_container) {
    var sorted_arr = captions_arr.sort(function(first, second) {
      return first.start - second.start;
    });


    switch (_card_type) {
      case 'time-caption':
        for (var i in sorted_arr) {
          var caption_card = _createCard_TimeCaption(sorted_arr[i]);
          $(caption_card).appendTo(cards_container);
        }
        break;

      case 'time-caption-add-del':
        for (var i in sorted_arr) {
          var caption_card = _createCard_TimeCaptionAddDel(sorted_arr[i]);
          $(caption_card).appendTo(cards_container);
        }
        break;

      // default card type is uneditable (time-caption)
      default:
        for (var i in sorted_arr) {
          var caption_card = _createCard_TimeCaption(sorted_arr[i]);
          $(caption_card).appendTo(cards_container);
        }
        break;
    }
    

    addCaptionCardEvents();
  },



  scrollToCaption = function(card_index) {
    var caption_editor_area = $('.caption-area')[0], // The dom that containing the scroller bar
        scroller_location = caption_editor_area.scrollTop,
        total_scrollerbar_height = caption_editor_area.scrollHeight;

    var card_height = $('.caption-card')[0].clientHeight;
    var new_scroller_location = ( card_index > 0 ? card_index - 1 : card_index ) * card_height; // 調整scroller到

    if (scroller_location < total_scrollerbar_height) {
      $('.caption-area').scrollTop(new_scroller_location);
    }
  }


  captionHighlight = function(card_index) {
    for (var i=0; i < $('.caption-card').length; i++) {
      if (i == card_index) {
        $('.caption-card')[i].classList.add('caption-card-highlight');
      } else {
        $('.caption-card')[i].classList.remove('caption-card-highlight');
      }
    }
  },


  getCaptionCards = function(cards_container) {
    $.ajax({
      type: 'POST',
      url: _caption_api,
      dataType: 'json',
      data: {
        functionname: 'englishCaptionContents',
        arguments: _video_id
      },
  
      // res already parsed by ajax, but res['result'] needs to be parsed
      success: function(res, res_status) {
        if( !('error' in res) ) {
          var captions_arr = JSON.parse(res['result']);
          createCaptionCards(captions_arr, cards_container);

          _onCaptionLoaded();
        }
        else {
          console.log(res['error']);
        }
      }
    })
  },



  addCaptionCardEvents = function() {
    if (typeof _events['onCaptionClicked'] === 'function') {
      _onCaptionClicked();
    }


    if (typeof _events['onCaptionUpdate'] === 'function') {
      _onCaptionUpdate();
    }


    if (typeof _events['onCaptionInsert'] === 'function') {
      _onCaptionInsert();
    }


    if (typeof _events['onCaptionDelete'] === 'function') {
      _onCaptionDelete();
    }
  },




  //#################################
  // Constructor


  Constr = function(container_id, config) {
    _video_id = config.video_id,
    _container_id = container_id,
    _card_type = config.card_type,
    _events = config.events;

    $(document).ready(function() {
      getCaptionCards( document.getElementById(_container_id) );
      addCaptionCardEvents(_events);
    });
    
  },


  Constr.prototype = {
    caption_cards: document.getElementsByClassName('caption-card'),
    addCaptionCardEvents: addCaptionCardEvents,
    createCaptionCards: createCaptionCards,
    scrollToCaption: scrollToCaption,
    captionHighlight: captionHighlight
  };

  return Constr;
})();

