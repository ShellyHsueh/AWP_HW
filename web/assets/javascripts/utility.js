
// Usage: getUrlValue('video_id');
function getUrlValue(key) {
  var url = window.location.href;

  key = key.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + key + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);

  if (!results) return;
  if (!results[2]) return '';

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


function convertSecToTime(sec) {
  return moment.utc(sec*1000).format("mm:ss.S");
}
