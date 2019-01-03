import { log, R, Task, curry, compose, map, chain, join, trace, identity, Identity, maybe, Maybe, either, Either, Left, Right, unsafePerformIO, IO } from "./util"

let localStorage = {}

// Exercise 1
// ==========
// Write a function that add's two possibly null numbers together using Maybe and ap()
//  ex1 :: Number -> Number -> Maybe Number

let ex1 = function(x, y) { return Maybe.of(R.add).ap(Maybe.of(y)).ap(Maybe.of(x)) }

// console.log(ex1(2, 3))

// Exercise 2
// ==========
// Now write a function that takes 2 Maybe's and adds them. Use liftA2 instead of ap().
//  ex2 :: Maybe Number -> Maybe Number -> Maybe Number

let ex2 = R.lift(R.add)

// console.log(ex2(Maybe.of(2), Maybe.of(3)))

// Exercise 3
// ==========
// Run both getPost(n) and getComments(n) then render the page with both. (the n arg is arbitrary)

function getPost(i) {
  return new Task(function(rej, res) {
    setTimeout(function() {
      res({ id: i, title: 'Love them futures' })
    }, 300)
  })
}

function getComments(i) {
  return new Task(function(rej, res) {
    setTimeout(function() {
      res(["This book should be illegal", "Monads are like space burritos"])
    }, 300)
  })
}

let makeComments = R.reduce(function(acc, c) { return acc + "<li>" + c + "</li>" }, "")
let render = curry(function(p, cs) { return "<div>" + p.title + "</div>" + makeComments(cs) })

//  ex3 :: Task Error HTML
let ex3 = R.lift(render)(getPost(1), getComments(2))

// ex3.fork(console.log, function(html) {
//   console.log(html)
// })

// Exercise 4
// ==========
// Write an IO that gets both player1 and player2 from the cache and starts the game

localStorage.player1 = "toby"
localStorage.player2 = "sally"

let getCache = function(x) {
  return new IO(function() { return localStorage[x] })
}
let game = R.curry(function(p1, p2) { return p1 + ' vs ' + p2 })

//  ex4 :: IO String
let ex4 = R.lift(game)(getCache("player1"), getCache("player2"))

// console.log(ex4.unsafePerformIO())