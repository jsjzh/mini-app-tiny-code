// 在 webpack.config.js 中配置了 alias
// 会自动解析 static 为 webpack.config.js 目录下的 utils.resolve("static")
import "static/css/normalize.css"
import "static/css/reset.css"
import "static/css/github-markdown.css"
import "./index.scss"

const app = document.getElementById("app")
app.innerHTML = require("./index.html")

// ------------- default -------------
// import "type/default/prototype"
// import "type/default/new"
// import "type/default/extends"
// import "type/default/class"
// import "type/default/functionClass"
// import "type/default/logic"
// import "type/default/string"
// import "type/default/array"
// import "type/default/regexp"
// import "type/default/OneWayLinkedList"
// import "type/default/TwoWayLinkedList"
// import "type/default/observable"

// import "type/default/another"
// ------------- plugin -------------
// import "plugin/cube"
// ------------- interview -------------
// import "type/interview/render"
// import "type/interview/twoSum"
// import "type/interview/reverse"
// import "type/interview/isPalindrome"
// import "type/interview/romanToInt"
// import "type/interview/longestCommonPrefix"
// import "type/interview/searchInsert"
// 还未解决
// import "type/interview/listToTree"
// import "type/interview/isValid"
// import "type/interview/maxSubArray"
// import "type/interview/addBinary"
// import "type/interview/climbStairs"
// ------------- functional -------------
// import "type/functional/functional_curry"
// import "type/functional/functional_compose"
// import "type/functional/functional_functor"
// import "type/functional/functional_monad"

import "type/functional/functional_example"
// ------------- end -------------

if (module.hot) {
  // console.log("------------------------ 天了噜 (╯‵□′)╯︵ 更新了 ------------------------")
  module.hot.accept()
}