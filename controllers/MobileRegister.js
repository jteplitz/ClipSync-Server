(function(){
  "use strict";

  var base = require("./base.js"),

      MobileRegisterCtrl, _ptype;

  MobileRegisterCtrl = function(schemas, googleId){
    this.schemas  = schemas;
    this.googleId = googleId;
  };

  _ptype = MobileRegisterCtrl.prototype = base.getProto("api");
  _ptype._name = "MobileRegister";

  _ptype.addGcmId = function(gcmId, cb){
    var self = this;
    this.schemas.User.findOne({googleId: self.googleId}, function(err, user){
      if (err){ return cb(err) }

      if (!user){
        user = new self.schemas.User({
          googleId: self.googleId,
          extensionInstalled: false
        });
      }
      user.gcmId = gcmId;
      user.save(function(err, user){
        if (err){ return cb(err) }
        return cb(null, user.extensionInstalled);
      });
    });
  };

  module.exports = MobileRegisterCtrl;
}());
