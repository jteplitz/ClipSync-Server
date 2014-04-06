(function(){
  "use strict";

  var _ = require("underscore"),
      handlePost,
      handler, dispatch,

      ControllerClass = require("../controllers/MobileRegister.js");

  handlePost = function(req, res, next){
    var payload = {
      gcmId: req.body.gcm_id
    };
    var control = new ControllerClass(req._schemas, req.body.google_id);

    control.addGcmId(req.body.gcm_id, function(err, extensionInstalled){
      if (err){
        err._err = 500;
        return res.json(500, err);
      }
      res.json({
        _err: 0,
        extensionInstalled: extensionInstalled
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
