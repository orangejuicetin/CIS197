var exercises = require('./exercises')

// test sum with homogenous array
var input = [2, 4, 12, 5]
console.log(sum(input)); // = 23
// test sum with different elements 
var wrongInput = [2, 5, 'hello', 3];
console.log(sum(wrongInput)); // = should give error 'Element is NaN'
// test remove
console.log(remove(input, 4)); // = [2, 12, 5]
// test duplicates
var duplicatesInput = [1, 1, 5, 4, 3, 3];
console.log(findDuplicates(duplicatesInput)); // should be [1, 3]
// shopping cart tests
// hasItemMixin test

var cart = {
    juice: 2,
    milk: 2,
    crackers: 3,
    prices: pricesObject
};

var pricesObject = {
    juice: 3,
    milk: 3,
    crackers: 1.50
};


