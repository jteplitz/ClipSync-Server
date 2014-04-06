(function(){
  "use strict";
  var mongoose = require("mongoose"),
      _        = require("underscore"),

      Schema   = mongoose.Schema,
      ObjectId = Schema.Types.ObjectId,
      Mixed    = Schema.Types.Mixed,

      updateTime;


  updateTime = function(next){
    this.updatedAt = Date.UTC();
    next();
  };

  var User = new Schema({
    googleId: {type: String, index: "unique"},
    gcmId: String,
    extensionInstalled: {type: Boolean, "default": false},
    updatedAt: Number
  });

  User.pre("save", updateTime);

  exports.User = mongoose.model("User", User);
}());
