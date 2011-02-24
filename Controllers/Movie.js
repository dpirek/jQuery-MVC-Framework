(function($, tmpl, html) {

  // Private methods.

  var truncate = function(string, length) {
    if (typeof string == "undefined" || string == null) {
      return "";
    }
    if (string.length < length) {
      return string;
    }
    return '<abbr title="' + string + '">' + string.substring(0, length) + ' &hellip;</abbr>';
  };

  return {

    // Index action.
    Index: function(params, view, callBack, onError) {

      // Service query.
      var genre = params.p1,
        pageSize = parseInt(params.p3),
        index = parseInt(params.p2);

      // Query.
      var query = "http://odata.netflix.com/Catalog/Genres('" + genre + "')/Titles" +
        "?$format=json" +
        "&$inlinecount=allpages" + 			// get total number of records
        "&$skip=" + (index - 1) * pageSize + 	// skip to first record of page
        "&$top=" + pageSize; 				// page size

      // Define html helpers.
      var helpers = {
        truncate: truncate
      };

      $.ajax({
        dataType: "jsonp",
        url: query,
        jsonp: "$callback",
        // The error on jsonp seems not to be working...
        error: function() {

          // Data exception.
          onError("netflix data could not load");
        },
        success: function(d) {

          var numberofItems = parseInt(d.d.__count);

          // Paging.
          helpers.paging = function() {
            return html.paging({
              currentPage: index,
              itemsPerPage: pageSize,
              numberofItems: numberofItems,
              pageNumberPrefix: "#/Movie/Index/" + genre + "/",
              pageNumberSuffix: "/" + pageSize,
              showPerPage: true
            });
          };

          // Create content.
          var content = tmpl(view, { movies: d.d.results, genre: genre, numberOfItems: numberofItems }, helpers);

          // Bind select change.
          $(".paging_per_page_select", content).change(function() {

            var context = $(this);

            // Update hash url.
            window.location.hash = "/Movie/Index/" + genre + "/" + index + "/" + context.val();
            return false;
          });

          // Run callback.
          callBack(content);
        }
      });

    },
    Detail: function(params, view, callBack) {

      // Service query.
      var movieId = params.p1;
      
      // Define html helpers.
      var helpers = {
        truncate: truncate
      };

      // I am not sure what the API url for movie details are, so let me just hard-code the object for now...
      var content = tmpl(view, { title: "Movie Details", synopsis: "Lorem ipsum...", id: movieId }, helpers);
      callBack(content);

      // not working      
      var query = "http://odata.netflix.com/catalog/titles/movies/13kag" +
        "?$format=json";

      //      $.ajax({
      //        dataType: "jsonp",
      //        url: query,
      //        jsonp: "$callback",
      //        success: function(d) {

      //          consnole.log(d);

      //          var numberofItems = parseInt(d.d.__count);

      //          // Paging.
      //          helpers.paging = function() {
      //            return MVC.html.paging({
      //              currentPage: index,
      //              itemsPerPage: pageSize,
      //              numberofItems: numberofItems,
      //              pageNumberPrefix: "#/Movie/Index/" + genre + "/",
      //              pageNumberSuffix: "/" + pageSize,
      //              showPerPage: true
      //            });
      //          };

      //          // Create content.
      //          var content = tmpl(view, { movies: d.d.results }, helpers);

      //          // Bind select change.
      //          $(".paging_per_page_select", content).change(function() {

      //            var context = $(this);

      //            // Update hash url.
      //            window.location.hash = "/Movie/Index/" + genre + "/" + index + "/" + context.val();
      //            return false;
      //          });

      //          // Run callback.
      //          callBack(content);
      //        }
      //      });

    }
  };

})(jQuery, jQuery.tmpl, MVC.html)