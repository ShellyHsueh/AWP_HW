//#################################
// Video Page Init


$(document).ready(function() {
  onGoEditClicked();

});


function onGoEditClicked() {
  $('#btn-go-edit').click(function() {
    // Redirect to the file in the root directory of the current page
    redirect_url = 'caption_editor.php?video_id=' + getUrlValue('video_id');
    $(location).attr('href', redirect_url);
  });
}



//###################################
// Namespace Pattern


var video_id = getUrlValue('video_id'),
    yt_player;


var caption_editor = new OURTUBE.CaptionEditor('caption-cards', {
  video_id: video_id,
  card_type: 'time-caption',
  events: {
    'onCaptionLoaded': onCaptionLoaded,
    'onCaptionClicked': onCaptionClicked
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
