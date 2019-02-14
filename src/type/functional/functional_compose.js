import { R, curry, compose } from './util'

const CARS = [
  { name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true },
  { name: 'Spyker C12 Zagato', horsepower: 650, dollar_value: 648000, in_stock: false },
  { name: 'Jaguar XKR-S', horsepower: 550, dollar_value: 132000, in_stock: false },
  { name: 'Audi R8', horsepower: 525, dollar_value: 114200, in_stock: false },
  { name: 'Aston Martin One-77', horsepower: 750, dollar_value: 1850000, in_stock: true },
  { name: 'Pagani Huayra', horsepower: 700, dollar_value: 1300000, in_stock: false }
]

// Exercise 1:
// ============
// use R.compose() to rewrite the function below. Hint: R.prop() is curried.

let isLastInStock = compose(
  R.prop('in_stock'),
  R.last
)

// console.log(isLastInStock(CARS))

// Exercise 2:
// ============
// use R.compose(), R.prop() and R.head() to retrieve the name of the first car

let nameOfFirstCar = compose(
  R.prop('name'),
  R.head
)

// console.log(nameOfFirstCar(CARS))

// Exercise 3:
// ============
// Use the helper function _average to refactor averageDollarValue as a composition

// LEAVE BE
let _average = function(xs) {
  return R.reduce(R.add, 0, xs) / xs.length
}

let averageDollarValue = compose(
  _average,
  R.map(R.prop('dollar_value'))
)

// console.log(averageDollarValue(CARS))

// Exercise 4:
// ============
// Write a function: sanitizeNames() using compose that takes an array of cars and returns a list of lowercase and underscored names: e.g: sanitizeNames([{name: "Ferrari FF"}]) //=> ["ferrari_ff"].

//leave this alone and use to sanitize
let _underscore = R.replace(/\W+/g, '_')
let sanitizeNames = compose(
  R.map(
    compose(
      _underscore,
      R.prop('name')
    )
  )
)

// console.log(sanitizeNames(CARS))

// Bonus 1:
// ============
// Refactor availablePrices with compose.

let headAdd$ = function(x) {
  return `${x}`
}
let availablePrices = compose(
  R.join(','),
  R.map(
    compose(
      headAdd$,
      R.prop('dollar_value')
    )
  ),
  R.filter(R.prop('in_stock'))
)

// console.log(availablePrices(CARS))

// Bonus 2:
// ============
// Refactor to pointfree. Hint: you can use R.flip()

let fastest = curry(function(x) {
  return `${x} is the fastest`
})
let fastestCar = compose(
  fastest,
  R.prop('name'),
  R.last,
  R.sortBy(R.prop('horsepower'))
)

// console.log(fastestCar(CARS))
