(function(){
  "use strict";

  var Routes = {
    MobileRegister: require("./MobileRegister.js"),

    BrowserRegister: require("./BrowserRegister.js"),
    BrowserMessage: require("./BrowserMessage.js")
  };

  // route, function, schemas, conf, methods
  // auth options: 0: anything, 1: loggedIn
  var routeList = [
    ["/m/register",      Routes.MobileRegister,    1, 0, ["post"]],

    ["/b/register",      Routes.BrowserRegister,   1, 0, ["post"]],
    ["/b/message",       Routes.BrowserMessage,    1, 1, ["post"]]
  ];

  module.exports = routeList;
}());
