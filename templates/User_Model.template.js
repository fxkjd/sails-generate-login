/**
* User.js
*
* @description :: User model
*/

//TODO ensure username and mail are unique (not working on mongo...)
var bcrypt = require('bcrypt');

module.exports = {

  tableName: 'users',

  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true
    },
    mail: {
      type: 'string',
      required: true
    },       
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },

  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      if(!sails.config.secret.key){
            console.log("secret key is required at config/secret.js");
            cb({message:"secret key is required at config/secret.js"});        
      } else {
        bcrypt.hash(user.password+sails.config.secret.key, salt, function(err, hash) {
          if (err) {
            console.log(err);
            cb(err);
          }else{
            user.password = hash;
            cb(null, user);
          }
        });
      }
    });
  }

};

