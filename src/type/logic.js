// || && 值得注意的一些小点

/**
 * 在 js 中，会被判定为 false 有以下几种情况，这些值又被称为 falsy，意为其对应的 Boolean 值为 false
 * 值得注意的是，即使是一个 0 长度的数组，或者是没有属性和方法的空白对象 Object.create(null) 他们对应的 Boolean 也不为 false
 * https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy
 * 可以注意到前面使用了 !! 这可以强制对该值进行 Boolean 转换
 */

// console.log(!!0)
// console.log(!!'')
// console.log(!!"")
// console.log(!!false)
// console.log(!!undefined)
// console.log(!!null)
// console.log(!!NaN)
// console.log(!!document.all)
// // 并不是 false 喔
// console.log(!![])
// console.log(!!Object.create(null))

/**
 * ||
 * 如果 || 前的结果为 false，则输出 || 后面的值
 *  也可以这么理解，如果前面为 false 则执行后面的代码
 *  常见 let name = res.name || "noName"
 * 如果 || 前的结果为 true，则输出 || 前面的值
 */

// console.log(false || "Hello")
// console.log(undefined || "World")

// console.log("Hello" || false)
// console.log("World" || undefined)

/**
 * &&
 * 如果 && 前的结果为 false，则输出 && 前面的值
 * 如果 && 签的结果为 true，则输出 && 后面的值
 *  也可以这么理解，如果前面为真，则执行后面的代码
 *  常见 let res = flag && handleFn()
 */

// console.log(false && "Hello")
// console.log(undefined && "World")

// console.log("Hello" && false)
// console.log("World" && undefined)

/**
 * 来个简单的题目练练手
 */

// function foo(count) {
//   return count === 5 ? 1 : count === 10 ? 2 : count === 12 ? 3 : count === 15 ? 4 : 0;
// }

// function bar(count) {
//   return count === 5 && 1 || count === 10 && 2 || count === 12 && 3 || count === 15 && 4 || 0
// }

// console.log(foo(10));
// console.log(bar(10));

/**
 * 稍微改改题目
 */

// function foo(count) {
//   return count > 12 ? 4 : count > 10 ? 3 : count > 5 ? 2 : count > 0 ? 1 : 0;
// }

// function bar(count) {
//   return count > 12 && 4 || count > 10 && 3 || count > 5 && 2 || count > 0 && 1 || 0;
// }

// console.log(foo(10));
// console.log(bar(10));