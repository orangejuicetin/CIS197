var sax = require('sax');

// Counts keyword frequency of articles in the XML using sax, returns a string
// array of the five most popular keywords
var countKeywords = function (POPULAR_XML, callback) {
  // Create a SAX XML parser. The "false" argument indicates it won't accept invalid XML.
  var parser = sax.parser(false);
  var keywords = new Object();

  parser.onerror = function (e) {
    callback(e);
  };

  parser.ontext = function (t) {
    var text = t.trim();
    var keyWordsArray = text.split(';');
    for (var keyword in keyWordsArray) {
      if (keywords[keyword] === null) {
        keywords[keyword] = 1;
      } else {
        keywords[keyword]++;
      }
    }
  };

  parser.onopentag = function (node) {
    if (node.name == 'ADX_KEYWORDS') {
      keywords.bind(this.parser.ontext());
    }
  };

  parser.onclosetag = function (node) {

  };

  // HINT: the 'end' event happens only when the XML parser is finished.
  // This means you should be able to finalize your top keywords and call
  // the callback from this function!
  parser.onend = function () {
    callback(null, , )
  };

  // Kick off the parser with the input XML.
  parser.write(POPULAR_XML).close();
};

module.exports = countKeywords;
