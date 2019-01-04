import { R, log, curry, compose, trace } from "./util"
import { carData, postData } from "./data"
import moment from "moment"

let getDataByKeys = curry(function(key) { return compose(R.map(R.prop(key))) })

let getDollarValues = getDataByKeys("dollar_value")
let getNames = getDataByKeys("name")
let getHorsepowers = getDataByKeys("horsepower")
let getInStocks = getDataByKeys("in_stock")

let sortByTime = curry(function(key) { return (a, b) => moment(a[key]) - moment(b[key]) })

let getIncompleteTaskSummaries = curry(name => {
  return compose(
    R.sortBy(R.prop("dueDate")),
    R.map(R.pick(["id", "dueDate", "title", "priority"])),
    R.filter(R.both(R.propEq("complete", false), R.propEq("username", name))),
    R.prop("tasks")
  )
})

let Punam = getIncompleteTaskSummaries("Punam")

var incomplete = R.filter(R.whereEq({ complete: false }))
var sortByDate = R.sortBy(R.prop('dueDate'))
var sortByDateDescend = R.compose(R.reverse, sortByDate)
var importantFields = R.project(['title', 'dueDate'])
var groupByUser = R.partition(R.prop('username'))
var activeByUser = R.compose(groupByUser, incomplete)
var topDataAllUsers = R.compose(R.map(R.compose(importantFields, R.take(5), sortByDateDescend)), activeByUser)

log("postData", topDataAllUsers(postData.tasks))

// complement
const isEven = x => x % 2 === 0
const isOdd = R.complement(isEven)
// console.log(R.find(isOdd, [1, 2, 3, 4]))

// Both/Either
const wasBornInCountry = person => person.birthCountry === OUR_COUNTRY
const wasNaturalized = person => Boolean(person.naturalizationDate)
const isOver18 = person => person.age >= 18
const isCitizen = R.either(wasBornInCountry, wasNaturalized)
const isEligibleToVote = R.both(isOver18, isCitizen)

// Pipelines/Compose
const multiply = (a, b) => a * b
const addOne = x => x + 1
const square = x => x * x
const operate = R.pipe(multiply, addOne, square)
const c_operate = R.pipe(square, addOne, multiply)
// console.log(operate(1, 2))

// placeholder
// 占位，后续可以继续传入参数
const threeArgs = curry((a, b, c) => { return a + b + c })
const middleArgumentLater = threeArgs('value for a', R.__, 'value for c')
// console.log(middleArgumentLater(" __yeah__ "))

// 算术 Immutability 是核心，即不改变原先的数据
// add subtract multiply divide
// + - * /
// 而 ++ -- 会改变原数据
// inc dec
// ++ --
// negate
// -num

// Comparison
// equals gte lte
// === >= <=
// gt lt
// > <
// isEmpty isNil
// 判断所给值是否是其所属类型的空置 判断是否是 null/undefined

// Logic
// both either complement 用于处理函数
// && || !
// and or not 用于处理数值

// Conditionals
// over 和 lenProp 配合食用
// assoc 浅复制 然后设置或覆盖对象
const incCount = R.ifElse(
  R.has('count'),
  R.over(R.lensProp("count"), R.inc),
  R.assoc('count', 1)
)

// console.log(incCount({}))
// console.log(incCount({ count: 1 }))

// constants
const forever21 = age => ifElse(gte(__, 21), always(21), inc)(age)
// T F
// () => true () => false

// identity
const alwaysDrivingAge = age => ifElse(lt(__, 16), always(16), identity)(age)

// when
const truncate = R.when(
  R.propSatisfies(R.gt(R.__, 10), 'length'),
  R.pipe(R.take(10), R.append('…'), R.join(''))
)
// console.log(truncate('12345'))
// console.log(truncate('0123456789ABC'))

// unless
let safeInc = R.unless(R.isNil, R.inc)
// console.log(safeInc(null))
// console.log(safeInc(1))

// cond
const fn = R.cond([
  [R.equals(0), R.always('water freezes at 0°C')],
  [R.equals(100), R.always('water boils at 100°C')],
  [R.T, temp => 'nothing special happens at ' + temp + '°C']
])
// console.log(fn(0))
// console.log(fn(50))
// console.log(fn(100))

const _forever21 = R.ifElse(R.gte(R.__, 21), R.always(21), R.inc)