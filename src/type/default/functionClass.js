import { _log } from "util";

function Parent(type = "未传入 type") {
  this.name = "Parent";
  this.arr = [1, 2, 3, "我是引用属性"];
  this.type = type;
  this.getName = function() {
    return this.name;
  };
}

Parent.getType = function() {
  return this.type;
};

Parent.prototype.Arr = [3, 2, 1];

Parent.prototype.getArr = function() {
  return this.Arr;
};

function Child(type) {
  Parent.call(this, type);
}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

let foo = new Child("foo");
let bar = new Child("bar");

// 私有属性 基本类型 数值相同 判断结果为 true
_log(foo.name, bar.name);
// 私有属性 引用类型 内存地址不同 判断结果为 false
_log(foo.arr, bar.arr);
// 私有属性 基本类型 数值不同 判断结果为 false
_log(foo.type, bar.type);
// 私有属性 引用类型 内存地址不同 判断结果为 false
_log(foo.getName, bar.getName);

// 原型属性 引用类型 内存地址相同 判断结果为 true
_log(foo.Arr, bar.Arr);
// 证明如下 foo.Arr push 了 4 bar.Arr 同时改变
foo.Arr.push(4);
_log(foo.Arr, bar.Arr);

// 原型属性 引用类型 内存地址相同 判断结果为 true
_log(foo.getArr, bar.getArr);
// 似乎并没有 static 方法这么一说
// _log(Parent.getType, Child.getType);
