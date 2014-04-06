(function(){
  "use strict";

  var _ = require("underscore"),
      handlePost,
      handler, dispatch,

      ControllerClass = require("../controllers/BrowserMessage.js");

  handlePost = function(req, res, next){
    var controller = new ControllerClass(req._schemas, req._conf, req.body.google_id);

    controller.sendMessage(req.body.message, function(err){
      if (err){
        err._err = 500;
        return res.json(500, err);
      }

      return res.json({_err: 0});
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
