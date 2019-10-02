// TODO: Import various things...
// - express
// - path
// - body-parser
// - cookie-session
// - mongoose
// - various other file imports
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Question = require('./models/question');
var cookieSession = require('cookie-session');
var accountRoutes = require('./routes/account');
var isAuthenticated = require('./middlewares/isAuthenticated');

// instantiate express app
var app = express();

// instantiate a mongoose connect call
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/hw5-new'
);

// set the express view engine to take care of ejs within html files
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

// TODO: set up body parser...hint hint: https://github.com/cis197/lecture-examples/blob/master/server-example/server.js#L27
app.use(bodyParser.urlencoded({ extended: false }));
// TODO: set up cookie session ... hint hint: https://github.com/cis197/lecture-examples/blob/master/server-example/server.js#L21
app.use(
  cookieSession({
    name: 'local-session',
    keys: ['spooky'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
);

app.get('/', function(req, res, next) {
  console.log(req.session.user);
  Question.find({}, function(err, results) {
    if (err) next(err);
    res.render('index', { questions: results, user: req.session.user });
  });
});

// TODO: set up post route that will
//       a) check to see if a user is authenticated
//       b) add a new question to the db
//       c) redirect the user back to the home page when done

app.post('/', isAuthenticated, function(req, res, next) {
  var q = req.body.question;
  var questionObj = new Question({ questionText: q });
  questionObj.save(function(err) {
    if (!err) {
      res.redirect('/');
    } else {
      next(new Error('something went wrong: ' + err.message));
    }
  });
});

// TODO: Set up account routes under the '/account' route prefix.
// (i.e. login should be /account/login, signup = /account/signup,
//       logout = /account/logout)
app.use('/account', accountRoutes);

// don't put any routes below here!
app.use(function(err, _, res, _) {
  return res.send('ERROR :  ' + err.message);
});

app.listen(process.env.PORT || 3000, function() {
  console.log('App listening on port ' + (process.env.PORT || 3000));
});
