var express = require('express');
var router = express.Router();
var Question = require('../models/question.js');

router.get('/questions', function(_, res, next) {
  Question.find({}, function(err, result) {
    if (err) next(err);
    res.json(result);
  });
});

router.post('/questions/add', function(req, res, next) {
  var { questionText } = req.body;
  var author = req.session.user;
  var q = new Question({ questionText, author });
  q.save(function(err, result) {
    if (err) next(err);
    res.json({ status: 'OK' });
  });
});

router.post('/questions/answer', function(req, res, next) {
  var { answer } = req.body;
  var { qid } = req.body;
  var q = new Question({ answer, qid });
  q.save(function(err) {
    if (err) next(err);
  });
  Question.find({}, function(err, result) {
    if (err) next(err);
    res.json({ success: 'OK' });
  });
});

module.exports = router;
