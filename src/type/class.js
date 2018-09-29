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
    this._Arr = [3, 2, 1];
  }

  get Arr() {
    return this._Arr;
  }

  set Arr(val) {
    this._Arr.push(`${this.type} push ${val}`);
  }

  getArr() {
    return this._Arr;
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

// 遂看起来像是原型属性 但其实仍旧访问私有属性 引用类型 内存地址不同 判断结果为 false
_log(foo.Arr, bar.Arr);
// 证明如下 foo.Arr push 了 4 bar.Arr 不改变
foo.Arr.push(4);
_log(foo.Arr, bar.Arr);

// 原型属性 引用类型 内存地址相同 判断结果为 true
_log(foo.getArr, bar.getArr);
// class 上 static 属性 引用类型 内存地址相同 判断结果为 true
_log(Parent.getType, Child.getType);

/**
 * 共同点
 *  都可以声明私有属性 即使是引用类型 由子类生成的实例中该属性也不相同
 *  都可以声明原型方法 并且可以原型方法的内存地址相同
 * 
 * 不同点
 *  class 中似乎不能设置 prototype 的属性 比如有个属性希望所有继承的子类都一样 class 就办不到
 *  functionClass 没有 static 方法继承这么一说 相比较 calss 中的 static 方法可以继承
 *  class 中不会自动挂载 this 的指向
 */