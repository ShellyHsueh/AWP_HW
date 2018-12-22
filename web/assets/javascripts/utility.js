
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


function secToMinSec(sec) {
  return moment.utc(sec*1000).format("mm:ss.S");
}


function minsecToSec(minsec) {
  var min_to_sec = moment(minsec, 'mm:ss.SS').minutes() * 60;
  var sec = moment(minsec, 'mm:ss.SS').format('ss.SS');
  return parseFloat(min_to_sec) + parseFloat(sec);
}


//#########################
//### Namespace Init

// To create a namespace(module) if not exists yet
// Usage: MYAPP.namespace('MYAPP.Modules.Module1');
//        MYAPP.Modules.Module1 = (function() {
//          // private
//          var priv_var_a;
//          priv_func_a = function() {return ...};
//
//          // public
//          return {
//            var_a: ..., 
//            var_b: ...,
//
//            func_a: function() {...},
//            func_b: function() {...}
//          };
//        }());
var OURTUBE = OURTUBE || {};
OURTUBE.namespace = function(namespace_str) {
  var modules = namespace_str.split('.'),
      app_module = OURTUBE;

  // slice off app-level module from modules
  if (modules[0] === 'OURTUBE') {
    modules = modules.slice(1);
  }

  for (var i=0; i < modules.length; i++) {
    if (typeof app_module[modules[i]] === 'undefined') {
      app_module[modules[i]] = {};
    }
    app_module = app_module[modules[i]];
  }
  return app_module;
}