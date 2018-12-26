import * as R from "ramda"
import $ from "jquery"
import moment from "moment"

$(document).ready(function() {
  const { curry, compose } = R

  const CARS = [
    { name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true },
    { name: "Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: false },
    { name: "Jaguar XKR-S", horsepower: 550, dollar_value: 132000, in_stock: false },
    { name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false },
    { name: "Aston Martin One-77", horsepower: 750, dollar_value: 1850000, in_stock: true },
    { name: "Pagani Huayra", horsepower: 700, dollar_value: 1300000, in_stock: false }
  ]

  const trace = curry(function(tag, x) {
    console.log(tag, x)
    return x
  })

  let Impure = {
    getJSON: curry(function(callback, url) {
      $.getJSON(url, callback)
    }),
    setHtml: curry(function(sel, html) {
      $(sel).html(html)
    })
  }

  let url = function(target) { return "/static/data/cat.json?target=" + target }

  let img = function(url) { return $('<img />', { src: url }) }

  let notEmpty = curry(function(x) { return x != null })

  let imageUrl = compose(R.prop("data"))

  let images = compose(R.map(img), R.filter(notEmpty), R.map(R.prop("thumbURL")), imageUrl)

  let renderImages = compose(Impure.setHtml("#container"), images)

  let app = compose(Impure.getJSON(renderImages), url)

  // app("cats")

  // $.getJSON("/static/data/cat.json", function({ data }) { $("#container").html(data.map(item => img(item.thumbURL))) })

  // ------------------------------------------------------------------------------------------------------------------------

  const Container = function(x) { this.__value = x }
  Container.of = function(x) { return new Container(x) }
  Container.prototype.map = function(f) { return Container.of(f(this.__value)) }

  let containerOne = Container.of(2).map(R.add(253))
  // console.log(containerOne)

  let containerTwo = Container.of("flamethrowers").map(R.toUpper)
  // console.log(containerTwo)

  let containerThree = Container.of("hello").map(R.concat(" world")).map(R.prop("length"))
  // console.log(containerThree)

  const Maybe = function(x) { this.__value = x }
  Maybe.of = function(x) { return new Maybe(x) }
  Maybe.prototype.isNothing = function() { return this.__value == null }
  Maybe.prototype.map = function(f) { return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value)) }

  let maybeOne = Maybe.of("Malkovich Malkovich").map(R.match(/a/ig))
  // console.log(maybeOne)

  let maybeTwo = Maybe.of(null).map(R.match(/a/ig))
  // console.log(maybeTwo)

  let maybeThree = Maybe.of({ name: "King" }).map(R.prop("age")).map(R.add(10))
  // console.log(maybeThree)

  let maybeFour = Maybe.of({ name: "King", age: 14 }).map(R.prop("age")).map(R.add(10))
  // console.log(maybeFour)

  let safeHead = function(xs) { return Maybe.of(xs[0]) }

  let map = curry(function(f, functor) { return functor.map(f) })

  let streetName = compose(map(R.add(1)), map(R.prop("number")), safeHead, R.prop("addresses"))

  // console.log(streetName({ addresses: [] }))
  // console.log(streetName({ addresses: [{ street: "Shady Ln.", number: 4201 }] }))

  let withdraw = curry(function(amount, account) { return account.balance >= amount ? Maybe.of({ balance: account.balance - amount }) : Maybe.of(null) })

  let finishTransaction = compose(R.concat("your balance is "), R.toString, R.prop("balance"))

  let getTwenty = compose(map(finishTransaction), withdraw(20))

  // console.log(getTwenty({ balance: 200.00 }))
  // console.log(getTwenty({ balance: 10.00 }))

  let maybe = curry(function(x, f, m) { return m.isNothing() ? x : f(m.__value) })

  let getTwentyPro = compose(maybe("You're broke!", finishTransaction), withdraw(20))

  // console.log(getTwentyPro({ balance: 200.00 }))
  // console.log(getTwentyPro({ balance: 10.00 }))

  const Left = function(x) { this.__value = x }
  Left.of = function(x) { return new Left(x) }
  Left.prototype.map = function(f) { return this }

  const Right = function(x) { this.__value = x }
  Right.of = function(x) { return new Right(x) }
  Right.prototype.map = function(f) { return Right.of(f(this.__value)) }

  let RightOne = compose(map(R.concat("b")), Right.of)
  // console.log(RightOne("rain"))

  let RightTwo = Right.of({ host: "localhost", port: 80 }).map(R.prop("host"))
  // console.log(RightTwo)

  let LeftOne = Left.of("rain").map(R.concat("b"))
  // console.log(LeftOne)

  let LeftTwo = Left.of("rolls eyes...").map(R.prop("host"))
  // console.log(LeftTwo)

  let getAge = curry(function(now, user) {
    let birthdate = moment(user.birthdate, 'YYYY-MM-DD')
    if (!birthdate.isValid()) return Left.of("Birth date could not be parsed")
    return Right.of(now.diff(birthdate, 'years'))
  })

  // console.log(getAge(moment(), { birthdate: 'balloons!' }))
  // console.log(getAge(moment(), { birthdate: '1995-04-10' }))

  let fortune = compose(R.concat("If you survive, you will be "), R.toString, R.add(1))
  let zoltar = compose(map(console.log), map(fortune), getAge(moment()))

  // zoltar({ birthdate: 'balloons!' })
  // zoltar({ birthdate: '1995-04-10' })

  let either = curry(function(f, g, e) {
    switch (e.constructor) {
      case Left:
        return f(e.__value)
      case Right:
        return g(e.__value)
    }
  })

  let zoltarPro = compose(console.log, either(R.identity, fortune), getAge(moment()))

  // zoltarPro({ birthdate: '2005-12-12' })
  // zoltarPro({ birthdate: 'balloons!' })

  let IO = function(f) {
    this.__value = f
  }

  IO.of = function(x) {
    return new IO(function() {
      return x
    })
  }

  IO.prototype.map = function(f) {
    return new IO(compose(f, this.__value))
  }

  let io_window = new IO(function() { return window })
  // console.log(io_window.map(function(win) { return win.innerWidth }))
  // console.log(io_window.map(R.prop('location')).map(R.prop('href')).map(R.split('/')))

})