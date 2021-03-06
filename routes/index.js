module.exports = function (passport) {
    var express = require('express');
    var logout = require('express-passport-logout');
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

    router.get('/logout', function(req, res, next) {
        req.session.destroy();
        delete req.session;
        res.redirect('/login');
    });

    return router;
};