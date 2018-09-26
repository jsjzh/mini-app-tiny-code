import { compare } from "util";

function Fun() {};
let fn = new Fun();

/**
 * __proto__
 * 简称：隐式原型
 * 
 * 每个对象都具有的一个属性
 * 一个对象的隐式原型会指向构造该对象的构造函数的原型，当访问一个该对象并没有的属性的时候，会沿着构造他的构造函数层层向上去寻找该属性
 */

/**
 * constructor
 * 简称：构造者
 * 
 * 每个对象都具有的一个属性
 * 一个对象的构造者会直接指向构造该对象的构造函数
 */

/**
 * prototype
 * 简称：原型
 * 
 * 只有函数对象才具有的属性
 * 是一个对象，当有一个新的对象由该构造函数生成时，这个新的对象可以直接访问该构造函数的原型
 */

compare(fn.constructor, Fun)
compare(Fun.constructor, Function)
compare(Function.constructor, Function)
compare(Object.constructor, Function)

compare(fn.__proto__, Fun.prototype)
compare(Fun.__proto__, Function.prototype)
compare(Function.__proto__, Function.prototype)
compare(Object.__proto__, Function.prototype)

compare(Fun.prototype instanceof Object)
compare(Function.prototype instanceof Object)

compare(Fun.prototype.__proto__, Object.prototype)
compare(Function.prototype.__proto__, Object.prototype)
compare(Object.prototype.__proto__, null)

// 函数对象的原型的隐式原型 --> Object 的原型，这也就是经常说的 万物皆对象 的由来
// 函数对象 -> 拥有 prototype，prototype 是个对象 -> 那他的 prototype 属性和方法是哪里来的呢 -> 因为是对象，所以有 __proto__ 属性 -> 这个属性又是指向他的构造函数的原型，也就是 Object.protytype
// 所以说，并没有绕来绕去，因为函数对象有一个特殊的属性 prototype，并且是个对象，对象就有 __proto__ 属性，__proto__ 当然就是指向他的构造构造函数的原型
console.log(Function.prototype.__proto__ === Object.prototype);
// 最终，Object 的原型的隐式原型，就指向了他的构造函数，发现竟然是个 null
// 也就是传说中的 无中生有 了
console.log(Object.prototype.__proto__ === null);