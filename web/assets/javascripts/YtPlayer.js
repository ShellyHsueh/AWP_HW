OURTUBE.namespace('OURTUBE.YtPlayer');

OURTUBE.YtPlayer = (function() {
  var player,
      _video_id,
      _events;

  

  _onPlayerReady = function(event) {
    playVideo($('.caption-card')[0].dataset.start, $('.caption-card')[0].dataset.end);

    addPlayerEvents();
  },


  _onPlayerError = function(event) {
    /*
    2 – The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.
    5 – The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.
    100 – The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.
    101 – The owner of the requested video does not allow it to be played in embedded players.
    150 – This error is the same as 101. It's just a 101 error in disguise!
    */

    console.log("error: " + event.data);
  }


  _onPlayerPlaying = function() {
    setInterval(function() {
      if (player.getPlayerState() == 1) {
        _events['onPlayerPlaying'](player.getCurrentTime());
      }
    }, 100);
  }



  //####################################
  // Public


  ytPlayerConfig = function(player_container_id, width, height) {
    player = new YT.Player(player_container_id, {
      width: width || '100%',
      height: height || '360',
      videoId: _video_id,
      playerVars: { 'autoplay': 0, 'controls': 1 },
      events: {
        'onReady': _onPlayerReady,
        'onError': _onPlayerError
      }
    });
  },


  playVideo = function(start, end) {
    player.seekTo(start, true);
    player.playVideo();

    // 必須延遲些許時間，讓player開始播放影片，才可正確取得player.getCurrentTime()回傳值。
    // 經多次實驗後，25ms可正確取得player.getCurrentTime();
    setTimeout(function () {
      pauseVideo(end);
    }, 25);
  },


  pauseVideo = function(pauseTimeStamp) {
    var handlerPauseTimeStamp = 0;  // 設定呼叫setTimeout(pauseTimeStamp)之handler
    var current = player.getCurrentTime();

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
  },


  stopVideo = function() {
    player.stopVideo;
  },



  addPlayerEvents = function() {
    if (typeof _events['onPlayerPlaying'] === 'function') {
      _onPlayerPlaying();
    }
  },



  //####################################
  // Constructor


  Constr = function(video_id, config) {
    _video_id = video_id,
    _events = config.events;
  },


  Constr.prototype = {
    player: player,
    ytPlayerConfig: ytPlayerConfig,
    playVideo: playVideo,
    pauseVideo: pauseVideo,
    stopVideo: stopVideo
  };

  return Constr;
})();