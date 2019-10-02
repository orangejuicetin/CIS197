var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var isAuthenticated = require('../middlewares/isAuthenticated');
var User = require('../models/user');

// TODO: set up body parser...hint hint: https://github.com/cis197/lecture-examples/blob/master/server-example/server.js#L27
router.use(bodyParser.urlencoded({ extended: false }));
// TODO: set up cookie session ... hint hint: https://github.com/cis197/lecture-examples/blob/master/server-example/server.js#L21
router.use(
  cookieSession({
    name: 'local-session',
    keys: ['spooky'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
);

router.get('/signup', function(res) {
  // debug check for all signed up users
  User.find({}, function(err, results) {
    console.log('existing users:', results);
  });
  res.render('signup');
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.get('/logout', isAuthenticated, function(req, res) {
  req.session.user = '';
  res.redirect('/');
});

router.post('/signup', function(req, res, next) {
  var { username, password } = req.body;
  var u = new User({ username, password });
  console.log('user', u);
  u.save(function(err, result) {
    console.log('saved', err, result);
    if (err) next(err);
    if (!err) {
      res.redirect('login');
    }
  });
});

router.post('/login', function(req, res, next) {
  var { username, password } = req.body;
  User.findOne({ username, password }, function(err, user) {
    if (err || !user) next(new Error('incorrect credentials'));
    if (!err) {
      req.session.user = user.username;
      res.send('hi, you are logged in!');
    }
  });
});

module.exports = router;
