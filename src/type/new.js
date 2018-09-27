import {
  _log
} from "util";

/**
 * new 关键字
 * 
 * 当代码 new Parent(...) 执行时，会发生以下事情：
 * 一个继承自 Parent.prototype 的新对象被创建。
 * 使用指定的参数调用构造函数 Parent，并将 this 绑定到新创建的对象。new Parent 等同于 new Parent()，也就是没有指定参数列表，Parent 不带任何参数调用的情况。
 * 由构造函数返回的对象就是 new 表达式的结果。如果构造函数没有显式返回一个对象，则使用步骤1创建的对象。（一般情况下，构造函数不返回值，但是用户可以选择主动返回对象，来覆盖正常的对象创建步骤）
 */

function Parent(name) {
  this.name = name;
  return this;
}

var childOne = new Parent("cat");

_log(childOne);

function New(Parent) {
  let obj = {};
  obj.__proto__ = Parent.prototype;
  return Parent.apply(obj, Array.prototype.slice.call(arguments, 1)) || obj;
}

var childTwo = New(Parent, "dog");

_log(childTwo);