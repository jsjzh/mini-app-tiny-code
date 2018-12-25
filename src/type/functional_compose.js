import * as R from "ramda";

const { curry, compose } = R;

// let toUpperCase = function(x) { return x.toUpperCase(); };
// let exclaim = function(x) { return x + "!"; };
// let map = curry(function(fn, arr) { return arr.map(fn); })
// let shout = compose(toUpperCase, exclaim);
// let shouts = map(shout);

// let arr = ["hello", "hello", "hello", "hello", "hello", "hello"];

// console.log(shouts(arr));

// let head = function(x) { return x[0]; };
// let reduce = curry(function(fn, init, arr) { return arr.reduce(fn, init) })
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

// let trace = curry(function(tag, x) {
//   console.log(tag, x);
//   return x;
// });

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

let isLastInStock = function(cars) {
  let reversed_cars = R.last(cars);
  return R.prop('in_stock', reversed_cars)
};

// Exercise 2:
// ============
// use R.compose(), R.prop() and R.head() to retrieve the name of the first car

let nameOfFirstCar = undefined;


// Exercise 3:
// ============
// Use the helper function _average to refactor averageDollarValue as a composition

let _average = function(xs) { return reduce(add, 0, xs) / xs.length; }; // <- leave be

let averageDollarValue = function(cars) {
  let dollar_values = map(function(c) { return c.dollar_value; }, cars);
  return _average(dollar_values);
};


// Exercise 4:
// ============
// Write a function: sanitizeNames() using compose that takes an array of cars and returns a list of lowercase and underscored names: e.g: sanitizeNames([{name: "Ferrari FF"}]) //=> ["ferrari_ff"].

// let _underscore = replace(/\W+/g, '_'); //<-- leave this alone and use to sanitize

let sanitizeNames = undefined;


// Bonus 1:
// ============
// Refactor availablePrices with compose.

let availablePrices = function(cars) {
  let available_cars = R.filter(R.prop('in_stock'), cars);
  return available_cars.map(function(x) {
    return accounting.formatMoney(x.dollar_value)
  }).join(', ');
};


// Bonus 2:
// ============
// Refactor to pointfree. Hint: you can use R.flip()

let fastestCar = function(cars) {
  let sorted = R.sortBy(function(car) { return car.horsepower }, cars);
  let fastest = R.last(sorted);
  return fastest.name + ' is the fastest';
};