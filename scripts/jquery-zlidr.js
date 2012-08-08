/*
 * author: daniel dietrich
 */
(function($){
  $.fn.zlidr = function(method) {
    return _[method].apply(this, Array.prototype.slice.call(arguments, 1))
  }
  var _ = $.zlidr = {
    init: function() {
      return this.each(function() {
        var obj = $(this)
        if ($("ul:first li:first", obj).length == 0) {
          obj.html("<ul><li></li></ul>")
        }
        style(obj)
        resize(obj)
        $(window).resize(function(e) {
          resize(obj)
        })
      })
    },
    go: function(index, complete) {
      return this.each(function() {
        var obj = $(this),
            margin = obj.width() * index * -1
        $("ul:first", obj).animate(
          { marginLeft: margin },
          { duration: "fast",
            complete: complete
          }
        )
        obj.attr("index", index)
      })
    },
    replace: function (dir, loader) {
      var obj = this,
          curr = $("ul:first li:first", obj),
          next,
          element = "<li style='float:left;overflow:hidden'></li>"
      if (dir > 0) {
        curr.after(element)
        next = $("ul:first li:eq(1)", obj)
      } else if (dir < 0) {
        curr.before(element)
        next = $("ul:first li:eq(0)", obj)
        obj.attr("index", 1)
      } else {
        next = curr
      }
      resize(obj)
      loader(next)
      return obj.zlidr("go", Number(dir > 0), function() {
        if (dir < 0) {
          curr.remove()
        } else if (dir > 0) {
          obj.attr("index", 0)
          curr.remove()
          resize(obj)
        }
      })
    }
  }
  function style(obj) {
    var ul = $("ul:first", obj),
        li = ul.children()
    obj.css("overflow", "hidden")
    ul.css({
      "margin": 0,
      "padding": 0,
      "list-style": "none"
    })
    li.css({
      "float": "left",
      "overflow": "hidden"
    })
  }
  function resize(obj) {
    var ul = $("ul:first", obj),
        li = ul.children(),
        width = obj.width(),
        index = obj.attr("index") || 0
    ul.css({
      "width": width * li.length,
      "marginLeft": index * width * -1
    })
    li.css("width", width)
  }
})(jQuery)