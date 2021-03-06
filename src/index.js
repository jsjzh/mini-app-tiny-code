// 在 webpack.config.js 中配置了 alias
// 会自动解析 static 为 webpack.config.js 目录下的 utils.resolve("static")
import 'static/css/normalize.css'
import 'static/css/reset.css'
import 'static/css/github-markdown.css'
import './index.scss'

const app = document.getElementById('app')
app.innerHTML = require('./index.html')

// ------------- default -------------
// import 'type/default/prototype'
// import 'type/default/new'
// import 'type/default/extends'
// import 'type/default/class'
// import 'type/default/functionClass'
// import 'type/default/logic'
// import 'type/default/string'
// import 'type/default/array'
// import 'type/default/regexp'
// import 'type/default/OneWayLinkedList'
// import 'type/default/TwoWayLinkedList'
// import 'type/default/observable'

// import 'type/default/another'
// ------------- plugin -------------
// import 'plugin/cube'
// ------------- other -------------
// import 'type/other/render'
// import 'type/other/twoSum'
// import 'type/other/reverse'
// import 'type/other/isPalindrome'
// import 'type/other/romanToInt'
// import 'type/other/longestCommonPrefix'
// import 'type/other/searchInsert'
// 还未解决
// import 'type/other/listToTree'
// import 'type/other/isValid'
// import 'type/other/maxSubArray'
// import 'type/other/addBinary'
// import 'type/other/climbStairs'
// import 'type/other/interviewMap'

// ------------- functional -------------
// import 'type/functional/functional_curry'
// import 'type/functional/functional_compose'
// import 'type/functional/functional_functor'
// import 'type/functional/functional_monad'
// import 'type/functional/functional_applicative'
// import 'type/functional/functional_ramda'

// import 'type/functional/functional_example'

import 'type/interview'
import 'type/leetcode'
// ------------- end -------------

if (module.hot) {
  setTimeout(() => {
    console.log('------------------------ 天了噜 (╯‵□′)╯︵ 更新了 ------------------------')
  }, 0)
  module.hot.accept()
}
