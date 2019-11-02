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
  q.save(function(err) {
    if (err) next(err);
    res.json({ status: 'OK' });
  });
});

router.post('/questions/answer', function(req, res, next) {
  Question.findById(req.body.qid, function(err, question) {
    question.answer = req.body.answer;
    question.save(function(err) {
      if (err) next(err);
      res.json({ success: 'OK' });
    });
  });
});

module.exports = router;
