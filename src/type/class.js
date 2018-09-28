import {
  _log
} from "util";

class Parent {
  constructor(type = "未传入 type") {
    this.name = "Parent";
    this.arr = [1, 2, 3, "我是引用属性"];
    this.type = type;
    this.getName = function () {
      return this.name
    }
    this.Arr = [3, 2, 1];
  }

  get Arr() {
    return this._Arr;
  }

  set Arr(val) {
    this._Arr.push(`${this.type} push ${val}`);
  }

  getArr() {
    return this.Arr;
  }

  static getType() {
    return this.type;
  }
}

class Child extends Parent {
  constructor(type) {
    super(type);
  }
}

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
// 不只是私有属性还是原型属性 基本类型 ???
// 私认为不是原型属性
_log(foo.Arr, bar.Arr);
foo.Arr = 4;
_log(foo.Arr, bar.Arr);
// 原型属性 引用类型 内存地址相同 判断结果为 true
_log(foo.getArr, bar.getArr);
// class 上 static 属性 引用类型 内存地址相同 判断结果为 true
_log(Parent.getType, Child.getType);