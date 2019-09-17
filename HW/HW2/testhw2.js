var pullTrendingArticles = require('./pullTrendingArticles')
var countKeywords = require('./countKeywords')
var processKeywords = require('./processKeywords')

pullTrendingArticles(function (error, response) {
    console.log(error)
    console.log(response) // <- this is just the general trending articles responses

    countKeywords(response, function (error, topKeywords) {
        console.log(error)
        console.log(topKeywords) // <- this is the top keywords parsed out of those trending artilces

        processKeywords(topKeywords, function (err, rel) {
            console.log(err)
            console.log(rel) // <- this is an array of (large) JSON objects (each of which contains a bunch of articles for each keyword from the previous step
        })
    })
})