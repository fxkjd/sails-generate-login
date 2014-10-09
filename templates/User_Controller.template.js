/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 */

var passport = require('passport');

module.exports = {
 
  login: function (req, res) {
    res.view();
  },

  signup: function (req, res) {
    res.view();
  },

  process: function(req, res){
    passport.authenticate('local', function(err, user, info) {
      if ((err) || (!user)) {
        return res.view('user/login', {
          error: true
        });
      }

      req.logIn(user, function(err) {
        if (err) {
          res.send(err);
        } else{
          return res.redirect('/');
        }
      });
    })(req, res);
  },

  logout: function (req,res){
    req.logout();
    return res.redirect('/user/login');
  },

  create: function(req, res){
    
    var params = { username: req.param("username")
    , mail: req.param("mail")
    , password: req.param("password")
    };

    User.create(params)
      .exec(function createCB(err,created){
        if (err) {
          res.send(err);
        } else {
          return res.redirect('/user/login');
        }       
     });
  }  

};
