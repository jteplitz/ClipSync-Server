(function(){
  "use strict";

  var base = require("./base.js"),
      gcm = require('node-gcm'),

      BrowserMessageCtrl, _ptype;

  BrowserMessageCtrl = function(schemas, conf, googleId){
    this.schemas  = schemas;
    this.googleId = googleId;

    this.sender = new gcm.Sender(conf.get("gcm:key"));
  };

  _ptype = BrowserMessageCtrl.prototype = base.getProto("api");
  _ptype._name = "BrowserMessage";

  _ptype.sendMessage = function(payload, cb){
    var self = this;
    this.schemas.User.findOne({googleId: this.googleId}, function(err, user){
      if (err){ return cb(err) }

      if (!user || user.gcmId === null){
        return cb({
          msg: "User has not been registered yet"
        });
      }

      var gcmMessage = new gcm.Message({
        collapseKey: "parrot",
        delayWhileIdle: false,
        time_to_live: 4,
        data: {
          msg: payload
        }
      });
      self.sender.send(gcmMessage, [user.gcmId], 4, function(err, result){
        if (err){ return cb(err) }
        return cb();
      });
    });
  };

  module.exports = BrowserMessageCtrl;
}());
