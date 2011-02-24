

// Still working on the tests...


///*test 1*/
//(function(T, $) {

//  // Set default hash:
//  window.location.hash = "";

//  var contentDiv = $("#content");
//  var delayIncrement = 100;

//  // Tests extracted for better nesting.

//  // Test 1.

//  var test1 = function() {

//    //expect(3);

//    var action = "Index",
//      controller = "Movie",
//      prefix = "",
//      p1 = "1";

//    //window.location.hash = prefix + "/" + controller + "/" + action + "/" + p1;
//    
//    T.stop();
//    setTimeout(function() {
//      contentDiv.MVC({
//        rootPath: "../",
//        routes: [
//            {
//              name: "Test1",
//              path: prefix + "{controller}/{action}/{p1}/{p3}/{p2}", // Path.
//              params: { controller: controller, action: action, p1: p1, p2: "1", p3: "1"} // Defaults.
//            }
//        ],
//        callBack: function(d) {
//        console.log(d.actionObject);
//          T.start();
//          console.log("test1");

//          // Action test.
//          T.equals(action, d.actionObject.action);

//          // Controller test.
//          T.equals(controller, d.actionObject.controller);

//          // Parameter test.
//          T.equals(p1, d.actionObject.p1);

//          // Run next test:
//          //T.test("Defaults Params Rauting", test2);
//        },
//        stopListenToHash: delayIncrement
//      });
//    }, delayIncrement);
//  };

//  var test2 = function() {

//    //expect(3);

//    var action = "Index",
//      controller = "One",
//      prefix = "bar",
//      p1 = "1";

//    setTimeout(function() {

//      window.location.hash = prefix;

//      T.stop();
//      contentDiv.MVC({
//        rootPath: "../",
//        routes: [
//            {
//              name: "Test1",
//              path: prefix + "/{controller}/{action}/{p1}/{p3}/{p2}", // Path.
//              params: { controller: controller, action: action, p1: p1, p2: "1", p3: "1"} // Defaults.
//            }
//        ],
//        callBack: function(d) {
//          T.start();
//          console.log("test2");

//          console.log(d.actionObject);

//          // Action test.
//          T.equals(action, d.actionObject.action);

//          // Controller test.
//          T.equals(controller, d.actionObject.controller);

//          // Parameter test.
//          T.equals(p1, d.actionObject.p1);

//          // Run next test.
//          //T.test("Multipe routs", test3);

//        },
//        stopListenToHash: delayIncrement
//      });

//    }, delayIncrement);

//  };

//  // Test 3.
//  var test3 = function() {

//    var action = "Index",
//      controller = "One",
//      prefix = "bar",
//      prefix2 = "foo",
//      p1 = "1",
//      p12 = "2";

//    expect(3);


//    window.location.hash = prefix + "/" + controller + "/" + action + "/" + p1;
//    T.stop();
//    contentDiv.MVC({
//      rootPath: "../",
//      routes: [
//          {
//            name: "Test1",
//            path: prefix + "/{controller}/{action}/{p1}/{p3}/{p2}", // Path.
//            params: { controller: controller, action: action, p1: p1, p2: "1", p3: "1"} // Defaults.
//          },
//          {
//            name: "Test2",
//            path: prefix2 + "/{controller}/{action}/{p1}/{p3}/{p2}", // Path.
//            params: { controller: controller, action: action, p1: p1, p2: "1", p3: "1"} // Defaults.
//          }
//      ],
//      callBack: function(d) {
//        T.start();
//        console.log("test3");

//        console.log(d.actionObject);

//        // Action test.
//        T.equals(action, d.actionObject.action);

//        // Controller test.
//        T.equals(controller, d.actionObject.controller);

//        // Parameter test.
//        T.equals(p1, d.actionObject.p1);



//        // Run next test.
//        T.test("404", test4);

//      },
//      stopListenToHash: delayIncrement
//    });


//    //    setTimeout(function() {

//    //      window.location.hash = prefix2 + "/" + controller + "/" + action + "/" + p12;

//    //    }, delayIncrement);

//  };

//  // Test 4.
//  var test4 = function() {

//    var action = "Index",
//      controller = "One",
//      prefix = "bar",
//      prefix2 = "foo",
//      p1 = "1",
//      p12 = "2";

//    window.location.hash = "xx/xx/xx"; //prefix + "/" + controller + "/" + action + "/" + p1;

//    T.stop();
//    contentDiv.MVC({
//      rootPath: "../",
//      routes: [
//            {
//              name: "Test1",
//              path: prefix + "/{controller}/{action}/{p1}/{p3}/{p2}", // Path.
//              params: { controller: controller, action: action, p1: p1, p2: "1", p3: "1"} // Defaults.
//            }
//        ],
//      callBack: function(d) {

//        T.start();

//        //console.log("404");

//        // Action test.
//        T.equals(typeof d.actionObject.controller, "undefined");

//        T.test("Index Path", test5);

//      },
//      stopListenToHash: delayIncrement
//    });
//  };


//  var test5 = function() {

//    //expect(3);

//    var action = "Index",
//      controller = "One",
//      prefix = "bar",
//      prefix2 = "foo",
//      p1 = "1",
//      p12 = "2";

//    window.location.hash = "";
//    T.stop();
//    contentDiv.MVC({
//      rootPath: "../",
//      routes: [
//          {
//            name: "Index path",
//            path: "/{controller}/{action}/{p1}/{p3}/{p2}", // Path.
//            params: { controller: controller, action: action, p1: "1", p2: "1", p3: "1"} // Defaults.
//          }
//      ],
//      callBack: function(d) {
//        T.start();
//        console.log("test5");

//        // Action test.
//        T.equals(action, d.actionObject.action);

//        // Controller test.
//        T.equals(controller, d.actionObject.controller);

//        // Parameter test.
//        T.equals(p1, d.actionObject.p1);

//        T.test("Index Path 2", test6);


//      },
//      stopListenToHash: 2

//    });

//  };


//  // Test 6.
//  var test6 = function() {

//    var action = "Index",
//      controller = "One";

//    window.location.hash = "";  //"One/Index/1";

//    $("#content").MVC({
//      rootPath: "../",
//      routes: [
//      //          {
//      //            name: "Test1",
//      //            path: "bar/{controller}/{action}/{p1}/{p3}/{p2}", // Path.
//      //            params: { controller: "One", action: "Index", p1: "1", p2: "1", p3: "1"} // Defaults.
//      //          }
//      //          ,
//            {
//            name: "Default",
//            path: "{controller}/{action}/{p1}/{p3}/{p2}", // Path.
//            params: { controller: controller, action: action, p1: "1", p2: "1", p3: "1"} // Defaults.
//          }
//        ],
//      callBack: function(d) {

//        // Action test.
//        T.equals(action, d.actionObject.action);

//        // Controller test.
//        T.equals(controller, d.actionObject.controller);

//        console.log(d.actionObject);

//        console.log("test6");


//      }
//    });


//  };

//  T.test("Single Rauting Action", test1);

//})(QUnit, jQuery);