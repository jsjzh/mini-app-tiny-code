import * as R from "ramda";

const { curry, compose } = R;

// let toUpperCase = function(x) { return x.toUpperCase(); };
// let exclaim = function(x) { return x + "!"; };
let map = curry(function(fn, arr) { return arr.map(fn); })
// let shout = compose(toUpperCase, exclaim);
// let shouts = map(shout);

// let arr = ["hello", "hello", "hello", "hello", "hello", "hello"];

// console.log(shouts(arr));

// let head = function(x) { return x[0]; };
let reduce = curry(function(fn, init, arr) { return arr.reduce(fn, init) })
// let reverse = curry(function(arr) { return arr.reverse() });
// let last = compose(head, reverse);

// console.log(last(['jumpkick', 'roundhouse', 'uppercut']));

// let lastUpper = compose(toUpperCase, head, reverse);

// console.log(lastUpper(['jumpkick', 'roundhouse', 'uppercut']));

// let loudLastUpper = compose(exclaim, toUpperCase, head, reverse);

// console.log(loudLastUpper(['jumpkick', 'roundhouse', 'uppercut']));

// let replace = curry(function(what, to, str) { return str.replace(what, to) })
// let toLowerCase = function(x) { return x.toLowerCase(); };

// let snakeCase = compose(replace(/\s+/ig, "_"), toLowerCase);

// let snakeCases = map(snakeCase);

// console.log(snakeCases(['jumpk ick', 'rou ndhouse', 'upp ercut']));

// let join = curry(function(what, arr) { return arr.join(what) });

// let split = curry(function(what, str) { return str.split(what) });

// let initials = compose(join(". "), map(compose(toUpperCase, head)), split(" "));

// console.log(initials("hunter stockton thompson"));

// let angry = compose(exclaim, toUpperCase);

// let latin = compose(map(angry), reverse);

// console.log(latin(["frog", "eyes"]));

let trace = curry(function(tag, x) {
  console.log(tag, x);
  return x;
});

// var dasherize = compose(join('-'), map(toLowerCase), split(' '), trace("after replace"), replace(/\s{2,}/ig, ' '));

// console.log(dasherize('The world is a vampire'));

// let g = function(x) { return x.length };
// let f = function(x) { return x === 4; };
// let isFourLetterWord = compose(f, g);

// let id = function(x) { return x };

const CARS = [
  { name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true },
  { name: "Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: false },
  { name: "Jaguar XKR-S", horsepower: 550, dollar_value: 132000, in_stock: false },
  { name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false },
  { name: "Aston Martin One-77", horsepower: 750, dollar_value: 1850000, in_stock: true },
  { name: "Pagani Huayra", horsepower: 700, dollar_value: 1300000, in_stock: false }
];

// Exercise 1:
// ============
// use R.compose() to rewrite the function below. Hint: R.prop() is curried.

let isLastInStock = compose(R.prop("in_stock"), R.last)

console.log(isLastInStock(CARS));

// Exercise 2:
// ============
// use R.compose(), R.prop() and R.head() to retrieve the name of the first car

let nameOfFirstCar = compose(R.prop("name"), R.head);

console.log(nameOfFirstCar(CARS));

// Exercise 3:
// ============
// Use the helper function _average to refactor averageDollarValue as a composition

// LEAVE BE
let _average = function(xs) { return reduce(R.add, 0, xs) / xs.length; };

let averageDollarValue = compose(_average, R.map(R.prop("dollar_value")))

console.log(averageDollarValue(CARS));

// Exercise 4:
// ============
// Write a function: sanitizeNames() using compose that takes an array of cars and returns a list of lowercase and underscored names: e.g: sanitizeNames([{name: "Ferrari FF"}]) //=> ["ferrari_ff"].

// let _underscore = replace(/\W+/g, '_'); //<-- leave this alone and use to sanitize

let sanitizeNames = compose(R.map(R.prop("name")));

console.log(sanitizeNames(CARS));

// Bonus 1:
// ============
// Refactor availablePrices with compose.

// let availablePrices = function(cars) {
//   let available_cars = R.filter(R.prop('in_stock'), cars);
//   return available_cars.map(function(x) {
//     return accounting.formatMoney(x.dollar_value)
//   }).join(', ');
// };

let headAdd$ = function(x) { return "$" + x }

let availablePrices = compose(R.join(","), R.map(compose(headAdd$, R.prop("dollar_value"))), R.filter(R.prop("in_stock")))

console.log(availablePrices(CARS));

// Bonus 2:
// ============
// Refactor to pointfree. Hint: you can use R.flip()

let fastest = curry(function(x) { return x + ' is the fastest' })

let fastestCar = compose(fastest, R.prop("name"), R.last, R.sortBy(R.prop("horsepower")))

console.log(fastestCar(CARS));