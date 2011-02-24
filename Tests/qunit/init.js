(function ($) {

    //test case init

    var stringBuilder = function () {

        var s = [];
        return {
            // appends
            append: function (v) {
                if (v) {
                    s.push(v);
                }
            },
            // clears
            clear: function () {
                s.length = 1;
            },
            // converts to string
            toString: function () {
                return s.join("");
            }
        }
    };

    var sb = stringBuilder();
    sb.append("<div style=\"position:absolute; right:0%; width:350px; top:0px;\">");
    //sb.append("<h1 id=\"qunit-header\">QUnit Test Suite</h1>");
    //sb.append("<h2 id=\"qunit-banner\"></h2>");
    sb.append("<div id=\"qunit-testrunner-toolbar\"></div>");
    sb.append("<h2 id=\"qunit-userAgent\"></h2>");
    sb.append("<ol id=\"qunit-tests\"></ol>");
    sb.append("<div id=\"qunit-fixture\">test markup</div>");
    sb.append("</div>");
    $("body").append(sb.toString());

})(jQuery);