// let Immutable = require('immutable');

// let decrementHP = function(player) {
//   return player.set("hp", player.get("hp") - 1);
// };

// let isSameTeam = function(player1, player2) {
//   return player1.get("team") === player2.get("team");
// };

// let punch = function(player, target) {
//   if (isSameTeam(player, target)) {
//     return target;
//   } else {
//     return decrementHP(target);
//   }
// };

// let jobe = Immutable.Map({ name: "Jobe", hp: 20, team: "red" });
// let michael = Immutable.Map({ name: "Michael", hp: 20, team: "green" });

// console.log(punch(jobe, michael).get("hp"));

let curry = require('lodash').curry;

// function curry(fn) {
//   let len = fn.length;
//   return function judgeCurry(...args1) {
//     if (args1.length >= len) {
//       return fn.apply(null, args1)
//     } else {
//       return function(...args2) {
//         return judgeCurry.apply(null, args1.concat(args2))
//       }
//     }
//   }
// }

let match = curry(function(what, str) {
  return str.match(what);
});

let replace = curry(function(what, replacement, str) {
  return str.replace(what, replacement);
});

let filter = curry(function(f, ary) {
  return ary.filter(f);
});

let map = curry(function(f, ary) {
  return ary.map(f);
});

match(/\s+/g, "hello world")
// [ ' ' ]

match(/\s+/g)("hello world")
// [ ' ' ]

let hasSpaces = match(/\s+/g);
// function(x) { return x.match(/\s+/g) }

hasSpaces("hello world")
// [ ' ' ]

hasSpaces("spaceless")
// null

filter(hasSpaces, ["tori_spelling", "tori amos"])
// ["tori amos"]

let findSpaces = filter(hasSpaces);
// function(xs) { return xs.filter(function(x) { return x.match(/\s+/g) }) }

findSpaces(["tori_spelling", "tori amos"])
// ["tori amos"]

let noVowels = replace(/[aeiou]/ig);
// function(replacement, x) { return x.replace(/[aeiou]/ig, replacement) }

let censored = noVowels("*");
// function(x) { return x.replace(/[aeiou]/ig, "*") }

censored("Chocolate Rain")
// 'Ch*c*l*t* R**n'

let split = curry(function(what, replacement, str) {
  return str.split(what, replacement);
})

var words = function(str) {
  return split(' ', "demo", str);
};

console.log(words("qwer qwer wqer"));