/// <reference path="MVC.util.string.js" />

/** 
* @fileoverview string utils.  
*  
* @author dpirek@gmail.com (David Pirek)
*/
(function() { 
  
  // Create namespace.
  MVC.util.createNs("MVC.util.string");
  
  //
  MVC.util.string = {
    isEmpty: function(str) {

      if (str.replace(/\s/g, "") == "") {
        return true;
      }
      else {
        return false;
      }

    },
    stringBuilder: function() {

      /* StringBuilder
      ------------------------------
              
      //notes
      works like a regular stringbuilder
              
      //example
      var sb = FNG.Util.String.StringBuilder();
      sb.append("hi ");
      sb.append("dave");
      sb.append(" !");
      console.log(sb.toString());
      */

      var s = [];
      return {
        // appends
        append: function(v) {
          if (v) {
            s.push(v);
          }
        },
        // clears
        clear: function() {
          s.length = 1;
        },
        // converts to string
        toString: function() {
          return s.join("");
        }
      }
    },
    template: function(m, v) {
      v = v.replace(/\{[^\}]*\}/g, function(key) {
        return m[key.slice(1, -1)] || '';
      });
      return v;
    },
    splitHashLink: function(u) {
      var a = u.split("#");

      if (a[1]) {
        var b = a[1].split("/");

        //returs array or string
        if (b[1]) {
          return b;
        } else {
          return b[0];
        }
      }
      else {
        return "";
      }
    },
    trimHashLink: function(u) {
      var a = u.split("#");
      return a[1];
    },
    getHashValue: function() {
      return this.trimHashLink(window.location.hash);
    },
    linkParams: function(u) {
      var p = window.location.pathname;
      return p.split("/");

    },
    getRoot: function() {
      var W = window.location;
      return W.protocol + "//" + W.host + "/";
    },
    isEmail: function(e) {
      var r = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (r.test(e) == false) {
        return false;
      }
      return true;
    },
    formatDate: function(jsonDate) {
      //parse
      var date = new Date(parseInt(jsonDate.substr(6)));

      //return
      return date.getDate() + "." + date.getMonth() + "." + date.getFullYear();
    }
  };

} ());