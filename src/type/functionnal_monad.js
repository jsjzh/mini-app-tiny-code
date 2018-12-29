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
Right.prototype.inspect = function() { return "Right(" + inspect(this.__value) + ")" }

const IO = function(f) { this.unsafePerformIO = f }
IO.of = function(x) { return new IO(function() { return x }) }
IO.prototype.map = function(f) { return new IO(compose(f, this.unsafePerformIO)) }
IO.prototype.join = function() { return this.unsafePerformIO() }
IO.prototype.chain = function(f) { return this.map(f).join() }
IO.prototype.ap = function(a) { return this.chain(function(f) { return a.map(f) }) }
IO.prototype.inspect = function() { return "IO(" + inspect(this.unsafePerformIO) + ")" }

let join = function(x) { return x.join() }
let chain = curry(function(f, m) { return m.chain(f) })
let unsafePerformIO = function(functor) { return functor.unsafePerformIO() }
// Exercise 1
// ==========
// Use safeProp and map/join or chain to safely get the street name when given a user

let safeProp = curry(function(x, o) { return Maybe.of(o[x]) })
let user = { id: 2, name: "albert", address: { street: { number: 22, name: 'Walnut St' } } }

let ex1 = compose(chain(safeProp("name")), chain(safeProp("street")), safeProp("address"))
// ex1 = compose(safeProp("name"), join, safeProp("street"), join, safeProp("address"))
// console.log(ex1(user))

// Exercise 2
// ==========
// Use getFile to get the filename, remove the directory so it's just the file, then purely log it.

let getFile = function() { return new IO(function() { return __filename }) }
let pureLog = function(x) {
  return new IO(function() {
    console.log(x)
    return 'logged ' + x
  })
}
let ex2 = compose(chain(compose(pureLog, R.last, R.split('/'))), getFile)

// console.log(ex2(undefined).unsafePerformIO())

// Exercise 3
// ==========
// Use getPost() then pass the post's id to getComments().

let getPost = function(i) {
  return new Task(function(rej, res) {
    setTimeout(function() {
      res({ id: i, title: 'Love them tasks' }) // THE POST
    }, 1000)
  })
}

let getComments = function(i) {
  return new Task(function(rej, res) {
    setTimeout(function() {
      res([{ post_id: i, body: "This book should be illegal" }, { post_id: i, body: "Monads are like smelly shallots" }])
    }, 1000)
  })
}

let ex3 = compose(chain(compose(getComments, R.prop("id"))), getPost)
// ex3(13).fork(console.log, function(res) {
//   console.log(res.map(R.prop('post_id')))
// })

// Exercise 4
// ==========
// Use validateEmail, addToMailingList and emailBlast to implement ex4's type signature.
// It should safely add a new subscriber to the list, then email everyone with this happy news.

//  addToMailingList :: Email -> IO [Email]
let addToMailingList = (function(list) {
  return function(email) {
    return new IO(function() {
      list.push(email)
      return list
    })
  }
})([])

//  emailBlast :: [Email] -> IO String
function emailBlast(list) {
  return new IO(function() {
    return 'emailed: ' + list.join(',') // for testing w/o mocks
  })
}

//  validateEmail :: Email -> Either String Email
let validateEmail = function(x) {
  return x.match(/\S+@\S+\.\S+/) ? (new Right(x)) : (new Left('invalid email'))
}

//  ex4 :: Email -> Either String (IO String)
let ex4 = compose(map(compose(chain(emailBlast), addToMailingList)), validateEmail)
let getResult = either(R.identity, unsafePerformIO)

// console.log(getResult(ex4('notanemail')))
// console.log(getResult(ex4('sleepy@grandpa.net')))