var request = require('request');
var config = require('./config')

var apiKey = config.apiKey;

queue = [];

// indicates whether we are about to close the queue
var closing = false;

var i = setInterval(function () {
  if (queue.length > 0) {
    closing = false;
    fn = queue.shift();
    fn();
    console.log('request processed')
  } else if (!closing) {
    console.log('API request queue empty. Quitting in 5 seconds. Rerun program to make further requests');
    closing = true;
    setTimeout(function () { 
      clearInterval(i) 
    }, 5000);
  }
}, 1000);

var mostPopular = function (cb) {
  var f = function () {
    var callback = this.cb
    request('http://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/7.xml?api-key='
          + apiKey, callback);
  }.bind({ cb: cb })
  queue.push(f);
}

var articleSearch = function (query, cb) {
  var f = function () {
    var callback = this.cb
    var url = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q='
      + query + '&sort=newest&api-key=' + apiKey;
    request(url, function (error, response, body) {
      callback(error, response, body);
    });
  }.bind({ cb: cb })
  queue.push(f);
}

module.exports = {
  mostPopular: mostPopular,
  articleSearch: articleSearch
}
