import * as R from "ramda"
import Task from "data.task"

const { curry, compose, map } = R

const trace = curry(function(tag, x) {
  console.log(tag, x)
  return x
})

const Identity = function(x) { this.__value = x }
Identity.of = function(x) { return new Identity(x) }
Identity.prototype.map = function(f) { return Identity.of(f(this.__value)) }
Identity.prototype.inspect = function() { return "Identity(" + inspect(this.__value) + ")" }

const Maybe = function(x) { this.__value = x }
Maybe.of = function(x) { return new Maybe(x) }
Maybe.prototype.isNothing = function(f) { return (this.__value === null || this.__value === undefined) }
Maybe.prototype.map = function(f) { return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value)) }
Maybe.prototype.chain = function(f) { return this.map(f).join() }
Maybe.prototype.ap = function(other) { return this.isNothing() ? Maybe.of(null) : other.map(this.__value) }
Maybe.prototype.join = function() { return this.isNothing() ? Maybe.of(null) : this.__value }
Maybe.prototype.inspect = function() { return "Maybe(" + inspect(this.__value) + ")" }

const Either = function() {}
Either.of = function(x) { return new Right(x) }

const either = curry(function(f, g, e) {
  switch (e.constructor) {
    case Left:
      return f(e.__value)
    case Right:
      return g(e.__value)
  }
})

const Left = function(x) { this.__value = x }
Left.of = function(x) { return new Left(x) }
Left.prototype.map = function(f) { return this }
Left.prototype.ap = function(other) { return this }
Left.prototype.join = function() { return this }
Left.prototype.chain = function() { return this }
Left.prototype.inspect = function() { return "Left(" + inspect(this.__value) + ")" }

const Right = function(x) { this.__value = x }
Right.of = function(x) { return new Right(x) }
Right.prototype.map = function(f) { return Right.of(f(this.__value)) }
Right.prototype.join = function() { return this.__value }
Right.prototype.chain = function(f) { return f(this.__value) }
Right.prototype.ap = function(other) { return this.chain(function(f) { return other.map(f) }) }
Right.prototype.join = function() { return this.__value }
Right.prototype.chain = function(f) { return f(this.__value) }
Right.prototype.inspect = function() { return "Right(" + inspect(this.__value) + ")" }

const IO = function(f) { this.unsafePerformIO = f }
IO.of = function(x) { return new IO(function() { return x }) }
IO.prototype.map = function(f) { return new IO(compose(f, this.unsafePerformIO)) }
IO.prototype.join = function() { return this.unsafePerformIO() }
IO.prototype.chain = function(f) { return this.map(f).join() }
IO.prototype.ap = function(a) { return this.chain(function(f) { return a.map(f) }) }
IO.prototype.inspect = function() { return "IO(" + inspect(this.unsafePerformIO) + ")" }


// Exercise 1
// ==========
// Use R.add(x,y) and R.map(f,x) to make a function that increments a value inside a functor

let ex1 = map(R.add(1))

// console.log(ex1(Identity.of(2)))

// Exercise 2
// ==========
// Use R.head to get the first element of the list

let xs = Identity.of(["do", "ray", "me", "fa", "so", "la", "ti", "do"])
let ex2 = map(R.head)

// console.log(ex2(xs))

// Exercise 3
// ==========
// Use safeProp and R.head to find the first initial of the user

let safeProp = R.curry(function(x, o) { return Maybe.of(o[x]) })
let user = { id: 2, name: "Albert" }
let ex3 = compose(map(R.head), safeProp("name"))

// console.log(ex3(user))

// Exercise 4
// ==========
// Use Maybe to rewrite ex4 without an if statement

let _ex4 = function(n) { if (n) { return parseInt(n) } }
let ex4 = compose(map(parseInt), Maybe.of)

// console.log(ex4("4"))

// Exercise 5
// ==========
// Write a function that will getPost then R.toUpper the post"s title

// getPost :: Int -> Future({id: Int, title: String})

let getPost = function(i) {
  return new Task(function(rej, res) {
    setTimeout(function() {
      res({ id: i, title: "Love them futures" })
    }, 300)
  })
}
let ex5 = compose(map(compose(R.toUpper, R.prop("title"))), getPost)

// ex5(13).fork(trace("err"), trace("success"))

// Exercise 6
// ==========
// Write a function that uses checkActive() and showWelcome() to grant access or return the error

let showWelcome = compose(R.concat("Welcome "), R.prop("name"))
let checkActive = function(user) { return user.active ? Right.of(user) : Left.of("Your account is not active") }
let ex6 = compose(map(showWelcome), checkActive)

// console.log(ex6({ active: false, name: "Gary" }))
// console.log(ex6({ active: true, name: "Theresa" }))

// Exercise 7
// ==========
// Write a validation function that checks for a length > 3. It should return Right(x) if it is greater than 3 and Left("You need > 3") otherwise

let ex7 = function(x) { return x.length > 3 ? Right.of(x) : Left.of("You need > 3") }

// console.log(ex7("fpguy99"))
// console.log(ex7("..."))

// Exercise 8
// ==========
// Use ex7 above and Either as a functor to save the user if they are valid or return the error message string. Remember either's two arguments must return the same type.

let save = function(x) { return new IO(function() { return x + "-saved" }) }
let ex8 = compose(either(IO.of, save), ex7)

// console.log(ex8("fpguy99").unsafePerformIO())
// console.log(ex8("...").unsafePerformIO())