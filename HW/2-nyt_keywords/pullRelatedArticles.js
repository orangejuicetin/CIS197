var nyt = require('./api/nyt');

// Makes GET request to Search API (in our NYT wrapper), returns an object containing the query and
// the JSON metadata
var pullRelatedArticles = function (query, callback) {
  nyt.articleSearch(query, function (error, response, body) {
    // note that error will be NOT null if the request.statusCode is 200. Otherwise, there will be an error
    if (!error && response.statusCode === 200) {
      var output = {};
      output['query'] = query;
      output['JSON'] = body;
      callback(null, output);
    } else if (!error && response.statusCode !== 200) {
      callback(new Error('Request did not succeed'));
    } else {
      callback(error);
    }
  });
};

module.exports = pullRelatedArticles;
