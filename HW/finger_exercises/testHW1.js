var exercises = require('./exercises')

//test sum function
var arr = [4, 5, 6]
var sum = exercises.arrayMethods.sum(arr) // should return 15
console.log(sum)

var arr2 = ['a', 5, 6]
console.log(exercises.arrayMethods.sum(arr2))