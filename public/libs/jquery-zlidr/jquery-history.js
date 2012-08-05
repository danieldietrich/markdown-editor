/*
 * author: daniel dietrich
 */
(function($){
  var _ = $.history = {
    init: function(handler) {
      var initialURL = location.href
      $(window).bind("popstate", function(e) {
        (initialURL == location.href) ? handler.init() : handler.load(e.originalEvent.state.url)
      })
    },
    load: function(url) {
      var ok = handler.load(url)
      if (ok == undefined || ok) history.pushState({url: url}, null, url)
    },
    replace: function(url) {
      var ok = handler.load(url)
      if (ok == undefined || ok) history.replaceState({url: url}, null, url)
    }
  }
})(jQuery)