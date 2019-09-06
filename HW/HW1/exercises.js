/*
 * Homework 1 (CIS 197)
 * Finger Exercises
 * ---------------------------
 *
 * The following code stubs are incomplete. Your job is to complete the
 * functions and achieve the desired functionality described in the comments.
 * Please don't change the names of given functions and object properties, as
 * the autograder will treat them as missing and you will get a zero.
 *
 * While completing this assignment, be sure to use Mozilla Developer Network's
 * [JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference).
 */

/*
 * ==========================================================================
 * Exercise 1 - Array Helpers
 *
 * In this exercise we're going to augment the built-in `Array` methods with
 * some useful ones of our own.
 *
 * ==========================================================================
 */

/*
 * Complete the sum function, which sums all the elements in the array and returns the total.
 * Throw an error if an element isn't a Number.
 *
 * Hint: A JavaScript variable `x` is a number if (and only if) typeof x === 'number'.
 */
var sum = function (arr) {
  var sum = 0;
  for (var i = 0; i < arr.length; i++) {
    if (typeof arr[i] === Number) {
      sum += arr[i];
    } else {
      throw console.error('element is NaN');
    }
  }
  return sum;
};

/* Complete the remove function, which takes an array (`arr) and returns
 * a new array which contains the elements of `arr` with `item` removed.
 * HINT: you should use === for comparison, NOT ==.
 *
 * If `arr` contains more than one copy of `item`, remove both.
 * If `arr` doesn't contain `item`, return a copy of `arr`.
 */
var remove = function (arr, item) {
  var output = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === item) {
      continue;
    } else {
      output.push(arr[i]);
    }
  }
  return output;
};

/*
 * Complete findDuplicates, which returns all values in an array which occur
 * more than once.
 *
 * For example, if `arr` is [1, 1, 'a', 'b', 'c', 'a'], then findDuplicates(arr)
 * should return [1, 'a']
 */
var findDuplicates = function (arr) {
  var output = [];
  if (arr === null) {
    return output;
  }
  if (arr.length == 1) {
    return output;
  }
  for (var i = 0; i < arr.length - 1; i++) {
    var curr = arr[i];
    var isDuplicate = false;
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[j] === arr[i]) {
        isDuplicate = true;
      }
    }
    if (isDuplicate === true) {
      output.push(curr);
    }
  }
};

/*
 * ==========================================================================
 * Exercise 2 - Shopping Cart Mixins
 *
 * In this exercise, we will be writing some functions to manipulate a
 * 'shopping cart', which will be a plain old JavaScript object. These functions
 * will be 'mixed in' to the object, meaning that they will be assigned to it as
 * properties - so 'this' will refer to the cart object itself.
 *
 * This isn't the only way to write mixins in JavaScript, but it's one of the simplest!
 * We'll see how we can use some basic properties of JavaScript to dynamically extend
 * objects in ways that would be difficult in a language like Java.
 * ==========================================================================
 */


/*
 * Here is an example of a shopping cart. The items in the cart will be its keys,
 * and the corresponding *values* will be numbers representing the items' quantity.
 * There will be one special key, prices, that will be an object mapping items (strings)
 * to their prices (numbers).
 */

var pricesObject = {
  eggs: 2.50,
  milk: 3.00,
  bread: 2.75,
  orangeJuice: 4.25,
  chocolate: 1.50
};

var cart = {
  eggs: 2,
  milk: 3,
  chocolate: 10,
  prices: pricesObject
};

/*
 * The first mixin we will write simply checks if the cart it is attached to
 * has eggs or not. To be precise, if the number of eggs is greater than zero,
 * return true; otherwise, return false.
 */

var hasEggs = function () {
  if (this.eggs > 0) {
    return true;
  } else {
    return false;
  }
};

/*
 * Here is an example of how the mixin will be used. We'll simply assign it to
 * the shopping cart object as a property; then we can call cart.hasEggs() and figure
 * out whether or not the cart has eggs in it.
 */
cart.hasEggs = hasEggs;

/*
 * Uncomment the following line once you've completed the hasEggs function; it should print
 * 'true' if it's working. Don't forget to re-comment it before you submit though!
 */

// console.log(cart.hasEggs()); // --> true

/*
 * Now let's write a similar mixin to tell us whether a cart has chocolate. It should function
 * exactly the same as hasEggs, except now it's chocolate.
 */
var hasChocolate = function () {
  if (this.chocolate > 0) {
    return true;
  } else {
    return false;
  }
};

/*
 * We'll mix this functionality into our cart in the same way as the previous function.
 */
cart.hasChocolate = hasChocolate;

/*
 * As you can see, it really doesn't make sense for us to keep writing these functions for
 * every possible item in the cart! We're looking for something a bit more reusable. So
 * let's write a function called `hasItemMixin` that *generates* mixins to test for given items!
 *
 * The basic idea is simple: we'll call hasItemMixin('eggs') to generate the hasEggs mixin,
 * hasItemMixin('chocolate') to generate the hasChocolate mixin, and so on. Note that `hasItemMixin`
 * will be a higher order function, because it will need to return the mixin (which is a
 * function itself).
 */
var hasItemMixin = function (itemName) {
  return function () {
    if (this[itemName + ''] > 0) {
      return true;
    } else {
      return false;
    }
  }
};

/*
 * Now if we want to write a mixin for milk, we can use our brand-new higher order function!
 */
cart.hasMilk = hasItemMixin('milk');

// console.log(cart.hasMilk());

/*
 * Now let's write yet another mixin, called getTotalPrice, which will return the price of all
 * the items currently in the shopping cart. For instance, our example cart has a total price
 * of 29: 2 eggs at 2.50 each, 3 milks at 3.00 each, and 10 chocolates at 1.50 each.
 *
 * You can assume that if a cart has an item, its `prices` object has an entry for it too.
 *
 * HINT: this mixin requires that we iterate through the keys of the object
 * The best way to do this is to use Object.keys(obj), which returns the keys for `obj` as a list.
 * Don't forget that, in a mixin, `this` represents the current object...
 * DOUBLE HINT: Mixins are, themselves, properties of objects! As such, make sure that you're ONLY
 * adding up keys that are numbers -- otherwise you'll end up with NaN.
 */
var getTotalPrice = function () {
  var cart_items = Object.keys(this);
  var totalPrice = 0;
  for (var i = 0; i < cart_items.length; i++) {
    if (typeof this[cart_items[i]] === 'number') {
      var item = cart_items[i];
      var quantity = this[item];
      var price = this[cart_items[cart_items.indexOf('prices')]][item]
      totalPrice += quantity * price;
    }
    return totalPrice;
  }
};

/*
 * Finally, let's say that the store has a mother's day sale. For this sale, if you buy flowers,
 * you get 10% off the total price of your bill. Complete the code for the getSalePrice mixin.
 *
 * You can assume that getTotalPrice has already been mixed in to this cart object.
 *
 * Hint: you shouldn't assume that the cart has the hasFlowers mixin already, but it might
 * not be a bad idea to mix it in yourself...
 */
var getSalePrice = function () {
  this.hasFlowers = hasItemMixin('flowers');
  var price = this.getTotalPrice();
  if (this.hasFlowers) {
    return price * .90;
  } else {
    return price;
  }
};


/*
 * ==========================================================================
 * Exercise 3 - Higher Order Functions
 *
 * Let's get some practice with JavaScript functions by implementing some variants
 * of the higher-order functions from CIS 120.
 *
 * Note: JavaScript (since its fifth edition) has built-in map, filter, and reduce functions.
 * This is great because it means you can use them in the other exercises and all your subsequent homeworks!
 * However, I have disabled them for this exercise, so you do have to write the functions yourself =)
 *
 * ==========================================================================
 */

/*
 * First, let's implement map. In case you've forgotten from CIS 120, map takes in
 * two arguments - an array to perform the mapping on, and the mapping function.
 * It applies the mapping function to all elements in the array and returns an array of results.
 */
var map = function (array, mappingFunction) {
  var output = [];
  for (var i = 0; i < array.length; i++) {
    array.push(mappingFunction(array[i]));
  }
  return output;
};

/*
 * Next, let's implement filter. In case you've forgotten from CIS 120, filter takes in
 * two arguments - an array to filter, and a filtering function. It returns a list of all
 * elements of the array such that filterFunction(element) === true.
 */
var filter = function (array, filterFunction) {
  var output = [];
  array.forEach(function (input) {
    output.push(filterFunction(input));
  });
  return output;
};

/*
 * Next up is reduce (AKA fold). In case you've forgotten from CIS 120, reduce takes in
 * three arguments - an array to reduce, a reduction function, and a seed value. For every element
 * in the array, the reduction function is applied to the _current_ aggregate value and the element
 * to obtain the _new_ aggregate value. The seed value is thus the _first_ aggregate value, and the
 * result of reduce is the _final_ aggregate value obtained after processing the last element.
 */
var reduce = function (array, reductionFunction, seedValue) {
  var item = seedValue;
  array.forEach(function (input) {
    item = reductionFunction(input, item);
  });
  return item;
};

/* As it happens, it's possible to obtain map and filter directly from reduce. You're welcome to
 * move the reduce function up above the other two so that you can define them directly using
 * reduce, if you should so desire.
 */

/* Finally, let's write reduceRight. As you may have guessed, reduceRight is exactly like reduce,
 * except that instead of processing the elements in order (left-to-right), it processes them in
 * reverse order (right-to-left).
 */
var reduceRight = function (array, reductionFunction, seedValue) {
  var item = seedValue;
  for (var i = array.length - 1; i >= 0; i--) {
    item = reductionFunction(array[i], item);
  }
  return item;
};


/*
 * ==========================================================================
 * Exercise 4 - Stringifying Objects
 *
 * For our final exercise, we're going to write a handy function that turns an input value into a
 * string. Specifically, this function will take a 'plain object' - one that has no function
 * properties - and turns it into a string like the one you'd see if you used console.log().
 *
 * There is a built-in way to do this in JavaScript; namely, JSON.stringify. However, we're going
 * to use a slightly different set of rules for our function, so you can't just call this method - sorry!
 *
 * Specifically, you should follow these rules to make a stringify your object:
 *
 * 1. NUMBERS and BOOLEANS are turned into strings directly (e.g. 2.5 -> 2.5, true -> true).
 * 2. STRINGS, as values, should have _single_ quotes around them. Don't worry about escaping
 *    characters like \n, \r, ', et cetera.
 * 3. An ARRAY should be stringified as a left square bracket ('['), followed by its stringified values separated
 *    by commas, followed by a right square bracket (']'). There should be a space following every comma, and there
 *    should be no comma following the final value.
 * 4. An OBJECT should be stringified as a left curly brace ('{'), followed by each of its key value pairs, followed
 *    by a right curly brace ('}'). A key-value pair should be stringified as the key (with no surrounding quotes),
 *    then a colon and a space, and then the stringified value. As with arrays, the key-value pairs should be
 *    separated by commas; there should be a space following every comma, and there
 *    should be no comma following the final value.
 * 5. NULL should be stringified as null, and UNDEFINED should be stringified as undefined (no quotes around either).
 * 6. If you ever encounter a function (as the original input value, as an array element, or as an object property),
 *    then you should throw a new Error('Illegal argument').
 *
 * HINT 1: Your function should work for ANY plain JavaScript object you pass it, including base types like
 * numbers/strings. This points towards a pretty slick recursive implementation...
 * HINT 2: Use Object.keys to get the keys of an object to iterate through.
 * HINT 3: You can use `typeof` to get the type of an object (as a string). Read the docs online
 * at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof.
 * HINT 4: typeof doesn't work for Arrays (it just gives you 'object'). Use Array.isArray to differentiate them.
 *
 * ==========================================================================
 */

var stringify = function (object) {
  var output = '';
  if (object === null) {
    output = 'null';
  } else if (typeof object === 'undefined') {
    output = 'undefined';
  } else if (typeof object === 'boolean') {
    output = object + ''; // boolean becomes a string
  } else if (typeof object === 'number') {
    output = object + ''; // number becomes string
  } else if (typeof object == 'string') {
    output = '\'' + object + '\'';
  } else if (Array.isArray(object)) {
    output += '[';
    for (var i = 0; i < object.length; i++) {
      output += stringify(object[i]);
      if (i != object.length - 1) {
        output += ', '
      }
    }
    output += ']';
  } else if (typeof object === 'object') {
    output += '{';
    var keySet = Object.keys(object);
    for (var j = 0; j < keySet.length; j++) {
      output += keySet[j] + ': ';
      output += stringify(object[keySet[j]]);
      if (j != keySet.length - 1) {
        output += ', ';
      }
    }
    output += '}';
  }
  return output;
};

/*
 * NOTE: don't change this code.
 *
 * Export solution as a module.
 */
module.exports = {
  arrayMethods: {
    sum: sum,
    remove: remove,
    findDuplicates: findDuplicates
  },
  cartMixins: {
    hasEggs: hasEggs,
    hasChocolate: hasChocolate,
    hasItemMixin: hasItemMixin,
    getTotalPrice: getTotalPrice,
    getSalePrice: getSalePrice
  },
  hofs: {
    map: map,
    filter: filter,
    reduce: reduce,
    reduceRight: reduceRight
  },
  stringify: stringify
};

