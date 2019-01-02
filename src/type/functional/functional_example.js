import * as R from "ramda"
import Task from "data.task"
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



  // let toUpperCase = function(x) { return x.toUpperCase() }
  // let exclaim = function(x) { return x + "!" }
  // let map = curry(function(fn, arr) { return arr.map(fn) })
  // let shout = compose(toUpperCase, exclaim)
  // let shouts = map(shout)

  // let arr = ["hello", "hello", "hello", "hello", "hello", "hello"]

  // console.log(shouts(arr))

  // let head = function(x) { return x[0] }
  // let reduce = curry(function(fn, init, arr) { return arr.reduce(fn, init) })
  // let reverse = curry(function(arr) { return arr.reverse() })
  // let last = compose(head, reverse)

  // console.log(last(['jumpkick', 'roundhouse', 'uppercut']))

  // let lastUpper = compose(toUpperCase, head, reverse)

  // console.log(lastUpper(['jumpkick', 'roundhouse', 'uppercut']))

  // let loudLastUpper = compose(exclaim, toUpperCase, head, reverse)

  // console.log(loudLastUpper(['jumpkick', 'roundhouse', 'uppercut']))

  // let replace = curry(function(what, to, str) { return str.replace(what, to) })
  // let toLowerCase = function(x) { return x.toLowerCase() }

  // let snakeCase = compose(replace(/\s+/ig, "_"), toLowerCase)

  // let snakeCases = map(snakeCase)

  // console.log(snakeCases(['jumpk ick', 'rou ndhouse', 'upp ercut']))

  // let join = curry(function(what, arr) { return arr.join(what) })

  // let split = curry(function(what, str) { return str.split(what) })

  // let initials = compose(join(". "), map(compose(toUpperCase, head)), split(" "))

  // console.log(initials("hunter stockton thompson"))

  // let angry = compose(exclaim, toUpperCase)

  // let latin = compose(map(angry), reverse)

  // console.log(latin(["frog", "eyes"]))

  // var dasherize = compose(join('-'), map(toLowerCase), split(' '), trace("after replace"), replace(/\s{2,}/ig, ' '))

  // console.log(dasherize('The world is a vampire'))

  // let g = function(x) { return x.length }
  // let f = function(x) { return x === 4 }
  // let isFourLetterWord = compose(f, g)

  // let id = function(x) { return x }


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
  Container.prototype.ap = function(other_container) { return other_container.map(this.__value) }
  let container = function(x) { return x.__value }

  let containerOne = Container.of(2).map(R.add(253))
  // console.log(containerOne)

  let containerTwo = Container.of("flamethrowers").map(R.toUpper)
  // console.log(containerTwo)

  let containerThree = Container.of("hello").map(R.concat(" world")).map(R.prop("length"))
  // console.log(containerThree)

  const Maybe = function(x) { this.__value = x }
  Maybe.of = function(x) { return new Maybe(x) }
  Maybe.prototype.isNothing = function() {
    if (this.__value instanceof Array) return this.__value.length === 0
    return this.__value == null
  }
  Maybe.prototype.join = function() { return this.isNothing() ? Maybe.of(null) : this.__value }
  Maybe.prototype.chain = function(f) { return this.map(f).join() }
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

  let withdraw = curry(function(amount, account) {
    return account.balance >= amount ? Maybe.of({ balance: account.balance - amount }) : Maybe.of(null)
  })

  let finishTransaction = compose(R.concat("your balance is "), R.toString, R.prop("balance"))

  let getTwenty = compose(map(finishTransaction), withdraw(20))

  // console.log(getTwenty({ balance: 200.00 }))
  // console.log(getTwenty({ balance: 10.00 }))

  let maybe = curry(function(x, f, m) { return m.isNothing() ? x : f(m.__value) })

  let getTwentyPro = compose(maybe("You're broke!", finishTransaction), withdraw(20))

  // console.log(getTwentyPro({ balance: 200.00 }))
  // console.log(getTwentyPro({ balance: 10.00 }))

  const Either = function() {}
  Either.of = function(x) { return new Right(x) }

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

  let withdrawPro = curry(function(amount, account) {
    return account.balance >= amount ? Right.of({ balance: account.balance - amount }) : Left.of("balance error")
  })

  let getTwentyEx = compose(console.log, either(R.identity, R.identity), withdrawPro(20))
  let getTwentyExTwo = compose(map(console.log), withdrawPro(20))

  // getTwentyExTwo({ balance: 200.00 })
  // getTwentyExTwo({ balance: 10.00 })

  let IO = function(f) { this.__value = f }
  IO.of = function(x) { return new IO(function() { return x }) }
  IO.prototype.map = function(f) { return new IO(compose(f, this.__value)) }
  IO.prototype.join = function() { return this.__value() }
  IO.prototype.ap = function(a) { return this.chain(function(f) { return a.map(f) }) }
  IO.prototype.chain = function(f) { return this.map(f).join() }

  let io = function(functor) {
    return functor.__value()
  }

  let io_localStorage = IO.of(localStorage)
  let io_window = IO.of(window)

  let demoOne = io_window.map(R.prop("innerWidth"))
  let demoTwo = io_window.map(R.prop("location")).map(R.prop("href")).map(R.split("/"))
  let getLocation = compose(R.split("/"), R.prop("href"), R.prop("location"))
  let demoThree = io_window.map(getLocation)

  // console.log(getLocation(window))
  // console.log(demoThree.__value())

  let _$ = function(selector) { return new IO(function() { return document.querySelectorAll(selector) }) }

  let demo = compose(function(div) { return div.innerHTML }, io, map(R.head), _$)

  // console.log(demo("#app"))

  let str = "http://www.baidu.com/page?dept_id=123&type=4&s_date=0&e_date=0&_t=1545891198258"

  let href = IO.of(str)

  let toPairs = compose(map(R.split("=")), R.split("&"))

  let params = compose(toPairs, R.last, R.split("?"))

  let findParam = function(key) {
    return href.map(compose(maybe("oops ! no data", R.identity), Maybe.of, R.filter(compose(R.equals(key), R.head)), params))
  }

  // console.log(findParam("type").__value())
  // console.log(findParam("name").__value())

  // ------------------------------------------------------------------------------------------------------------------------

  let idLaw1 = R.map(R.identity)
  let idLaw2 = R.identity

  let compLaw1 = compose(container, map(R.join(" ")), map(R.reverse), map(R.concat(["world"])), map(R.concat(["cruel"])))
  let compLaw2 = compose(container, map(compose(R.join(" "), R.reverse, R.concat(["world"]), R.concat(["cruel"]))))

  let topRoute = compose(Maybe.of, R.reverse)
  let bottomRoute = compose(map(R.reverse), Maybe.of)

  let nested = Task.of(Right.of("pillows"), Left.of("no sleep for you"))

  // ------------------------------------------------------------------------------------------------------------------------

  let xxx = compose(map(R.concat("master ")), IO.of)
  let yyy = compose(map(compose(R.add(1), parseInt)), Maybe.of)
  let getIds = map(R.prop("id"))
  let zzz = compose(map(getIds), Container.of)
  // console.log(xxx("tetris").__value())
  // console.log(yyy("123"))
  // console.log(zzz([{ id: 2 }, { id: 3 }]))

  let join = function(x) { return x.join() }
  let chain = curry(function(f, m) { return m.map(f).join() })
  let safeProp = curry(function(x, obj) { return new Maybe(obj[x]) })
  let safeTop = safeProp(0)
  let firstAddressStreet = compose(
    chain(safeProp("street")),
    chain(safeTop),
    safeProp("addresses")
  )
  let demoData = { addresses: [{ street: { name: 'Mulburry', number: 8402 }, postcode: "WC2N" }] }
  // console.log(firstAddressStreet(demoData))

  // console.log(Maybe.of(3).map(R.add(1)))

  let maybeChain = Maybe.of(3).chain(function(num) {
    return Maybe.of(2).map(R.add(num))
  })

  let maybeChainPro = Maybe.of(3).chain(compose(Maybe.of, Maybe.of(2).chain(R.add)))
  let ddd = compose(chain(safeProp('street')), chain(safeProp('address')))
  // console.log(ddd(Maybe.of({ address: { street: 123 } })))
  // console.log(Maybe.of({ address: { street: 123 } }).chain(safeProp('address')).chain(safeProp('street')))

  // ------------------------------------------------------------------------------------------------------------------------

  // console.log(Container.of(R.add(2)).ap(Container.of(3)))
  // console.log(Container.of(2).map(R.add).ap(Container.of(3)))

  let getVal = compose(map(R.prop('html')), _$)

  var signIn = curry(function(username) { console.log(username) })
  let xxxxxx = IO.of(signIn).ap(IO.of(123))
  console.log(xxxxxx)
  xxxxxx.__value()
})