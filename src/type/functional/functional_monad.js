import { R, Task, curry, compose, map, chain, join, Maybe, either, Left, Right, unsafePerformIO, IO } from './util'

// Exercise 1
// ==========
// Use safeProp and map/join or chain to safely get the street name when given a user

let safeProp = curry(function(x, o) {
  return Maybe.of(o[x])
})
let user = { id: 2, name: 'albert', address: { street: { number: 22, name: 'Walnut St' } } }

let ex1 = compose(
  chain(safeProp('name')),
  chain(safeProp('street')),
  safeProp('address')
)
// ex1 = compose(safeProp("name"), join, safeProp("street"), join, safeProp("address"))
// console.log(ex1(user))

// Exercise 2
// ==========
// Use getFile to get the filename, remove the directory so it's just the file, then purely log it.

let getFile = function() {
  return new IO(function() {
    return __filename
  })
}
let pureLog = function(x) {
  return new IO(function() {
    return 'logged ' + x
  })
}
let ex2 = compose(
  chain(
    compose(
      pureLog,
      R.last,
      R.split('/')
    )
  ),
  getFile
)

// console.log(ex2(undefined).unsafePerformIO())

// Exercise 3
// ==========
// Use getPost() then pass the post's id to getComments().

let getPost = function(i) {
  return new Task(function(rej, res) {
    setTimeout(function() {
      res({ id: i, title: 'Love them tasks' })
    }, 300)
  })
}

let getComments = function(i) {
  return new Task(function(rej, res) {
    setTimeout(function() {
      res([
        { post_id: i, body: 'This book should be illegal' },
        { post_id: i, body: 'Monads are like smelly shallots' }
      ])
    }, 300)
  })
}

let ex3 = compose(
  chain(
    compose(
      getComments,
      R.prop('id')
    )
  ),
  getPost
)

// ex3(13).fork(console.log, function(res) {
//   console.log(res.map(R.prop('post_id')))
// })

// Exercise 4
// ==========
// Use validateEmail, addToMailingList and emailBlast to implement ex4's type signature.
// It should safely add a new subscriber to the list, then email everyone with this happy news.

//  addToMailingList :: Email -> IO [Email]
// 模仿数据库的 insert 行为
let addToMailingList = (function(list) {
  return function(email) {
    return new IO(function() {
      list.push(email)
      return email
    })
  }
})([])

//  emailBlast :: [Email] -> IO String
function emailBlast(email) {
  return new IO(function() {
    return 'success add: ' + email
  })
}

//  validateEmail :: Email -> Either String Email
let validateEmail = function(x) {
  return x.match(/\S+@\S+\.\S+/) ? Right.of(x) : Left.of('invalid email')
}

//  ex4 :: Email -> Either String (IO String)
let ex4 = compose(
  map(
    compose(
      chain(emailBlast),
      addToMailingList
    )
  ),
  validateEmail
)
let getResult = either(R.identity, unsafePerformIO)

// console.log(getResult(ex4('notanemail')))
// console.log(getResult(ex4('sleepy@grandpa.net')))
