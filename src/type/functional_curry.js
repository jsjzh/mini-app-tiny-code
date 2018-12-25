import * as R from "ramda";

const { curry } = R;

// Exercise 1
//==============
// Refactor to remove all arguments by partially applying the function

let split = curry(function(what, str) {
  return str.split(what);
})

let words = function(str) {
  return split(" ", str);
};

console.log(words("Jingle bells Batman smells"));

// Exercise 1a
//==============
// Use map to make a new words fn that works on an array of strings.

let map = curry(function(fn, arr) {
  return arr.map(fn);
})

let sentences = map(words);

console.log(sentences(["Jingle bells Batman smells", "Robin laid an egg"]));

// Exercise 2
//==============
// Refactor to remove all arguments by partially applying the functions

let filter = curry(function(fn, arr) {
  return arr.filter(fn);
})

let match = curry(function(what, str) {
  return str.match(what);
})

let filterQs = function(xs) {
  return filter(function(x) { return match(/q/i, x); }, xs);
};

console.log(filterQs(['quick', 'camels', 'quarry', 'over', 'quails']));

// Exercise 3
//==============
// Use the helper function _keepHighest to refactor max to not reference any arguments

let reduce = curry(function(fn, init, arr) {
  return arr.reduce(fn, init)
})

// LEAVE BE:
let _keepHighest = function(x, y) { return x >= y ? x : y; };

// REFACTOR THIS ONE:
let max = function(xs) {
  return reduce(function(acc, x) {
    return _keepHighest(acc, x);
  }, 0, xs);
};

console.log(max([323, 523, 554, 123, 5234]));

// Bonus 1:
// ============
// wrap array"s slice to be functional and curried.
// //[1,2,3].slice(0, 2)

let slice = curry(function(start, end, arr) {
  return arr.slice(start, end);
});

console.log(slice(1)(3)(['a', 'b', 'c']));

// Bonus 2:
// ============
// use slice to define a function "take" that takes n elements. Make it curried

let take = slice(0);

console.log(take(2)(['a', 'b', 'c']));