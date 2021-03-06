var sax = require('sax');

// Counts keyword frequency of articles in the XML using sax, returns a string
// array of the five most popular keywords
var countKeywords = function (POPULAR_XML, callback) {
  // Create a SAX XML parser. The "false" argument indicates it won't accept invalid XML.
  var parser = sax.parser(false);
  var keywords = {};
  var isInADX = false; // indicator variable that tells you whether or not you're in the adx_keywords tag

  parser.onerror = function (e) {
    callback(e);
  };

  parser.ontext = function (t) {
    if (isInADX) {
      var keyWordsArray = t.split(';');
      for (var i = 0; i < keyWordsArray.length; i++) {
        var word = keyWordsArray[i].trim();
        if (keywords[word] == undefined) {
          keywords[word] = 1;
        } else {
          keywords[word] += 1;
        }
      }
    }
  };

  parser.onopentag = function (node) {
    if (node.name === 'ADX_KEYWORDS') {
      isInADX = true;
    }
  };

  parser.onclosetag = function (node) {
    isInADX = false;
  };

  // HINT: the 'end' event happens only when the XML parser is finished.
  // This means you should be able to finalize your top keywords and call
  // the callback from this function!
  parser.onend = function () {
    var keys = Object.keys(keywords);
    keys.sort(function (a, b) {
      return keywords[b] - keywords[a];
    })
    // return first 5 (if less than five, take whatever the array size is)
    callback(null, keys.slice(0, 5));
  };
  // Kick off the parser with the input XML.
  parser.write(POPULAR_XML).close();
};

module.exports = countKeywords;
