const express  = require('express');
const router   = express.Router();
const jwt      = require('jsonwebtoken');
const passport = require("passport");
const User  = require("../model/user");

// get login form
module.exports.getLogin = (req, res) => {
  res.status(200).json({ 
    success: true, 
    message:'Successfully fetched form for login.'
  });
}

// login user
module.exports.postLogin = (req, res, next) => {
  passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Login failed',
                user   : user
            });
        }

        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }

            const token = jwt.sign(user.toJSON(), process.env.jwt_secret, { expiresIn: '5h' });

            return res.status(200).json({
              success : true,
              message : 'You successfully logged in your account',
              token   : token
            });
        });
    })
    (req, res);
}

// create new user
module.exports.signUp = (req, res) => {
  let user = new User();

  user.email    = req.body.email;
  user.password = user.generateHash(req.body.password);
  user.name     = req.body.name;
  user.address  = req.body.address;

  user.save(err => {
    if(err){
      return res.status(200).json({
        err:err, 
        message: 'Something went wrong.'
      });
    }

    res.status(200).json({
      success: true,
      message:"successfully added new user"
    });
  })
}


// get user profile
module.exports.getProfile = (req, res) => {
  res.status(200).json({ 
    user: req.user, 
    message: 'Successfully fetched user profile.'
  });
}

module.exports.getLogout = (req, res) => {
  req.logout();
  res.clearCookie('jwt');
  res.redirect('/api/login')
};