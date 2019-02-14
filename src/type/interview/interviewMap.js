// 基本类型 null undefined boolean number string symbol

// NaN 属于 number 类型
// NaN 不等于自身
// console.log(typeof NaN)

// 对于基本类型来说，如果使用字面量的方式，则这个变量只是个字面量
// let a = 123
// 只有在不要的时候才会转换为对应的类型
// console.log(a.toString())

// typeof 只能用于判断除了 null 以外的基本类型
// 对于 null，typeof 会显示为 object
// >>> 因为在 JS 的最初版本中，使用的是 32 位系统，为了性能考虑使用低位存储了变量的类型信息，000 开头代表是对象，然而 null 表示为全零，所以将它错误的判断为 object。虽然现在的内部类型判断代码已经改变了，但是对于这个 Bug 却是一直流传下来。
// console.log(typeof null)

// typeof 所有可能的值
// const TYPEOFVALUES = ['number', 'string', 'undefined', 'boolean', 'symbol', 'object', 'function']

// 想要获取一个变量正确类型，可以通过 Object.prototype.toString.call(xxx)

// ----- 类型转换 -----
// 在条件判断中，除了 undefined null false NaN '' 0 -0
// 其他所有值都转为 true

// 对象在转换基本类型时，首先会调用 valueOf 然后调用 toString，并且这两个方法可以重写
// 还可以重写 Symbol.toPrimitive，该方法在转基本类型是调用优先级最高
// let a = {
//   valueOf() {
//     return 0
//   },
//   toString() {
//     return 1
//   },
//   [Symbol.toPrimitive]() {
//     return 2
//   }
// }
// console.log(a + 3)
// console.log(a + '3')

// 四则运算符
// 只有当加法运算时，其中一方是字符串类型，就会把另一个也转为字符串类型
// 并且会触发三种类型转换：将值转换为原始值，转换为数字，转换为字符串
// 其他运算只要其中乙方是数字，那么另一方就转为数字
// console.log([1, 2] + [2, 1])
// console.log([1, 2].toString() + [2, 1].toString())
// console.log(+'a')
// console.log(+'1')

// == 操作符 TODO
// let a = {
//   valueOf() {
//     return 123
//   }
// }
// console.log([].toString())
// console.log(Number(true))

// 比较运算符
// 如果是对象，就通过 toPrimitive 转换对象
// 如果是字符串，就通过 unicode 字符串索引来比较

