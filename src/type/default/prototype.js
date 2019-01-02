import { _log } from "util";

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

// prototype function 才有的属性
// __proto__ 每个对象都有的属性 大部分为对象（typeof === object）但是也有特例（typeof === function）function
// constructor 每个对象都有的属性

// const Fun = new Function();
function Fun() {};
const fn = new Fun();
// const obj = new Object();
const obj = {};

/**
 * 构造函数
 * 
 * 实例对象
 * 
 * 原型对象
 * 
 * prototype
 * 
 * constructor
 * 
 * __proto__
 */


/**
 * fn
 */
console.log("-----fn-----");
_log(typeof fn, "object") // 实例对象，通过 new 获得，为 object
_log(fn.__proto__, Fun.prototype) // fn 为 new Fun 获得，__proto__ 指向构造函数的 prototype
_log(fn.constructor, Fun) // fn 为 new Fun 获得，constructor 为构造函数的 Fun.prototype.constructor 继承来的，实例本身没有 constructor 属性
_log(fn.prototype, undefined) // 非构造函数，没有 prototype 属性

/**
 * Fun
 */
console.log("-----Fun-----");
_log(typeof Fun, "function") // Fun 为函数，且也可以通过 new Function 生成
_log(Fun.__proto__, Function.prototype) // Fun 也可以通过 new Function 生成，表示 Fun 为 Function 的实例对象，所以 Fun.__proto__ 指向 Function.prototype
_log(Fun.constructor, Function) // Fun 通过 new Function 生成，为 Function 的实例对象，所以 constructor 继承自 Function.prototype.constructor，实例本身没有 constructor 属性，但是他的 prototype 属性里有 constructor，并且指向自己
_log(Fun.prototype, Fun.prototype) // 拥有 construcotr 属性，并且该属性指向自己

/**
 * Fun.prototype
 */
console.log("-----Fun.prototype-----");
_log(typeof Fun.prototype, "object") // 构造函数的 prototype 是一个对象，通过 new Object 生成，并且添加了 constructor 属性，指向自己
_log(Fun.prototype.__proto__, Object.prototype) // 通过 new Object 生成，遂指向 Object.prototype
// !!!!! 错误
// _log(Fun.prototype.constructor, Object) // 由 new Object 生成，所以 constructor 继承自 Object.prototype.constructor 属性
// !!!!! 订正
_log(Fun.prototype.constructor, Fun) // ？？？？？
_log(Fun.prototype.prototype, undefined) // 非构造函数，没有 prototype 属性

/**
 * obj
 */
console.log("-----obj-----");
_log(typeof obj, "object") // 通过 new Object 生成，为 object
_log(obj.__proto__, Object.prototype) // 通过 new Object 生成，所以 __ptoto__ 指向其构造函数 Object.prototype
_log(obj.constructor, Object) // 为 new Object 生成，所以 constructor 属性继承自 Object.prototype.constructor
_log(obj.prototype, undefined) // 非函数，没有 prototype 属性

/**
 * Object
 */
console.log("-----Object-----");
_log(typeof Object, "function") // 通过 new Function 生成，可以理解成 function Object() 生成的
_log(Object.__proto__, Function.prototype) // 因为通过 new Function 生成，所以 __proto__ 指向 Function.prototype
_log(Object.constructor, Function) // 因为 通过了 Function 生成，所以 constructor 属性继承自 Function.prototype.constructor
_log(Object.prototype, Object.prototype) // 因为 Object 为内置函数，所以有许多内置的原型上的方法，比如 Object.prototype.hasOwnProperty 等等

/**
 * Function
 */
console.log("-----Function-----");
_log(typeof Function, "function") // 通过 new Function 生成，判断依据是新建一个函数的时候，可以通过 new Function() 来生成，所以可以判断 Function 是一个 function
_log(Function.__proto__, Function.prototype) // 因为通过 new Function 生成，所以 __proto__ 指向 Function.prototype
_log(Function.constructor, Function) // 由 new Function 生成，所以 继承自 Function.prototype.constructor 属性
_log(Function.prototype, Function.prototype) // 因为 Function 为内置函数，所以有很多内置的原型上的方法，比如 call bind apply

/**
 * Object.prototype
 */
console.log("-----Object.prototype-----");
_log(typeof Object.prototype, "object") // Object 为内置函数，在他的 prototype 上有很多内置的方法，且为一个对象，所以是 object
_log(Object.prototype.__proto__, null) // 照理来说，prototype 为对象，__proto__ 应该是指向 Object.prototype，但这是尽头的尽头，指向 null
_log(Object.prototype.constructor, Object) // 按照原来的想法，Object.prototype 为 new Object 之后的结果，所以他的 constructor 应该是继承自 Object.prototype.constructor
_log(Object.prototype.prototype, undefined) // 非构造函数，没有 prototype 属性

/**
 * Function.prototype
 */
console.log("Function.prototy-----pe-----");
// !!!!! 错误
// _log(typeof Function.prototype, "object") // Function 为内置函数，所以在他的 prototype 上有很多内置方法，并且为一个对象，所以是 object
// !!!!! 订正
_log(typeof Function.prototype, "function") // ？？？？？
_log(Function.prototype.__proto__, Object.prototype) // 因为是一个对象，所以他是 new Object 的结果，所以 __proto__ 指向 Object.prototype
// !!!!! 错误
// _log(Function.prototype.constructor, Object) // 因为由 new Object 生成，所以 constructor 继承自 Object.prototype.constructor
// !!!!! 订正
_log(Function.prototype.constructor, Function) // ？？？？？
_log(Function.prototype.prototype, undefined) // 非构造函数，没有 prototype 属性

// /**
//  * null
//  */
// _log(typeof null, "object") // 
// _log(null.__proto__, ) // 
// _log(null.constructor, ) // 
// _log(null.prototype, ) //

// function 的 prototype 不是由 new Object 生成？或者说生成了之后更改了 constructor