var nyt = require('./api/nyt');

// Makes GET request to Most Popular API (via nyt), returns an XML string containing
// article metadata
var pullTrendingArticles = function (callback) {
  nyt.mostPopular(function (error, response, body) {
    // note that error will be NOT null if the request.statusCode is 200. Otherwise, there will be an error
    if (!error && response.statusCode === 200) {
      callback(null, response.body);
    } else if (error !== null) {
      callback(error);
    } else {
      callback(new Error('Request did not succeed'));
    }
  })
};

module.exports = pullTrendingArticles;
