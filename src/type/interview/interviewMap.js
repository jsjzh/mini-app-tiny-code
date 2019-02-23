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

// 原型 TODO

// new
// function create() {
//   let obj = new Object()
//   // 为什么要用这种方式而不是传参的方式，就是方便下面 apply 的时候获取其他参数
//   let Con = [].shift.call(arguments)
//   obj.__proto__ = Con.prototype
//   let result = Con.apply(obj, arguments)
//   return typeof result === 'object' ? result : obj
// }
// function Foo() {
//   this.name = 123
// }
// // let demo = new Foo()
// let demo = create(Foo)
// console.log(demo.name)

// function Foo() {
//   return this
// }
// Foo.getName = function() {}
// Foo.prototype.getName = function() {
//   console.log(2)
// }
// new Foo.getName()
// new Foo().getName()

// instanceof
// function _instanceof(left, right) {
//   let prototype = right.prototype
//   while (true) {
//     if (left === null) return false
//     if (prototype === left) return true
//     left = left.__proto__
//   }
// }
// _instanceof(Array, Object)

// 这个有点特殊，在 webpack 的环境下，兜底儿对象不再是 window，所以找不到 this.a
// 但是如果在浏览器环境下，this.a 就是 1
// function foo() {
//   console.log(this.a)
// }
// var a = 1
// foo()

// 当执行 JS 代码的时候，会产生三种执行上下文
// 全局执行上下文
// 函数执行上下文
// eval 执行上下文
// 每个执行上下文中有三个重要的属性
// 变量对象（VO），包含变量、函数声明和函数的形参，该属性只能在全局上下文中访问
// 作用域链（JS 采用词法作用域，也就是说变量的作用域是在定义时就决定了）
// this

// arguments 是函数独有的对象（箭头函数没有 arguments）
// arguments.callee 属性代表函数本身
// arguments.caller 属性代表函数的调用者

// 在生成执行上下文时，有两个阶段
// 第一个阶段
// 创建阶段，JS 解释器找出需要提升的变量和函数，给他们提前在内存中开辟好空间，如果是函数，会将整个函数存入内存，变量的话只声明并赋值为 undefined，相同函数会覆盖上一个函数，并且函数优于变量提升
// 第二个阶段
// 执行阶段，代码执行

// 临时死区
// 在用 let 的时候，若提前使用一个之后定义的变量，由于临时死区，就会报 referenceError 的错误，若使用 var 则会提示 undefined

// JS 解释器遇到非匿名的立即执行函数时，会创建一个辅助的特定对象，然后将函数名称作为这个对象的属性，因此函数内部才可以访问到 foo，但是这个值是只读的，对他的赋值不会生效
// var foo = 1
// ;(function foo() {
//   foo = 10
//   console.log(foo)
//   // f foo(){foo = 10;console.log(foo)}
// })()

// 闭包
// 一个函数内，使用了另一个函数的变量，这就叫闭包
// for (var i = 1; i <= 5; i++) {
//   setTimeout(function timer() {
//     console.log(i)
//   }, 10)
// }

// 浅拷贝
// let a = { age: 1 }
// let b = Object.assign({}, a)
// // 或者
// let bb = { ...a }

// 深拷贝
// let a = { age: 1, jobs: { first: 2 } }
// let b = JSON.parse(JSON.stringify(a))
// 但是该方法也有局限性
// 会忽略 undefined
// 会忽略 symbol
// 会忽略 函数
// 不能解决循环引用的对象
// let obj = {
//   a: 1,
//   b: {
//     c: 2,
//     d: 3
//   }
// }
// obj.c = obj.b
// obj.e = obj.a
// obj.b.c = obj.c
// obj.b.d = obj.b
// obj.b.e = obj.b.c
// let newObj = JSON.parse(JSON.stringify(obj))
// console.log(newObj)
// 深拷贝 MessageChannel
// 该方法为异步，可以解决 undefined 和循环引用对象，但是不能解决 Symbol 和函数
// function structuralClone(obj) {
//   return new Promise(resolve => {
//     const { port1, port2 } = new MessageChannel()
//     port2.onmessage = ev => resolve(ev.data)
//     port1.postMessage(obj)
//   })
// }
// let obj = { a: 1, b: { c: 2, d: 3 } }
// obj.c = obj.b
// obj.e = obj.a
// obj.b.c = obj.c
// obj.b.d = obj.b
// obj.b.e = obj.b.c
// ;(async () => {
//   const clone = await structuralClone(obj)
//   console.log(clone)
// })()

// 模块化 ES6 目前不支持，但已有提案
// 在有 babel 的情况下，可以直接使用 ES6 的 export 和 import
// // file a.js
// export function a() {}
// export function b() {}
// // file b.js
// export default function() {}
// // file c.js
// import { a, b } from 'a.js'
// import XXX from 'b.js'
// 模块化 CommonJS 支持动态导入 require(${path}/xx.js)
// // file a.js
// module.exports = { a: 1 }
// exports.b = 2
// let foo = require('a.js')
// foo.a // 1
// foo.b // 2
// 两个模块化的区别
// 前者支持动态导入，也就是 require(${path}/xx.js)，后者目前不支持，但是已有提案
// 前者是同步导入，因为用于服务端，文件都在本地，同步导入即使卡住主线程影响也不大。而后者是异步导入，因为用于浏览器，需要下载文件，如果也采用同步导入会对渲染有很大影响
// 前者在导出时都是值拷贝，就算导出的值变了，导入的值也不会改变，所以如果想更新值，必须重新导入一次。但是后者采用实时绑定的方式，导入导出的值都指向同一个内存地址，所以导入值会跟随导出值变化
// 后者会编译成 require/exports 来执行的

// simple 防抖
// function debounce(func, wait = 50) {
//   let timer = 0
//   return function() {
//     if (timer) clearTimeout(timer)
//     timer = setTimeout(() => {
//       func()
//     }, wait)
//   }
// }
// complete 防抖
// function debounce(func, wait = 50, immediate = true) {
//   let timer
//   return function() {
//     if (!timer) {
//       timer = setTimeout(() => {
//         timer = null
//         if (!immediate) {
//           func()
//         }
//       }, wait)
//       if (immediate) {
//         func()
//       }
//     } else {
//       clearTimeout(timer)
//       timer = setTimeout(() => {
//         timer = null
//         if (!immediate) {
//           func()
//         }
//       }, wait)
//     }
//   }
// }

// TODO 节流
// function _now() {
//   return +new Date()
// }
// function throttle(func, wait, options) {
//   let context, args, result
//   let timeout = null
//   let previous = 0
//   if (!options) options = {}
//   let later = function() {
//     previous = options.leading === false ? 0 : _now()
//     timeout = null
//     result = func.apply(context, args)
//     if (!timeout) context = args = null
//   }
//   return function() {
//     let now = _now()
//     if (!previous && options.leading === false) previous = now
//     let remaining = wait - (now - previous)
//     context = this
//     args = arguments
//     if (remaining <= 0 || remaining > wait) {
//       if (timeout) {
//         clearTimeout(timeout)
//         timeout = null
//       }
//       previous = now
//       result = func.apply(context, args)
//       if (!timeout) context = args = null
//     } else if (!timeout && options.trailing !== false) {
//       timeout = setTimeout(later, remaining)
//     }
//     return result
//   }
// }
// let foo = throttle(function() {
//   console.log('click')
// }, 2000)
// let app = document.querySelector('#app')
// app.addEventListener('click', foo)

// 继承
// function Super() {
//   this.name = 'demo'
// }
// Super.prototype.getNumber = function() {
//   return 1
// }
// function Sub(...args) {
//   Super.apply(this, args)
// }
// Sub.prototype = Super.prototype
// Sub.prototype.constructor = Sub
// let su = new Super()
// let s = new Sub()

// TODO Promise
// const PENDING = 'pending'
// const RESOLVED = 'resolved'
// const REJECTED = 'rejected'
// function MyPromise(fn) {
//   let _this = this
//   _this.currentState = PENDING
//   _this.value = undefined
//   _this.resolvedCallbacks = []
//   _this.rejectedCallbacks = []

//   _this.resolve = function(value) {
//     if (value instanceof MyPromise) {
//       return value.then(_this.resolve, _this.reject)
//     }
//     setTimeout(() => {
//       if (_this.currentState === PENDING) {
//         _this.currentState = RESOLVED
//         _this.value = value
//         _this.resolvedCallbacks.forEach(cb => cb())
//       }
//     })
//   }

//   _this.reject = function(reason) {
//     setTimeout(() => {
//       if (_this.currentState === PENDING) {
//         _this.currentState = REJECTED
//         _this.value = reason
//         _this.rejectedCallbacks.forEach(cb => cb())
//       }
//     })
//   }

//   try {
//     fn(_this.resolve, _this.reject)
//   } catch (e) {
//     _this.reject(e)
//   }
// }

// MyPromise.prototype.then = function(onResolved, onRejected) {
//   var self = this
//   var promise2
//   onResolved = typeof onResolved === 'function' ? onResolved : v => v
//   onRejected =
//     typeof onRejected === 'function'
//       ? onRejected
//       : r => {
//           throw r
//         }

//   if (self.currentState === RESOLVED) {
//     return (promise2 = new MyPromise(function(resolve, reject) {
//       setTimeout(function() {
//         try {
//           var x = onResolved(self.value)
//           resolutionProcedure(promise2, x, resolve, reject)
//         } catch (reason) {
//           reject(reason)
//         }
//       })
//     }))
//   }

//   if (self.currentState === REJECTED) {
//     return (promise2 = new MyPromise(function(resolve, reject) {
//       setTimeout(function() {
//         try {
//           var x = onRejected(self.value)
//           resolutionProcedure(promise2, x, resolve, reject)
//         } catch (reason) {
//           reject(reason)
//         }
//       })
//     }))
//   }

//   if (self.currentState === PENDING) {
//     return (promise2 = new MyPromise(function(resolve, reject) {
//       self.resolvedCallbacks.push(function() {
//         try {
//           var x = onResolved(self.value)
//           resolutionProcedure(promise2, x, resolve, reject)
//         } catch (r) {
//           reject(r)
//         }
//       })

//       self.rejectedCallbacks.push(function() {
//         try {
//           var x = onRejected(self.value)
//           resolutionProcedure(promise2, x, resolve, reject)
//         } catch (r) {
//           reject(r)
//         }
//       })
//     }))
//   }
// }
// function resolutionProcedure(promise2, x, resolve, reject) {
//   if (promise2 === x) {
//     return reject(new TypeError('Error'))
//   }
//   if (x instanceof MyPromise) {
//     if (x.currentState === PENDING) {
//       x.then(function(value) {
//         resolutionProcedure(promise2, value, resolve, reject)
//       }, reject)
//     } else {
//       x.then(resolve, reject)
//     }
//     return
//   }
//   let called = false
//   if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
//     try {
//       let then = x.then
//       if (typeof then === 'function') {
//         then.call(
//           x,
//           y => {
//             if (called) return
//             called = true
//             resolutionProcedure(promise2, y, resolve, reject)
//           },
//           e => {
//             if (called) return
//             called = true
//             reject(e)
//           }
//         )
//       } else {
//         resolve(x)
//       }
//     } catch (e) {
//       if (called) return
//       called = true
//       reject(e)
//     }
//   } else {
//     resolve(x)
//   }
// }

// let foo = {
//   a: { name: 'a' },
//   b: { name: 'b' },
//   c: { name: 'c' },
//   d: { name: 'd' },
//   e: { name: 'e' },
//   f: { name: 'f' }
// }
// let bar = [{ name: 'a' }, { name: 'b' }, { name: 'c' }, { name: 'd' }, { name: 'e' }, { name: 'f' }]
// let deno = [['a', 1], ['b', 2], ['c', 3]]
// let demo = new Set([1, 2, 3])
// let iterable = new Map([['a', 1], ['b', 2], ['c', 3]])
// function* func() {
//   yield function() {
//     123
//   }
//   yield function() {
//     321
//   }
// }
// 生成器不能重用
// 一个生成器函数
// let fibonacci = (function*() {
//   let [prev, curr] = [0, 1]
//   while (true) {
//     ;[prev, curr] = [curr, prev + curr]
//     yield curr
//   }
// })()
// console.log(fibonacci)
// for (let n of fibonacci) {
//   console.log(n)
//   // 当n大于1000时跳出循环
//   if (n >= 1000) break
// }
// console.log(fibonacci)
// for (let n of fibonacci) {
//   console.log(n)
//   // 当n大于1000时跳出循环
//   if (n >= 1000) break
// }
// let _iterable = {
//   [Symbol.iterator]() {
//     return {
//       i: 0,
//       next() {
//         if (this.i < 3) {
//           return { value: this.i++, done: false }
//         }
//         return { value: undefined, done: true }
//       }
//     }
//   }
// }
// for (let value of _iterable) {
//   console.log(value);
// }
// for in 不能使用 return
// break || throw == return
// continue == continue
// 遍历一个对象的可枚举属性 enumerable
// 不能遍历 Symbol
// Array Object String arguments
// index key index index
// for (const key in bar) {
//   console.log(key)
// }

// for of 不能使用 return
// break || throw == return
// continue == continue
// 在可迭代对象上创建一个迭代循环
// Array Map Set String TypeedArray arguments Generator NodeList
// for (const key of demo) {
//   console.log(key)
// }

// 添加一个 class
// classList.add('read')

// JSONP
// 只限于 get 请求
// function jsonp(url, jsonpCallback, success) {
//   let script = document.createElement('script')
//   script.src = url
//   script.async = true
//   script.type = 'text/javascript'
//   window[jsonpCallback] = function(data) {
//     success && success(data)
//   }
//   document.body.appendChild(script)
// }
// jsonp('http://xxx', 'callback', function(value) {
//   console.log(value)
// })

// CORS
// 需要浏览器和后端同时支持，IE 8 和 9 需要通过 XDomainRequest 来实现
// 服务端设置 Access-Control-Allow-Origin 就可以开启 CORS

// document.domain
// a.test.com b.test.com
// document.domain = 'test.com' 表示二级域名都相同就可以实现跨域

// postMessage
// 通常用于获取潜入页面中国你的第三方页面数据，一个页面发送消息，一个页面判断来源并接受消息
// 发送消息端
// window.parent.postMessage('message', 'http://test.com')
// // 接收消息端
// var mc = new MessageChannel()
// mc.addEventListener('message', event => {
//   var origin = event.origin || event.originalEvent.origin
//   if (origin === 'http://test.com') {
//     console.log('验证通过')
//   }
// })

// Event Loop
// JS 在执行的过程中，会产生执行环境，这些执行环境会被顺序的加入到执行栈中
// 如果遇到异步的代码，会被挂起并加入到 Task 队列中
// 一旦执行栈为空 Event Loop 就会从 Task 队列中拿出需要执行的代码放到执行栈中执行
// 所以本质上来说 JS 中的异步还是同步行为
// 顺序
// 执行同步任务，这属于宏任务
// 执行栈为空，查询是否有微任务需要执行
// 执行所有微任务
// 必要的话渲染 UI
// 然后开始下一轮 Event Loop，执行宏任务中的异步代码

// Task
// 不同的任务源会被分配到不同的 Task 队列中
// 任务源分为 微任务（microtask） 和 宏任务（macrotask）
// 微任务 process.nextTick promise Object.observe MutationObserver
// 宏任务 script setTimeout setInterval setImmediate I/O UI-rendering
// console.log('1script start')
// setTimeout(function() {
//   console.log('6setTimeout')
// }, 0)
// new Promise(resolve => {
//   console.log('2Promise')
//   resolve()
// })
//   .then(function() {
//     console.log('4promise1')
//   })
//   .then(function() {
//     console.log('5promise2')
//   })
// console.log('3script end')

// TODO nodeJs 中的 Event Loop

// 存储
// cookie 一般由服务器生成，可以设置过期时间 4K 每次都会携带在 header 中，对于请求性能影响
// localStorage 除非被清理，否则一直在 5M 无
// sessionStorage 页面关闭就清理 5M 无
// indexDB 除非被清理，否则一直在 无限 无

// cookie
// value 如果用于保存用户登陆态，应该将值加密
// http-only 不能通过 JS 访问 cookie，减少 XSS 攻击
// secure 只能在协议为 HTTPS 的请求中携带
// same-site 规定浏览器不能再跨域请求中携带 cookie，减少 CSRF 攻击

// TODO Service Worker

// 渲染机制 - 1
// 处理 HTML 并构建 DOM 树
// 处理 CSS 并构建 CSSOM 树
// 将 DOM 与 CSSOM 合并成一个渲染树
// 根据渲染树来布局，计算每个节点的位置
// 调用 GPU 绘制，合成图层，显示在屏幕上

// 渲染机制 - 2
// 在构建 CSSOM 树时，会阻塞渲染，直至 CSSOM 树构建完成
// 并且构建 CSSOM 树是一个十分消耗性能的过程
// 应该尽量保持层级扁平，减少过渡层叠，越是具体的 CSS 选择器，执行速度越慢

// 渲染机制 - 3
// 当 HTML 解析到 script 标签，会暂停构建 DOM，完成后才会从暂停的地方重新开始
// 也就是说，如果想首屏渲染的快，就不应该在首屏就加载 JS 文件
// 并且，CSS 也会影响 JS 的执行，只有当解析完样式表才会执行 JS

// Load 和 DOMContentLoaded 区别
// Load 表示 DOM CSS JS 图片已经全部加载完毕
// DOMContentLoaded 表示初始的 HTML 被完全加载和解析，不需要等待 CSS JS 图片加载

// 图层
// 一般来说，可以把普通文档流看成一个图层，特定的属性可以生成一个新图层
// 不同的图层渲染互不影响
// 对一些需要频繁需然的可以单独生成一个新图层，以此提高性能
// 生成新图层
// 3D 变换：translate3d translateZ
// will-change
// video iframe 标签
// 通过动画实现的 opacity 动画转换
// position: fixed

// 重绘（Repaint）和回流（Reflow）- 1
// 重绘：当节点需要更改外观而不会影响布局的，比如改变 color
// 回流：布局或者几何属性需要改变
// 回流必定会发生重绘，重绘不一定会引发回流
// 回流所需的成本比重绘高的多，改变深层次的节点很可能导致父节点的一系列回流

// 重绘（Repaint）和回流（Reflow）- 2
// 可能会导致性能问题
// 改变 window 大小
// 改变字体
// 添加或删除样式
// 文字改变
// 定位或者浮动
// 盒模型

// 重绘（Repaint）和回流（Reflow）- 3
// 当 Event Loop 执行完 microtask 后，会判断 document 是否需要更新，因为浏览器是 60hz 的刷新率，每 16ms 才会更新一次
// 然后判断是否有 resize 或者 scroll，有的话去触发事件，所以 resize 和 scroll 事件也是至少 16ms 才会触发一次，并且自带节流（throttle）功能
// 判断是否触发了 media query
// 更新动画并且发送事件
// 判断是否有全屏操作事件
// 执行 requestAnimationFrame 回调
// 执行 IntersectionObserver 回调，该方法用于判断元素是否可见，可以用于懒加载上，但是兼容性不好
// 更新界面
// 以上就是一帧中可能会做的事情，如果在一帧中有空闲时间，就会去执行 requestIdleCallback 回调

// 重绘（Repaint）和回流（Reflow）- 4
// 减少重绘和回流
// 使用 translate 替代 top
//    dom.style.top = ... 会引起回流
// 使用 visibility 替换 display: none
//    因为前者只会引起重绘，后者会引发回流（改变了布局）
// 把 DOM 离线后修改
//    比如，先把 DOM 给 display: none（有一次 Reflow），然后修改个 100 次，再显示出来
// 不要把 DOM 节点的属性值放在一个循环里当成循环里的变量
//    循环里重复获取 offsetTop 会导致回流，因为需要去获取正确的值
// 不要使用 table 布局，可能很小的一个改动会造成整个 table 的重新布局
// 动画实现的速度的选择，动画速度越快，回流次数越多，也可以选择使用 requestAnimationFrame
// CSS 选择符从右往左匹配查找，避免 DOM 深度过深
// 将频繁运行的动画变为图层，图层能够阻止该节点回流影响别的元素
//    比如对于 video 标签，浏览器会自动将该节点变为图层

// DNS 预解析
// <link rel="dns-prefetch" href="//yuchengkai.cn" />

// 缓存
// 浏览器缓存策略分为：强缓存 和 协商缓存

// 缓存 - 强缓存
// 强缓存表示在缓存期间不需要请求，state code 为 200
// 实现强缓存可以通过两种响应头：Expires 和 Cache-Control

// ↓ 缓存 - 强缓存 - Expires: Wed, 22 Oct 2018 08:41:00 GMT
// Expires 是 http/1.0 的产物，表示资源会在何时后过期，需要再次请求
// 为此，其受限于本地时间，如果修改了本地时间，可能会造成缓存丢失

// ↑ 缓存 - 强缓存 - Cache-control: max-age=30
// Cache-Control 出现于 http/1.1 优先级高于 Expires
// 该属性表示资源会在多少秒后过期，需要再次请求

// 缓存 - 协商缓存
// 如果缓存过期了，我们可以使用协商缓存来解决问题
// 协商缓存需要请求，如果缓存有效 state code 为 304
// 协商缓存需要客户端和服务端共同实现

// ↓ 缓存 - 协商缓存 - Last-Modified 和 If-Modified-Since
// Last-Modified 表示本地文件最后修改日期，If-Modified-Since 会将 Last-Modified 的值发送给服务器
// 询问服务器在该日期后资源是否有更新，有更新的话就会将新的资源发送回来
// 但是如果在本地打开缓存文件，就会造成 Last-Modified 被修改，所以在 http/1.1 出现了 ETag

// ↑ 缓存 - 协商缓存 - ETag 和 If-None-Match
// ETag 类似于文件指纹，If-None-Match 会将当前 ETag 发送给服务器，询问该资源 ETag 是否变动
// 有变动的话就将新的资源发送回来
// 并且 ETag 优先级比 Last-Modified 高

// 缓存策略
// 对于某些不需要缓存的资源，可以使用 Cache-control: no-store，表示该资源不需要缓存
// 对于频繁变动的资源，可以使用 Cache-control: no-cache 并配合 ETag 使用，表示该资源已被缓存，但是每次都会发送请求询问资源是否更新
// 对于代码文件来说，通常使用 Cache-control: max-age=xxxxxx 并配合策略缓存使用，然后对文件进行指纹处理，一旦文件名变动就会立刻下载新的文件

// 使用 http/2.0 加速
// 因为浏览器有并发请求限制，在 http/1.1 时代，每个请求都要建立和断开，消耗了好几个 RTT 时间
// 并且由于 TCP 慢启动的原因，加载体积大的文件会需要更多的时间
// 在 http/2.0 中引入了多路复用，能够让多个请求使用同一个 tcp 链接
// 加快了网页的加载速度，并且还支持 header 压缩，进一步减少了请求的数据大小

// 使用预加载
// 有些资源不需要马上用到，但是希望尽早获取，这时候可以用预加载
// 预加载其实是声明式的 fetch，强制浏览器请求资源，并且不会阻塞 onload 事件
// <link rel="preload" href="http://example.com" />
// <link rel="preload" href="/docs/assets/css/0.styles.fc460d35.css" as="style">
// <link rel="preload" href="/docs/assets/js/app.37710be5.js" as="script">
// 预加载可以一定程度上降低首屏的加载时间，缺点就是兼容性不好

// 使用预渲染
// 可以通过预渲染将下载的文件预先在后台渲染
// <link rel="prerender" href="http://example.com" />
// 预渲染虽然可以提高页面的加载速度，但是要确保该页面会被使用，否就就是浪费资源去渲染

// 懒执行
// 将某些逻辑延迟到使用时再计算。一般通过定时器或者事件来唤醒

// 懒加载
// 原理就是只加载自定义区域（通常是可视区域，但也可以是即将进入可视区域）内需要加载的东西

// 图片优化
// 图片大小计算，对于一个 100 * 100 像素的图片来说，图像上有 10^4 个像素点，如果每个像素的值是 RGBA 存储的话，那么每个像素就有 4 个通道，每个通道 1 个字节（8 位 = 1 个字节），所以图片大概为 10^4 * 4 / 1024 kb
// 那么优化就是两个思路，减少像素点；减少每个像素点能够显示的颜色

// 图片加载优化
// 修饰类图片使用 CSS 代替
// 图片使用 CDN 加载，计算出适配屏幕的宽度，然后去请求相应裁剪好的图片
// 小图使用 base64 格式
// 将多个图标文件整合到一张图片中（雪碧图）
// 选择正确的图片格式
//    能够使用 WebP 格式的浏览器尽量使用，有更好的图片压缩算法，能带来更小的图片体积，缺点就是兼容性不好
//    小图使用 PNG，其实对于图标类图片，可以使用 SVG 代替
//    照片使用 JPEG

// 其他文件优化
// CSS 文件放在 head 中
// 服务端开启文件压缩功能 gzip
// 将 script 标签放在 body 底部，因为 JS 文件执行会阻塞渲染，也可以将 script 标签放在任意位置然后加上 defer，表示该文件会并行下载，但是会放到 HTML 解析完成后顺序执行。
// 对于么有任何依赖的 JS 文件可以加上 async，表示加载和渲染文档元素的过程将和 JS 文件的加载与执行并行无序进行
// 执行 JS 代码过长会卡住渲染，对于需要很多时间计算的代码可以考虑使用 Webworker，Webworker 可以让我们另开一个线程执行脚本而不影响渲染

// CDN
// 静态资源尽量使用 CDN 加载，由于浏览器对于单个域名有并发请求上限，可以考虑使用多个 CDN 域名。对于 CDN 加载静态资源需要注意 CDN 域名要与主站不同，否则每次请求都会带上主站的 cookie

// 使用 Webpack
// 对于 Webpack4，打包项目使用 production 模式
// 使用 ES6 模块来开启 tree shaking，这个技术可以移除没有使用的代码
// 优化图片，对于小图可以使用 base64 的方式
// 按照路由拆分代码，实现按需加载
// 给打包出来的文件名添加哈希，实现浏览器缓存文件

// 监控
// 对于代码运行错误，通常的办法是使用 window.onerror 拦截报错，但是有一些例外
//    对于跨域的代码运行错误会显示 script error，对于这种情况要给 script 标签添加 crossorigin 属性
//    对于某些浏览器可能不会显示调用栈信息，这种情况可以通过 arguments.callee.caller 来做栈递归
// 对于异步代码，可以使用 catch 的方式捕获错误，Promise 可以使用 catch，async await 可以使用 try catch
// 对于捕获的错误需要上传给服务器，通常可以通过 img 标签的 src 发起一个请求

// 渲染几万条数据并不卡住界面
// let ulBox = document.querySelector('.ul-box')
// let total = 1000
// let chunk = 20
// let start = 0
// let count = 1
// function addDom() {
//   // 有点类似于 Vue 的 template
//   let fragment = document.createDocumentFragment()
//   for (let index = 0; index < chunk; index++) {
//     let li = document.createElement('li')
//     li.innerHTML = count
//     count++
//     if (start * chunk + index === total) {
//       break
//     }
//     fragment.appendChild(li)
//   }
//   ulBox.appendChild(fragment)
//   if (start * chunk < total) {
//     start++
//     loop()
//   }
// }
// function loop() {
//   requestAnimationFrame(function() {
//     addDom()
//   })
// }
// loop()

// Object Vue 双向绑定订阅发布
// class Dep {
//   constructor() {
//     this.subs = []
//   }
//   addSub(sub) {
//     this.subs.push(sub)
//   }
//   notify() {
//     this.subs.forEach(sub => {
//       sub.update()
//     })
//   }
// }
// Dep.target = null
// class Watcher {
//   constructor(obj, key, cb) {
//     Dep.target = this
//     this.cb = cb
//     this.obj = obj
//     this.key = key
//     // 假装获取 val 然后借此触发 get
//     this.value = obj[key]
//     Dep.target = null
//   }
//   update() {
//     this.value = this.obj[this.key]
//     this.cb(this.value)
//   }
// }
// function update(value) {
//   console.log(`数据更新：${value}`)
// }
// function observe(obj) {
//   if (!obj || typeof obj !== 'object') {
//     return
//   }
//   Object.keys(obj).forEach(key => {
//     defineReactive(obj, key, obj[key])
//   })
// }
// function defineReactive(obj, key, val) {
//   observe(val)
//   let dp = new Dep()
//   Object.defineProperty(obj, key, {
//     enumerable: true,
//     configurable: true,
//     get: function() {
//       // console.log('get')
//       // 这里过滤掉了不少的会进入此的方法
//       if (Dep.target) {
//         dp.addSub(Dep.target)
//       }
//       return val
//     },
//     set: function(newVal) {
//       // console.log('set')
//       val = newVal
//       dp.notify()
//     }
//   })
// }
// var data = { name: '123' }
// observe(data)
// new Watcher(data, 'name', update)
// data.name = 'king'

// Proxy 实现双向绑定
// function watcher(obj, setBind, getLogger) {
//   return new Proxy(obj, {
//     get: function(target, property, receiver) {
//       getLogger(target, property)
//       return Reflect.get(target, property, receiver)
//     },
//     set: function(target, property, value, receiver) {
//       setBind(target, property, value)
//       return Reflect.set(target, property, value)
//     }
//   })
// }
// let obj = { a: [123] }
// let p = watcher(
//   obj,
//   (target, property, value) => {
//     console.log(`Set '${property}' = ${target[property]} to ${value}`)
//   },
//   (target, property) => {
//     console.log(`Get '${property}' = ${target[property]}`)
//   }
// )
// p.a = [123, 123, 123]
// p.a

// Vue 技术要点：双向绑定 订阅发布者模式 虚拟 Dom

// 路由原理
// hash 模式
// 点击链接之后，会触发 hashchange 事件，此时解析路由规则，跳转页面（实则是 DOM 替换的方式更改页面内容）
// 手动刷新之后，不会向服务器发起请求，但是也不会触发 hashchange 事件了，可以通过 load 事件
// history 模式
// 浏览器动作，回退，或者 history.back()，触发 popstate 事件，跳转页面（实则 DOM 替换）
// 点击跳转，调用 HTML5 的新的 API，pushState 函数向浏览器历史添加了一个状态，并且不会向服务器发送请求
// 手动刷新，这个时候会像服务器请求，但往往服务器没有对应的文件，比如 http://test.com/demo，没有 demo 这个文件，所以需要后端配合把资源未找到全部重定向到 index 页面，然后 index 页面会解析 url，进行页面跳转（DOM 更替）

// TODO Virtual Dom
// let $$key = 1
// class Element {
//   constructor(tag = 'div', props = {}, children = null, key) {
//     this.tag = tag
//     this.props = props
//     if (Array.isArray(children)) {
//       this.children = children
//     } else if (typeof children === 'string') {
//       this.key = children
//       this.children = null
//     }
//     this.key = key ? key : $$key
//     $$key++
//   }
//   render() {
//     let root = this.createElement(this.tag, this.props, this.children, this.key)
//     document.body.appendChild(root)
//     return root
//   }
//   create() {
//     return this.createElement(this.tag, this.props, this.children, this.key)
//   }
//   createElement(tag, props, child, key) {
//     let el = document.createElement(tag)
//     for (const key in props) {
//       if (props.hasOwnProperty(key)) {
//         const value = props[key]
//         el.setAttribute(key, value)
//       }
//     }
//     if (key) {
//       el.setAttribute('key', key)
//     }
//     if (child) {
//       child.forEach(element => {
//         let node
//         if (element instanceof Element) {
//           node = this.createElement(element.tag, element.props, element.children, element.key)
//         } else {
//           node = document.createTextNode(element)
//         }
//         el.appendChild(node)
//       })
//     }
//     return el
//   }
// }
// function diff(oldTreeDom, newTreeDom) {
//   let paths = {}
//   dfs(oldTreeDom, newTreeDom, 0, paths)
//   return paths
// }
// function dfs(oldNode, newNode, index, paths) {
//   let curPaths = []
//   // 需要判断三种情况
//   // 1.没有新的节点，那么什么都不用做
//   // 2.新的节点的 tagName 和 `key` 和旧的不同，就替换
//   // 3.新的节点的 tagName 和 key（可能都没有） 和旧的相同，开始遍历子树
//   if (!newNode) {
//     // do nothing
//   } else if (newNode.tag === oldNode.tag && newNode.key === oldNode.key) {
//     let props = diffProps(oldNode.props, newNode.props)
//     if (props.length) {
//       curPaths.push({ type: 'changeProps', props })
//     }
//     diffChildren(oldNode.children, newNode.children, index, paths)
//   } else {
//     curPaths.push({ type: 'replace', node: newNode })
//   }
//   if (curPaths.length) {
//     if (paths[index]) {
//       paths[index] = paths[index].concat(curPaths)
//     } else {
//       paths[index] = curPaths
//     }
//   }
// }
// function diffProps(oldProps, newProps) {
//   // 判断 Props 三步骤
//   let change = []
//   // 先遍历 oldProps 查看是否存在删除的属性
//   for (const key in oldProps) {
//     if (oldProps.hasOwnProperty(key) && !newProps[key]) {
//       change.push({
//         prop: key
//       })
//     }
//   }
//   // 然后遍历 newProps 查看是否有属性值被修改
//   // 最后查看是否有属性新增
//   for (const key in newProps) {
//     if (newProps.hasOwnProperty(key)) {
//       const prop = newProps[key]
//       const oldProp = oldProps[key]
//       if (oldProp && oldProp !== prop) {
//         change.push({
//           prop: key,
//           value: prop
//         })
//       } else if (!oldProp) {
//         change.push({
//           prop: key,
//           value: prop
//         })
//       }
//     }
//   }
//   return change
// }
// function listDiff(oldList, newList, index, paths) {
//   // 为了遍历方便，先取出两个 list 的所有 keys
//   let oldKeys = getKeys(oldList)
//   let newKeys = getKeys(newList)
//   let change = []
//   // 用于保存变更后的节点数据
//   // 使用该数组保存有以下好处
//   // 1.可以正确获得被删除节点索引
//   // 2.交换节点位置只需要操作一遍 DOM
//   // 3.用于 `diffChildren` 函数中的判断，只需要遍历
//   // 两个树中都存在的节点，而对于新增或者删除的节点来说，完全没必要
//   // 再去判断一遍
//   let list = []
//   if (oldList) {
//     oldList.forEach(item => {
//       let key = item.key
//       if (typeof item === 'string') {
//         key = item
//       }
//       if (newKeys.indexOf(key) === -1) {
//         list.push(null)
//       } else {
//         list.push(key)
//       }
//     })
//     let length = list.length
//     for (let i = length - 1; i >= 0; i--) {
//       if (!list[i]) {
//         list.splice(i, 1)
//         change.push({
//           type: 'remove',
//           index: i
//         })
//       }
//     }
//   }
//   if (newList) {
//     newList.forEach((item, i) => {
//       let key = item.key
//       if (typeof item === 'string') {
//         key = item
//       }
//       let _index = oldKeys.indexOf(key)
//       if (_index === -1) {
//         change.push({
//           type: 'insert',
//           node: item,
//           index: i
//         })
//         list.splice(i, 0, key)
//       } else {
//         if (_index !== i) {
//           change.push({
//             type: 'move',
//             from: index,
//             to: i
//           })
//           // TODO
//           // move(list, index, i)
//         }
//       }
//     })
//   }
//   return { change, list }
// }
// function getKeys(list) {
//   let keys = []
//   if (list) {
//     list.forEach(item => {
//       let key
//       if (typeof item === 'string') {
//         key = [item]
//       } else if (item instanceof Element) {
//         key = item.key
//       }
//       keys.push(key)
//     })
//   }
//   return keys
// }
// function diffChildren(oldChild, newChild, index, paths) {
//   let { change, list } = listDiff(oldChild, newChild, index, paths)
//   if (change.length) {
//     if (paths[index]) {
//       paths[index] = paths[index].concat(change)
//     } else {
//       paths[index] = change
//     }
//   }
//   // 记录上一个遍历过的节点
//   let last = null
//   if (oldChild) {
//     oldChild.forEach(item => {
//       let child = item && item.children
//       if (child) {
//         // debugger
//         index = last && last.children ? index + last.children.length + 1 : index + 1
//         let keyIndex = list.indexOf(item.key)
//         let node = newChild[keyIndex]
//         // 只遍历新旧中都存在的节点，其他新增或者删除的没必要遍历
//         if (node) {
//           dfs(item, node, index, paths)
//         }
//       } else index += 1
//       last = item
//     })
//   }
// }
// let test7 = new Element('div', { class: 'test7' }, ['test7'], 'test7')
// let test8 = new Element('div', { class: 'test8' }, ['test8'], 'test8')
// let test4 = new Element('div', { class: 'test4' }, ['test4'], 'test4')
// let test5 = new Element('ul', { class: 'test5' }, ['test5'], 'test5')
// let test1 = new Element('div', { class: 'test1' }, [test4], 'test1')
// let test2 = new Element('div', { class: 'test2' }, [test5, test4], 'test1')
// // let root = test1.render()
// let pathchs = diff(test1, test2)
// // console.log(pathchs)
// // setTimeout(() => {
// //   console.log('开始更新')
// //   patch(root, pathchs)
// //   console.log('结束更新')
// // }, 1000)

// Vue NextTick
