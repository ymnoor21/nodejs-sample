module.exports = function (passport) {
   var express = require('express');
   var router = express.Router();

   /* GET home page. */
   router.get('/', function(req, res, next) {
     res.render('index', { title: 'Express' });
   });

   router.get('/login', function(req, res, next) {
      res.render('login', {title: 'Login'});
   });

   router.post('/login', 
      passport.authenticate('local', { failureRedirect: '/login' }),
      function(req, res) {
         res.redirect('/user');
      }
   ); 

   return router;
};