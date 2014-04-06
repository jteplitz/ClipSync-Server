(function(){
  "use strict";

  var _ = require("underscore"),
      handlePost,
      handler, dispatch,

      ControllerClass = require("../controllers/BrowserRegister.js");

  handlePost = function(req, res, next){
    var control = new ControllerClass(req._schemas);
    control.registerBrowser(req.body.google_id, function(err, appInstalled){
      if (err){
        err._err = 500;
        return res.json(500, err);
      }

      return res.json({
        _err: 0,
        appInstalled: appInstalled
      });
    });
  };
  
  dispatch = {POST: handlePost};
  handler = function(req, res, next){
    if (_.has(dispatch, req.method)){
      return dispatch[req.method](req, res, next);
    }

    return next(405);
  };
  
  module.exports = handler;
}());
