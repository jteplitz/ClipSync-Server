(function(){
  "use strict";

  var base = require("./base.js"),

      BrowserRegisterCtrl, _ptype;

  BrowserRegisterCtrl = function(schemas){
    this.schemas = schemas;
  };

  _ptype = BrowserRegisterCtrl.prototype = base.getProto("api");
  _ptype._name = "BrowserRegister";

  _ptype.registerBrowser = function(googleId, cb){
    var self = this;
    this.schemas.User.findOne({googleId: googleId}, function(err, user){
      if (err){ return cb(err) }

      if (!user){
        user = new self.schemas.User({
          googleId: googleId,
          gcmId: null
        });
      }

      user.extensionInstalled = true;
      user.save(function(err, user){
        if (err) {return cb(err) }

        return cb(null, (user.gcmId !== null));
      });
    });
  };

  module.exports = BrowserRegisterCtrl;
}());
