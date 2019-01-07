import { R, Task, compose, Identity, Maybe, either, Left, Right, IO, trace, map } from "./util";

// Exercise 1
// ==========
// Use R.add(x,y) and R.map(f,x) to make a function that increments a value inside a functor

let ex1 = R.map(R.add(1));

// console.log(ex1(Identity.of(2)))

// Exercise 2
// ==========
// Use R.head to get the first element of the list

let ex2 = R.map(R.head);
let xs = Identity.of(["do", "ray", "me", "fa", "so", "la", "ti", "do"]);

// console.log(ex2(xs))

// Exercise 3
// ==========
// Use safeProp and R.head to find the first initial of the user

let safeProp = R.curry(function(x, o) {
  return Maybe.of(o[x]);
});
let ex3 = compose(
  R.map(R.head),
  safeProp("name")
);
let user = { id: 2, name: "Albert" };

// console.log(ex3(user))

// Exercise 4
// ==========
// Use Maybe to rewrite ex4 without an if statement

let ex4 = compose(
  R.map(parseInt),
  Maybe.of
);

// console.log(ex4("4"))

// Exercise 5
// ==========
// Write a function that will getPost then R.toUpper the post"s title

// getPost :: Int -> Future({id: Int, title: String})

let getPost = function(i) {
  return new Task(function(rej, res) {
    setTimeout(function() {
      res({ id: i, title: "Love them futures" });
    }, 300);
  });
};
let ex5 = compose(
  map(
    compose(
      R.toUpper,
      R.prop("title")
    )
  ),
  getPost
);

// ex5(13).fork(function(err) {
//   console.log("err", err)
// }, function(success) {
//   console.log("success", success)
// })

// Exercise 6
// ==========
// Write a function that uses checkActive() and showWelcome() to grant access or return the error

let showWelcome = compose(
  R.concat("Welcome "),
  R.prop("name")
);
let checkActive = function(user) {
  return user.active ? Right.of(user) : Left.of("Your account is not active");
};
let ex6 = compose(
  R.map(showWelcome),
  checkActive
);

// console.log(ex6({ active: false, name: "Gary" }))
// console.log(ex6({ active: true, name: "Theresa" }))

// Exercise 7
// ==========
// Write a validation function that checks for a length > 3. It should return Right(x) if it is greater than 3 and Left("You need > 3") otherwise

let ex7 = function(x) {
  return x.length > 3 ? Right.of(x) : Left.of("You need > 3");
};

// console.log(ex7("fpguy99"))
// console.log(ex7("..."))

// Exercise 8
// ==========
// Use ex7 above and Either as a functor to save the user if they are valid or return the error message string. Remember either's two arguments must return the same type.

let save = function(x) {
  return new IO(function() {
    return x + "-saved";
  });
};
let ex8 = compose(
  either(IO.of, save),
  ex7
);

// console.log(ex8("fpguy99").unsafePerformIO())
// console.log(ex8("...").unsafePerformIO())
