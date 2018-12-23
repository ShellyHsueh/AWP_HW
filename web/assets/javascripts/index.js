$(document).ready(function() {
  onSearchClicked();
});


function onSearchClicked() {
  $('#form-search-url').submit(function(event) {
    event.preventDefault();
    Session.clear();
    $("#output").empty();

    var url = fillHttps( $('#url').val() );
    if (checkURL(url) == false) {
      alert("The input URL is not a Youtube URL");
      return;
    }

    var video_id = getYoutubeUrlValue(url)[0],
        list_id = getYoutubeUrlValue(url)[1];

    console.log(video_id, list_id);

    getVideojson(video_id, list_id);
  });
  
}


function getVideojson(video_id, list_id)
{
  if(list_id == "")// video
  {
    $.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {part: "snippet", id: video_id, key: "AIzaSyBAEWdxVn_cac8vQko7jnDXKXqZOvMez0Y"},
      
      function(response){
        if(response.items.length == 0) {
          alert("No video");
          return;
        };

        storeToSessionAndRedirect( makeVideojson(response) );
      }
    )
  }
  else //list
  {
    $.get(
      "https://www.googleapis.com/youtube/v3/playlistItems",
      {part: "snippet", playlistId: list_id, key: "AIzaSyBAEWdxVn_cac8vQko7jnDXKXqZOvMez0Y", maxResults: 50},

      function(response){
        if(response.items.length == 0) {
          alert("The list has no video");
          return;
        }
        
        showMenuAndStoreToSession( makeVideojson(response) );
      }
    ).fail(function() {
      alert("No list");
    })
  }
  
}


function storeToSessionAndRedirect(video_json) {
  var parsed_video = JSON.parse(video_json)[0];
  Session.add('video', parsed_video);
  console.log(Session.get('video'))

  //redirect_url = 'http://' + window.location.host + '/video.php?video_id=' + parsed_video['video_id'];
  //不用完整網址，這樣瀏覽器會自動選擇導向到此網頁的root底下
  redirect_url = 'video.php?video_id=' + parsed_video['video_id'];
  
  $(location).attr('href', redirect_url);
}



function showMenuAndStoreToSession(videos_json) {
  createVideoCards(videos_json);
  storeListItemsToSession(videos_json);
}


function storeListItemsToSession(videos_json) {
  var parsed_video = JSON.parse(videos_json);
  Session.add_items('videos', parsed_video);
}



function makeVideojson(video)
{
  //console.log(video);
  var result = [];
  if(video.items.length == 1) // a single video
  {
    var item = {
      video_id: video.items[0].id,
      thumbnail_url: video.items[0].snippet.thumbnails.high.url,
      title: video.items[0].snippet.title
    };
    result.push(item);
  }
  else // a playlist of videos
  {
    for(var i in video.items)
    {
      var item = {
        index: video.items[i].snippet.position,
        list_id: video.items[i].snippet.playlistId,
        video_id: video.items[i].snippet.resourceId.videoId,
        thumbnail_url: video.items[i].snippet.thumbnails.high.url || '',
        title: video.items[i].snippet.title
      };
      result.push(item);
    }
  }

  return JSON.stringify(result);
  
}



function createVideoCards(videos_json) {
  var videos = JSON.parse(videos_json);

  for(var i in videos) {
    var page_link = './video.php?video_id=' + videos[i]["video_id"];
    var card = createVideoCard(videos[i]['title'], videos[i]['thumbnail_url'], page_link);
    $(card).appendTo($('#output'));
  }

  // $('[data-toggle="popover"]').popover();
}



function createVideoCard(title, thumbnail_link, link) {
  return (
    "<div class='col-12 col-sm-6 col-lg-4 col-xl-3 card-panel'> \
      <div class='card shadow video-card'> \
        <a href='" + link + "' class='image-href'> \
          <img class='card-img-top thumbnail img-center' src='" + thumbnail_link + "'> \
        </a> \
        <div class='card-body thumbnail-intro'> \
          <h6 class='thumbnail-title title-popover' data-toggle='popover' data-trigger='hover' data-placement='top' \
              data-content='" + title + "' > \
            <a href='" + link + "' > \
              <span>" + title + "</span> \
            </a> \
          </h6> \
        </div> \
      </div> \
    </div>"
  );
}




//###############################
//### Url handlers

function getYoutubeUrlValue(url) {
  //var url = window.location.href;
  if (tinyurl(url)) {
    return getTinyurlValue(url);
  }

  var video_id = '';
  var list_id = '';
  var varparts = url.split('?');

  if (varparts.length < 2){return 0;}
  var parts = varparts[1].split("&");
  for(i = 0; i < parts.length ; i++)
  {
    
    var name = parts[i].split("=")[0];
    var value = parts[i].split("=")[1];
    if(name == "v")
    {
      video_id = value;
    }
    
    if(name == "list")
    {
      list_id = value;
    }
  }

  return { 0: video_id, 1: list_id };
}


// - Supported YouTube URL formats:
// - http://www.youtube.com/watch?v=My2FRPA3Gf8
// - http://youtu.be/My2FRPA3Gf8
function checkURL (url) {
  var result = url.match(/(http:|https:|)\/\/(www.)?(youtu(be\.com|\.be))\/([A-Za-z0-9._%-]*)(\&\S+)?/);

  if(result == null) { 
    return false;
  } else {
    return true;
  }
}


function fillHttps(url) {
  var result = url.match(/(http:|https:|)\/\/([A-Za-z0-9._%-]*)(\&\S+)?/);

  if(result == null) {
    return "https://" + url;
  };
  
  return url;
}


function tinyurl(url)
{
  var result = url.match(/(http:|https:|)\/\/(youtu.be)\/([A-Za-z0-9._%-]*)(\&\S+)?/);
  if(result == null) return false;
  else return true;
}



function getTinyurlValue(url)
{
  url.match(/(http:|https:|)\/\/(youtu.be)\/([A-Za-z0-9._%-]*)(\&\S+)?/);
  return {0: RegExp.$3, 1: ""};
}