import { R, log, curry, compose } from "./util"
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

console.log("Punam", Punam(postData))