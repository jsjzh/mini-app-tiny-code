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

// let curry = require('lodash').curry;

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

function inspect(x) {
  return (typeof x === 'function') ? inspectFn(x) : inspectArgs(x);
}

function inspectFn(f) {
  return (f.name) ? f.name : f.toString();
}

function inspectArgs(args) {
  return args.reduce(function(acc, x) {
    return acc += inspect(x);
  }, '(') + ')';
}

// let arr = ["tori spelling", "tori amos", "hello world"];

// let match = curry(function(what, str) {
//   return str.match(what);
// })

// let replace = curry(function(what, replacement, str) {
//   return str.replace(what, replacement)
// })

// let filter = curry(function(fn, arr) {
//   return arr.filter(fn);
// })

// let map = curry(function(fn, arr) {
//   return arr.map(fn)
// })

// let split = curry(function(what, x) {
//   return x.split(what);
// });

// var splitSpaces = split(' ');

// console.log(map(splitSpaces, arr));