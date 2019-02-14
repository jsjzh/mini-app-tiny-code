import {
  R,
  Task,
  curry,
  compose,
  map,
  chain,
  join,
  trace,
  identity,
  Identity,
  maybe,
  Maybe,
  either,
  Either,
  Left,
  Right,
  unsafePerformIO,
  IO
} from './util'
import $ from 'jquery'
import moment from 'moment'

const CARS = [
  { name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true },
  { name: 'Spyker C12 Zagato', horsepower: 650, dollar_value: 648000, in_stock: false },
  { name: 'Jaguar XKR-S', horsepower: 550, dollar_value: 132000, in_stock: false },
  { name: 'Audi R8', horsepower: 525, dollar_value: 114200, in_stock: false },
  { name: 'Aston Martin One-77', horsepower: 750, dollar_value: 1850000, in_stock: true },
  { name: 'Pagani Huayra', horsepower: 700, dollar_value: 1300000, in_stock: false }
]

$(document).ready(function() {
  let exclaim = function(x) {
    return x + '!'
  }
  let shout = compose(
    R.toUpper,
    exclaim
  )
  let shouts = map(shout)

  let arr = ['hello', 'world', 'my', 'friend', 'hello', 'hello']

  // console.log(shouts(arr))

  let head = function(x) {
    return x[0]
  }
  let reverse = curry(function(arr) {
    return arr.reverse()
  })
  let last = compose(
    head,
    reverse
  )

  // console.log(last(['jumpkick', 'roundhouse', 'uppercut']))

  let lastUpper = compose(
    R.toUpper,
    head,
    reverse
  )

  // console.log(lastUpper(['jumpkick', 'roundhouse', 'uppercut']))

  let loudLastUpper = compose(
    exclaim,
    R.toUpper,
    head,
    reverse
  )

  // console.log(loudLastUpper(['jumpkick', 'roundhouse', 'uppercut']))

  let toLowerCase = function(x) {
    return x.toLowerCase()
  }

  let snakeCase = compose(
    R.replace(/\s+/gi, '_'),
    toLowerCase
  )

  let snakeCases = map(snakeCase)

  // console.log(snakeCases(['jumpk ick', 'rou ndhouse', 'upp ercut']))

  let initials = compose(
    R.join('. '),
    map(
      compose(
        R.toUpper,
        head
      )
    ),
    R.split(' ')
  )

  // console.log(initials("hunter stockton thompson"))

  let angry = compose(
    exclaim,
    R.toUpper
  )

  let latin = compose(
    map(angry),
    reverse
  )

  // console.log(latin(["frog", "eyes"]))

  let dasherize = compose(
    R.join('-'),
    map(toLowerCase),
    R.split(' '),
    trace('after replace'),
    R.replace(/\s{2,}/gi, ' ')
  )

  // console.log(dasherize('The world is a vampire'))

  // ------------------------------------------------------------------------------------------------------------------------

  let Impure = {
    getJSON: curry(function(callback, url) {
      $.getJSON(url, callback)
    }),
    setHtml: curry(function(sel, html) {
      $(sel).html(html)
    })
  }

  let url = function(target) {
    return '/static/data/cat.json?target=' + target
  }

  let img = function(url) {
    return $('<img />', { src: url })
  }

  let notEmpty = curry(function(x) {
    return x != null
  })

  let imageUrl = compose(R.prop('data'))

  let images = compose(
    R.map(img),
    R.filter(notEmpty),
    R.map(R.prop('thumbURL')),
    imageUrl
  )

  let renderImages = compose(
    Impure.setHtml('#container'),
    images
  )

  let app = compose(
    Impure.getJSON(renderImages),
    url
  )

  // app("cats")

  // $.getJSON("/static/data/cat.json", function({ data }) { $("#container").html(data.map(item => img(item.thumbURL))) })

  let containerOne = Identity.of(2).map(R.add(253))
  // console.log(containerOne)

  let containerTwo = Identity.of('flamethrowers').map(R.toUpper)
  // console.log(containerTwo)

  let containerThree = Identity.of('hello')
    .map(R.concat(' world'))
    .map(R.prop('length'))
  // console.log(containerThree)

  let maybeOne = Maybe.of('Malkovich Malkovich').map(R.match(/a/gi))
  // console.log(maybeOne)

  let maybeTwo = Maybe.of(null).map(R.match(/a/gi))
  // console.log(maybeTwo)

  let maybeThree = Maybe.of({ name: 'King' })
    .map(R.prop('age'))
    .map(R.add(10))
  // console.log(maybeThree)

  let maybeFour = Maybe.of({ name: 'King', age: 14 })
    .map(R.prop('age'))
    .map(R.add(10))
  // console.log(maybeFour)

  let safeHead = function(xs) {
    return Maybe.of(xs[0])
  }

  let streetName = compose(
    map(R.add(1)),
    map(R.prop('number')),
    safeHead,
    R.prop('addresses')
  )

  // console.log(streetName({ addresses: [] }))
  // console.log(streetName({ addresses: [{ street: "Shady Ln.", number: 4201 }] }))

  let withdraw = curry(function(amount, account) {
    return account.balance >= amount ? Maybe.of({ balance: account.balance - amount }) : Maybe.of(null)
  })

  let finishTransaction = compose(
    R.concat('your balance is '),
    R.toString,
    R.prop('balance')
  )

  let getTwenty = compose(
    map(finishTransaction),
    withdraw(20)
  )

  // console.log(getTwenty({ balance: 200.00 }))
  // console.log(getTwenty({ balance: 10.00 }))

  let maybe = curry(function(x, f, m) {
    return m.isNothing() ? x : f(m.__value)
  })

  let getTwentyPro = compose(
    maybe("You're broke!", finishTransaction),
    withdraw(20)
  )

  // console.log(getTwentyPro({ balance: 200.00 }))
  // console.log(getTwentyPro({ balance: 10.00 }))

  let RightOne = compose(
    map(R.concat('b')),
    Right.of
  )
  // console.log(RightOne("rain"))

  let RightTwo = Right.of({ host: 'localhost', port: 80 }).map(R.prop('host'))
  // console.log(RightTwo)

  let LeftOne = Left.of('rain').map(R.concat('b'))
  // console.log(LeftOne)

  let LeftTwo = Left.of('rolls eyes...').map(R.prop('host'))
  // console.log(LeftTwo)

  let getAge = curry(function(now, user) {
    let birthdate = moment(user.birthdate, 'YYYY-MM-DD')
    if (!birthdate.isValid()) return Left.of('Birth date could not be parsed')
    return Right.of(now.diff(birthdate, 'years'))
  })
  // console.log(getAge(moment(), { birthdate: 'balloons!' }))
  // console.log(getAge(moment(), { birthdate: '1995-04-10' }))

  let fortune = compose(
    R.concat('If you survive, you will be '),
    R.toString,
    R.add(1)
  )
  let zoltar = compose(
    map(console.log),
    map(fortune),
    getAge(moment())
  )
  // zoltar({ birthdate: 'balloons!' })
  // zoltar({ birthdate: '1995-04-10' })

  let zoltarPro = compose(
    console.log,
    either(R.identity, fortune),
    getAge(moment())
  )

  // zoltarPro({ birthdate: '2005-12-12' })
  // zoltarPro({ birthdate: 'balloons!' })

  let withdrawPro = curry(function(amount, account) {
    return account.balance >= amount ? Right.of({ balance: account.balance - amount }) : Left.of('balance error')
  })

  let getTwentyEx = compose(
    console.log,
    either(R.identity, R.identity),
    withdrawPro(20)
  )
  let getTwentyExTwo = compose(
    map(console.log),
    withdrawPro(20)
  )
  // getTwentyExTwo({ balance: 200.00 })
  // getTwentyExTwo({ balance: 10.00 })

  let io_localStorage = IO.of(localStorage)
  let io_window = IO.of(window)

  let demoOne = io_window.map(R.prop('innerWidth'))
  let demoTwo = io_window
    .map(R.prop('location'))
    .map(R.prop('href'))
    .map(R.split('/'))
  let getLocation = compose(
    R.split('/'),
    R.prop('href'),
    R.prop('location')
  )
  let demoThree = io_window.map(getLocation)

  // console.log(getLocation(window))
  // console.log(demoThree.unsafePerformIO())

  let _$ = function(selector) {
    return new IO(function() {
      return document.querySelectorAll(selector)
    })
  }

  let getHtml = compose(
    function(div) {
      return div.innerHTML
    },
    unsafePerformIO,
    map(R.head),
    _$
  )

  // console.log(getHtml("#app"))

  let str = 'http://www.baidu.com/page?dept_id=123&type=4&s_date=0&e_date=0&_t=1545891198258'

  let href = IO.of(str)

  let toPairs = compose(
    map(R.split('=')),
    R.split('&')
  )

  let params = compose(
    toPairs,
    R.last,
    R.split('?')
  )

  let findParam = function(key) {
    return href.map(
      compose(
        maybe('oops ! no data', R.identity),
        Maybe.of,
        R.filter(
          compose(
            R.equals(key),
            R.head
          )
        ),
        params
      )
    )
  }

  // console.log(findParam("type").unsafePerformIO())
  // console.log(findParam("name").unsafePerformIO())

  // ------------------------------------------------------------------------------------------------------------------------

  let idLaw1 = R.map(R.identity)
  let idLaw2 = R.identity

  let compLaw1 = compose(
    container,
    map(R.join(' ')),
    map(R.reverse),
    map(R.concat(['world'])),
    map(R.concat(['cruel']))
  )
  let compLaw2 = compose(
    container,
    map(
      compose(
        R.join(' '),
        R.reverse,
        R.concat(['world']),
        R.concat(['cruel'])
      )
    )
  )

  let topRoute = compose(
    Maybe.of,
    R.reverse
  )
  let bottomRoute = compose(
    map(R.reverse),
    Maybe.of
  )

  let nested = Task.of(Right.of('pillows'), Left.of('no sleep for you'))

  // ------------------------------------------------------------------------------------------------------------------------

  let xxx = compose(
    map(R.concat('master ')),
    IO.of
  )
  let yyy = compose(
    map(
      compose(
        R.add(1),
        parseInt
      )
    ),
    Maybe.of
  )
  let getIds = map(R.prop('id'))
  let zzz = compose(
    map(getIds),
    Identity.of
  )
  // console.log(xxx("tetris").unsafePerformIO())
  // console.log(yyy("123"))
  // console.log(zzz([{ id: 2 }, { id: 3 }]))

  let chain = curry(function(f, m) {
    return m.map(f).join()
  })
  let safeProp = curry(function(x, obj) {
    return new Maybe(obj[x])
  })
  let safeTop = safeProp(0)
  let firstAddressStreet = compose(
    chain(safeProp('street')),
    chain(safeProp(0)),
    safeProp('addresses')
  )
  let demoData = { addresses: [{ street: { name: 'Mulburry', number: 8402 }, postcode: 'WC2N' }] }
  // console.log(firstAddressStreet(demoData))

  // console.log(Maybe.of(3).map(R.add(1)))

  let maybeChain = Maybe.of(3).chain(function(num) {
    return Maybe.of(2).map(R.add(num))
  })

  let maybeChainPro = Maybe.of(3).chain(
    compose(
      Maybe.of,
      Maybe.of(2).chain(R.add)
    )
  )
  let ddd = compose(
    chain(safeProp('street')),
    chain(safeProp('address'))
  )
  // console.log(ddd(Maybe.of({ address: { street: 123 } })))
  // console.log(Maybe.of({ address: { street: 123 } }).chain(safeProp('address')).chain(safeProp('street')))

  // ------------------------------------------------------------------------------------------------------------------------

  // console.log(Identity.of(R.add(2)).ap(Identity.of(3)))
  // console.log(Identity.of(2).map(R.add).ap(Identity.of(3)))

  let liftA2 = curry(function(f, functor1, functor2) {
    return functor1.map(f).ap(functor2)
  })
  let liftA3 = curry(function(f, functor1, functor2, functor3) {
    return functor1
      .map(f)
      .ap(functor2)
      .ap(functor3)
  })

  let renderPage = curry(function(data1, data2) {
    return { data1, data2 }
  })
  let asyncFn1 = function(i) {
    return new Task(function(rej, res) {
      setTimeout(function() {
        res(i)
      }, 0)
    })
  }
  let asyncFn2 = function(i) {
    return new Task(function(rej, res) {
      setTimeout(function() {
        res(i)
      }, 1000)
    })
  }
  let tasks = Task.of(renderPage)
    .ap(asyncFn1(1))
    .ap(asyncFn2(2))
  // tasks = liftA2(renderPage, asyncFn1(3), asyncFn2(4))

  // tasks.fork(console.log, console.log)

  let createUser = curry(function(email, name) {
    console.log(email)
    console.log(name)
  })

  let checkEmail = function(user) {
    return user.email ? Right.of(user.email) : Left.of('error')
  }
  let checkName = function(user) {
    return user.name ? Right.of(user.name) : Left.of('error')
  }
  let user = { email: 'email', name: 'name' }

  // Either.of(createUser).ap(checkEmail(user)).ap(checkName(user))
  // liftA2(createUser, checkEmail(user), checkName(user))

  let tOfM = compose(
    Task.of,
    Maybe.of
  )

  let xsx = liftA2(R.concat, tOfM('Rainy Days and Mondays'), tOfM(' always get me down'))

  let v = Maybe.of('Pillow Pets')
  // console.log(Maybe.of(R.identity).ap(v))

  // console.log(Either.of(R.toUpper).ap(Either.of("oreos")))
  // console.log(Either.of(R.toUpper("oreos")))
})
