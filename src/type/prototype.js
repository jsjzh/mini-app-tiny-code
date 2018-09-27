import {
  _log
} from "util";

// 浏览器底层对 JS 的实现的是基于 C/C++

// 浏览器在初始化JS 环境时都发生了些什么
// 1.用 C/C++ 构造内部数据结构创建一个 OP 即(Object.prototype)以及初始化其内部属性但不包括行为。
// 2.用 C/C++ 构造内部数据结构创建一个 FP 即(Function.prototype)以及初始化其内部属性但不包括行为。
// 3.将 FP 的[[Prototype]]指向 OP。
// 4.用 C/C++ 构造内部数据结构创建各种内置引用类型。
// 5.将各内置引用类型的[[Prototype]]指向 FP。
// 6.将 Function 的 prototype 指向 FP。
// 7.将 Object 的 prototype 指向 OP。
// 8.用 Function 实例化出 OP，FP，以及 Object 的行为并挂载。
// 9.用 Object 实例化出除 Object 以及 Function 的其他内置引用类型的 prototype 属性对象。
// 10.用 Function 实例化出除Object 以及 Function 的其他内置引用类型的 prototype 属性对象的行为并挂载。
// 11.实例化内置对象 Math 以及 Grobal
// 至此，所有 内置类型构建完成。

// 现在我们可以回答为什么使用 typeof 获取 Object.prototype 会返回 object 了。
// 因为我们在使用 typeof 的时候得到的 object 类型并不完全代表是 Object 类型实例化出来的对象，有可能是底层实现的内部数据结构，包括 null。真正想知道这个类型还是需要去到当前该类的内部[[Class]]属性，至于如何获取可以使用Object的toString方法。

/**
 * __proto__
 * 简称：隐式原型 原型链
 * 感觉更像是链接的意思 new 的过程中才会用到 将新的对象的 __proto__ 链接到构造函数的 prototype 上
 * 
 * 每个对象都具有的一个属性
 * 一个对象的隐式原型会指向构造该对象的构造函数的原型，当访问一个该对象并没有的属性的时候，会沿着构造他的构造函数层层向上去寻找该属性
 */

/**
 * constructor
 * 简称：构造者
 * 
 * 该属性在 prototype 上
 * prototype.constructor
 * 一个对象的构造者会直接指向构造该对象的构造函数
 */

/**
 * prototype
 * 简称：原型
 * 
 * 只有函数对象才具有的属性
 * 是一个对象，当有一个新的对象由该构造函数生成时，这个新的对象可以直接访问该构造函数的原型
 * 
 * 除了 Function.prototype 是一个函数
 */

/**
 * 理解 prototype
 * prototype 为一个对象，身为对象就代表其有 __proto__ 属性，__proto__ 又是指向构造该对象的构造函数的原型，也就是 Object.prototype
 */


function Fun() {};
let fn = new Fun();

// _log(fn.constructor, Fun)
// _log(Fun.constructor, Function)
// _log(Function.constructor, Function)
// _log(Object.constructor, Function)

// _log(fn.__proto__, Fun.prototype)
// _log(Fun.__proto__, Function.prototype)
// _log(Function.__proto__, Function.prototype)
// _log(Object.__proto__, Function.prototype)

// _log(Fun.prototype.__proto__, Object.prototype)
// _log(Function.prototype.__proto__, Object.prototype)
// _log(Object.prototype.__proto__, null)

// -----

// function New(Parent) {
//   let obj = {};
//   obj.__proto__ = Parent.prototype;
//   return Parent.apply(obj, Array.prototype.slice.call(arguments, 1)) || obj;
// }

// _log(typeof Function);
// _log(typeof Object);

// _log("---");

// _log(typeof Function.prototype);
// _log(typeof Object.prototype);

// _log("---");

// let _Function = New(Function);
// let _Object = New(Object);

// _log(typeof _Function.prototype);
// _log(typeof _Object.prototype);

// _log(Function instanceof Object);
// _log(Object instanceof Function);

// _log(Function instanceof Function);
// _log(Object instanceof Object);