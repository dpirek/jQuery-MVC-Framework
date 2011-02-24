(function($) {

  var messageElm = $("#message_content");

  // Plugin init.
  $("#content").MVC({
    routes: [
        {
          name: "Default", // Name
          path: "foo/{controller}/{action}/{p1}/{p2}/{p3}", // Path.
          params: { controller: "Movie", action: "Index", p1: "Cartoons", p2: "1", p3: "5"} // Defaults.
        }
        ,
        {
          name: "Default2", // Name
          path: "{controller}/{action}/{p1}/{p2}/{p3}", // Path.
          params: { controller: "Movie", action: "Index", p1: "Cartoons", p2: "1", p3: "5"} // Defaults.
        }
      ],
    errorMessage: "<p><strong>Ups, something went wrong...</strong></p>",
    start: function() {
      messageElm.text("loading...").show();
    },
    success: function(d) {
      messageElm.hide().text("");
    },
    error: function(ex) {
      messageElm.text(ex).show();
    }
  });

} (jQuery));