import { _log } from "util";

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

/**
 * 理解 prototype
 * prototype 为一个对象，身为对象就代表其有 __proto__ 属性，__proto__ 又是指向构造该对象的构造函数的原型，也就是 Object.prototype
 */

_log(fn.constructor, Fun)
_log(Fun.constructor, Function)
_log(Function.constructor, Function)
_log(Object.constructor, Function)

_log(fn.__proto__, Fun.prototype)
_log(Fun.__proto__, Function.prototype)
_log(Function.__proto__, Function.prototype)
_log(Object.__proto__, Function.prototype)

_log(Fun.prototype.__proto__, Object.prototype)
_log(Function.prototype.__proto__, Object.prototype)
_log(Object.prototype.__proto__, null)