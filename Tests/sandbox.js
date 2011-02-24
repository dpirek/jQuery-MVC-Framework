/*test 1*/
(function (T, $) {

  var removeFristDash = function (path) {

    // Remove '/' as first char.
    if (path.charAt(0) === '/') {
      path = path.substr(1);
    }

    return path;

  };

  var parsePlaceHolders = function (path) {

    path = removeFristDash(path);

    // Remove '/' as first char.
    if (path.charAt(0) === '/') {
      path = path.substr(1);
    }

    var ar = path.split('/'),
        re = [];

    // Array to Object.
    $.each(ar, function (i, d) {

      var x = d.match(/[{}]/g);

      if (x == null) {
        re[i] = false;
      } else {
        re[i] = true;
      }
    });
    return re;
  };

  // Create.
  var createRoutingTable = function (routes) {

    // routing.
    var routingTable = {};

    var mapRoute = function (name, path, params) {

      // Gets position of different placeholders.
      var getPositions = function (path) {

        var arr = [],
            o = {};

        // String to array.
        path.replace(/\{[^\}]*\}/g, function (key, index) {
          arr.push({ key: key, index: index });
        });

        // Array to Object.
        $.each(arr, function (i, d) {

          // Each character within [ ... ].
          o[d.key.replace(/[{}]/g, '')] = d.index;
        });
        return o;
      };

      // Add slash if {controller} is first in the string, 
      // so that array would have the "prefix" placeholder.
      if (path.substr(0, 12) === "{controller}") {
        path = "/" + path;
      }

      // Parse path into array.
      var items = path.split('/');

      // Create routing table object.
      routingTable[name] = {
        controller: "",
        path: path,
        pre: path.substr(0, getPositions(path).controller),
        items: items,
        placeHolders: parsePlaceHolders(path),
        params: params
      };
    };

    $.each(routes, function (i, d) {
      mapRoute(d.name, d.path, d.params);
    });

    return routingTable;
  };

  var rounte = function (table, hash) {

    var matchCount = 0;
    var params,
        actionObject = {};

    // Loop table.
    $.each(table, function (i, d) {


      var items = hash.split('/');

      // Add start '/' if not presnet
      if (hash.charAt(0) !== '/' && d.pre != items[0] + "/") {
        hash = '/' + hash;
        // Split again.
        items = hash.split('/');
      }

      console.log("table:");
      console.log(d);
      console.log(d.placeHolders);
      console.log(items);
      console.log(actionObject);
      console.log(matchCount);

      var tableItems = d.items,
          o = {};

      params = d.params;

      if (matchCount < 1) {

        // Loop folders.
        $.each(d.placeHolders, function (i, d) {

          if (items[i] === tableItems[i]) {
            matchCount++;
          }

          if (d === true) {

            //build action object
            actionObject[tableItems[i].replace(/[{}]/g, '')] = items[i];
          }
        });
      }

      // If there is a match don't search any more.
      if (matchCount < 2) {

        // Merge with defaults, if there are some params missing.
        $.each(actionObject, function (i, d) {
          if (typeof d == "undefined") {
            actionObject[i] = params[i];
          }
        });
        return;
      }
    });

    return actionObject;
  };


  // Set default hash:
  window.location.hash = "";

  var contentDiv = $("#content");
  // Test 1.

  T.test("Parse Placeholders", function () {

    var p1 = parsePlaceHolders("foo/{controller}/{action}/{p1}/{p2}/{p3}");
    T.equals(p1[0], false);
    T.equals(p1[1], true);
    T.equals(p1.length, 6);

    var p2 = parsePlaceHolders("/{controller}/{action}/{p1}/{p2}/{p3}");
    T.equals(p2[0], true);
    T.equals(p2[1], true);
    T.equals(p2.length, 5);

  });


  T.test("Multipe routs", function () {

    var routes = [{
      name: "Default", // Name
      path: "foo/{controller}/{action}/{p1}/{p2}/{p3}", // Path.
      params: { controller: "Movie", action: "Index", p1: "Cartoons", p2: "1", p3: "5"} // Defaults.
    },
      {
        name: "Default2", // Name
        path: "{controller}/{action}/{p1}/{p2}/{p3}", // Path.
        params: { controller: "Movie", action: "Index", p1: "Cartoons", p2: "1", p3: "5"} // Defaults.
      }];

    var routes2 = [{
      name: "Default", // Name
      path: "foo/{controller}/{action}/{p1}/{p2}/{p3}", // Path.
      params: { controller: "Movie", action: "Index", p1: "Cartoons", p2: "1", p3: "5"} // Defaults.
    }];

    var routes3 = [{
      name: "Default", // Name
      path: "{controller}/{action}/{p1}/{p2}/{p3}", // Path.
      params: { controller: "Movie", action: "Index", p1: "Cartoons", p2: "1", p3: "5"} // Defaults.
    }];

    var routes4 = [{
      name: "Default", // Name
      path: "{controller}/{action}/bar/{p1}/{p2}/{p3}", // Path.
      params: { controller: "Movie", action: "Index", p1: "Cartoons", p2: "1", p3: "5"} // Defaults.
    }];

    // No placeholder.
    T.equals(rounte(createRoutingTable(routes), "Movie/Index/Cartoons/1/2/3").controller, "Movie");
    T.equals(rounte(createRoutingTable(routes), "/Movie/Index/Cartoons/1/2/3").controller, "Movie");
    T.equals(rounte(createRoutingTable(routes3), "/Movie/Index/Cartoons/1/2/3").controller, "Movie");
    
    // Placeholder in the begining.
    T.equals(rounte(createRoutingTable(routes), "foo/Movie/Index/1/2/3").controller, "Movie");
    //T.equals(rounte(createRoutingTable(routes), "foo/Movie/Index/Cartoons/1/2/3").controller, "Movie");
    T.equals(rounte(createRoutingTable(routes2), "foo/Movie/Index/Cartoons/1/2/3").controller, "Movie");

    // Placeholder in the middle. // Not working yet...
    //T.equals(rounte(createRoutingTable(routes4), "/Movie/Index/bar/Cartoons/1/2/3").action, "Index"); // Not working yet...
    T.equals(rounte(createRoutingTable(routes4), "/Movie/Index/bar/Cartoons/1/2/3").controller, "Movie"); // Not working yet...
    T.equals(rounte(createRoutingTable(routes4), "/Movie/Index/bar/Cartoons/1/2/3").p1, "Cartoons");

  });


  T.test("Defaults Values", function () {

    var routes = [{
      name: "Default", // Name
      path: "foo/{controller}/{action}/{p1}/{p2}/{p3}", // Path.
      params: { controller: "Movie", action: "Index", p1: "Cartoons", p2: "1", p3: "5"} // Defaults.
    },
      {
        name: "Default2", // Name
        path: "{controller}/{action}/{p1}/{p2}/{p3}", // Path.
        params: { controller: "Movie", action: "Index", p1: "Cartoons", p2: "1", p3: "5"} // Defaults.
      }];

    var routes2 = [{
      name: "Default", // Name
      path: "foo/{controller}/{action}/{p1}/{p2}/{p3}", // Path.
      params: { controller: "Movie", action: "Index", p1: "Cartoons", p2: "1", p3: "5"} // Defaults.
    }];

    var routes3 = [{
      name: "Default", // Name
      path: "{controller}/{action}/{p1}/{p2}/{p3}", // Path.
      params: { controller: "Movie", action: "Index", p1: "Cartoons", p2: "1", p3: "5"} // Defaults.
    }];

    T.equals(rounte(createRoutingTable(routes), "foo/Movie/Index").p1, "Cartoons");
    T.equals(rounte(createRoutingTable(routes), "foo/Movie").action, "Index");
    T.equals(rounte(createRoutingTable(routes), "foo").action, "Index");
    T.equals(rounte(createRoutingTable(routes), "foo").p2, "1");
    T.equals(rounte(createRoutingTable(routes), "foo").p3, "5");
    T.equals(rounte(createRoutingTable(routes2), "foo/Movie/Index").p1, "Cartoons");
    T.equals(rounte(createRoutingTable(routes3), "Movie/Index").p1, "Cartoons");
    T.equals(rounte(createRoutingTable(routes3), "Movie/Index").p1, "Cartoons");
    //T.equals(rounte(createRoutingTable(routes), "foo/Movie/1").action, "Index"); // Not working yet...


  });

})(QUnit, jQuery);