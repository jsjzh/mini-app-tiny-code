/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-03-20 21:19:51
 * @LastEditTime: 2019-03-20 21:39:46
 * @Description: 这里会收集平时看到的面试题，并附上自己的解答，基本上都会补充上来源和说明还有示例
 */

/**
 * 来源：https://juejin.im/post/5c90f573e51d450a7d7dfc75
 *
 * 标题：特定语法匹配替换
 * 说明：匹配字符串中形如 =g文字文字= 的语法，并将相应部分转化为对应的标签文字文字
 * 示例：
 *  transform('=g1.18 进入开发='); // <g>1.18 进入开发</g>
 *  transform('=g1.23 联调(-1)=，=g1.25 发布(+1)=')；// <g>1.23 联调(-1)</g>，<g>1.25 发布(+1)</g>
 *  transform('1.25 发布')； // 1.25 发布
 * @param {String} str
 */
function transform(str) {
  return str.replace(/\=g(.+?)\=/g, $0 => $0.replace('=g', '<g>').replace('=', '</g>'))
}
// console.log(transform('=g1.23 联调(-1)='))
// console.log(transform('=g1.23 联调(-1)=，=g1.25 发布(+1)='))
// console.log(transform('1.25 发布'))

/**
 * 来源：https://juejin.im/post/5c90f573e51d450a7d7dfc75
 *
 * 标题：合并数组中相邻且重复的元素
 * 说明：请实现一个函数 merge，传入一个数组，合并数组中【相邻且重复】的元素
 * 示例：
 *  merge([3,2,2,4,5,5,6,2,1]); // 输出[3,2,4,5,6,2,1]
 *  merge([3,2,3]); // 输出[3,2,3]
 *  merge([2,2,3]); // 输出[2,3]
 */
function merge(arr) {
  for (let ind = 0; ind < arr.length; ind++) {
    if (arr[ind] === arr[ind + 1]) arr.splice(ind, 1)
  }
  return arr
}
// console.log(merge([3, 2, 2, 4, 5, 5, 6, 2, 1]))
// console.log(merge([3, 2, 3]))
// console.log(merge([2, 2, 3]))

/**
 * 来源：https://juejin.im/post/5c90f573e51d450a7d7dfc75
 *
 * 标题：函数组合运行
 * 说明：实现一个方法，可将多个函数方法按从左到右的方式组合运行
 * 示例：
 *  const add = x => x + 1
 *  const multiply = (x, y) => x * y
 *  const multiplyAdd = composeFunctions(multiply, add)
 *  multiplyAdd(3, 4) // 返回 13
 */
function composeFunctions(...args) {
  return function(...params) {
    for (let ind = 0; ind < args.length; ind++) {
      params = Array.isArray(params) ? args[ind].apply(null, params) : args[ind].call(null, params)
    }
    return params
  }
}
// const add = x => x + 1
// const multiply = (x, y) => x * y
// const multiplyAdd = composeFunctions(multiply, add)
// console.log(multiplyAdd(3, 4))
