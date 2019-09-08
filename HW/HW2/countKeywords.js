var sax = require('sax');

// Counts keyword frequency of articles in the XML using sax, returns a string
// array of the five most popular keywords
var countKeywords = function (POPULAR_XML, callback) {
  // Create a SAX XML parser. The "false" argument indicates it won't accept invalid XML.
  var parser = sax.parser(false);

  parser.onerror = function (e) {

  };

  parser.ontext = function (t) {

  };

  parser.onopentag = function (node) {

  };

  parser.onclosetag = function (node) {

  };

  // HINT: the 'end' event happens only when the XML parser is finished.
  // This means you should be able to finalize your top keywords and call
  // the callback from this function!
  parser.onend = function () {

  };

  // Kick off the parser with the input XML.
  parser.write(POPULAR_XML).close();
};

module.exports = countKeywords;
