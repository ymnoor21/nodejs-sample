module.exports = function (passport) {
   var express = require('express');
   var router = express.Router();

   router.get('/', function (req, res, next) {
      if (req.session.passport.user === undefined) {
         res.redirect('/login');
      } else {
         res.render('user', {title: 'My Profile', user: req.user})
      }
   });

   return router;
};