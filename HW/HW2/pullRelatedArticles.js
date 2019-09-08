var nyt = require('./api/nyt');

// Makes GET request to Search API (in our NYT wrapper), returns an object containing the query and
// the JSON metadata
var pullRelatedArticles = function (query, callback) {
  nyt.articleSearch(query, function (error, response, body) {
    // Your code goes here
  });
};

module.exports = pullRelatedArticles;
