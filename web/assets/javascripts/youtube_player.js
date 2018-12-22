

function loadPlayer() {
  // This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script'); // Just in memory. Not yet added to the DOM
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag); // Now added to the DOM
}


var player;
// It will creates an <iframe> (and YouTube player) right after API codes downloaded
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    width: '100%',
    height: '360',
    videoId: getUrlValue("video_id"),
    playerVars: { 'autoplay': 1, 'controls': 1 },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange,
      'onError': onPlayerError
    }
  });
}


function onPlayerReady(event) {
  // var caption_cards = $('.caption-card');
  playVideo($('.caption-card')[0].dataset.start, $('.caption-card')[0].dataset.end);

  onCaptionClicked();
  onCaptionUpdate();
  onCaptionInsert();
  onCaptionDelete();
  onCaptionTimeChange();
}


function onPlayerStateChange(event) {
  console.log('playing=1:  ', event.data); // show the event type
  
  if (event.data == YT.PlayerState.PLAYING) {
    var current_time = player.getCurrentTime();
    console.log(current_time);
    var cards_num = $('.caption-card').length;

    for (var i=0; i < cards_num; i++) {
      var caption_card = $('.caption-card')[i],
          start = caption_card.dataset.start,
          end = caption_card.dataset.end;

      if (current_time >= start && current_time < end) {
        scrollToCaption(i);
        captionHighlight(i);

        pauseVideo(end);
        return;
      }
    }
  }
  else {
    console.log("Not playing now: ", "onPlayerStateChange: ", event.data, "| Current time: ", current_time);
  }
}


function onPlayerError(event) {
  /*
  2 – The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.
  5 – The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.
  100 – The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.
  101 – The owner of the requested video does not allow it to be played in embedded players.
  150 – This error is the same as 101. It's just a 101 error in disguise!
  */

  console.log("error: " + event.data);
}




//#############################
//### Utility: Captions Behavior Handler

function scrollToCaption(card_index) {
  var caption_editor_area = $('.caption-editor-area')[0]; // The dom that containing the scroller bar
  var scroller_location = caption_editor_area.scrollTop;
  var total_scrollerbar_height = caption_editor_area.scrollHeight;

  var card_height = $('.caption-card')[0].clientHeight;
  var new_scroller_location = ( card_index > 0 ? card_index - 1 : card_index ) * card_height; // 調整scroller到

  if (scroller_location < total_scrollerbar_height) {
    $('.caption-editor-area').scrollTop(new_scroller_location);
  }
}

function captionHighlight(card_index) {
  for (var i=0; i < $('.caption-card').length; i++) {
    if (i == card_index) {
      $('.caption-card')[i].classList.add('caption-card-highlight');
    } else {
      $('.caption-card')[i].classList.remove('caption-card-highlight');
    }
  }
}



//##############################
//### Utility: Player Controllers

function playVideo(start, end) {
  player.seekTo(start, true);
  player.playVideo();

  // 必須延遲些許時間，讓player開始播放影片，才可正確取得player.getCurrentTime()回傳值。
  // 經多次實驗後，25ms可正確取得player.getCurrentTime();
  setTimeout(function () {
    pauseVideo(end);
  }, 25);
}


function pauseVideo(pauseTimeStamp) {
  var handlerPauseTimeStamp = 0;  // 設定呼叫setTimeout(pauseTimeStamp)之handler
  var current = player.getCurrentTime();
  //console.log("pauseVideo_currentTime: " + current + " pauseTimeStamp: " + pauseTimeStamp);
  if (current == undefined || current < pauseTimeStamp) {
    // 若已指派setTimeout，則清除該Timeout
    clearTimeout(handlerPauseTimeStamp);
    // 當YT.PlayerState.PLAYING時，若使用者隨意點選某一段字幕檔，
    // 故當時狀態為為pause，則直接撥放video
    if (player.getPlayerState() == YT.PlayerState.PAUSED) {
        player.playVideo();
    }
    handlerPauseTimeStamp = setTimeout(pauseVideo, 10, pauseTimeStamp);
  } else {
    clearTimeout(handlerPauseTimeStamp);
    player.pauseVideo();
  }
}


function stopVideo() {
    player.stopVideo();
}
