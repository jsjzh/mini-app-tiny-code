import {
  _log,
  extendsLog
} from "util";

/**
 * 继承
 *  想要一个对象能够访问另一个对象的属性 同时 这个对象还能够添加自己新的属性或是覆盖可访问的另一个对象的属性 我们实现这个目标的方式叫做 继承
 * 期望的效果
 *  当 new 了一个 child 之后 生成的实例对象可以直接调用 Parent 的属性和方法 包括私有方法和原型方法
 */

// let i = 0;

function _Parent(type = "未传入值") {
  // _log("_Parent 调用次数 ===>", ++i);
  this.name = "someOne";
  this.arr = [1, 2, 3];
  this.type = type;
  this.getName = function () {
    return this.name
  }
}

_Parent.prototype.age = "18";
_Parent.prototype.Arr = [3, 2, 1];
_Parent.prototype.getAge = function () {
  return this.age
}

function _Parents(types = "未传入值 s") {
  this.names = "someOne s";
  this.arrs = [1, 2, 3, 4];
  this.types = types;
  this.getNames = function () {
    return this.names
  }
}

_Parents.prototype.ages = "18s";
_Parents.prototype.Arrs = [4, 3, 2, 1];
_Parents.prototype.getAges = function () {
  return this.ages
}

// DONE
/**
 * 原型链继承
 * 核心
 *  将父类的实例作为子类的原型
 * 优点
 *  父类方法可以复用
 * 缺点
 *  父类的引用属性会被所有子类实例共享
 *    new 的实际效果 返回了一个对象 该对象的 __proto__ 属性 = 构建函数的 prototype 并且改变 this 指向运行了一遍构建函数 所以 child 的 this 中的引用属性都是同一个了
 *      From.call(obj)
 *    所以 如果利用生成的 child 再去生成实例 就会发现生成的实例中所有来自于父类的引用属性都是指向同一个内存地址
 *  子类构建实例时不能向父类传递参数
 */

// function ChildOne() {}

// ChildOne.prototype = new _Parent();
// ChildOne.prototype.constructor = ChildOne;

// let fooOne = new ChildOne();
// let BarOne = new ChildOne();

// // 更改父类中的私有引用属性
// // 由该子类生成的各实例中该属性也改变了
// // 方法进行了复用 两个子类的方法指向相同
// // 改变父类中的原型引用属性
// // 由该子类生成的各实例中该属性也改变了
// // 方法进行了复用 两个子类的方法指向相同
// extendsLog(fooOne, BarOne);


// // 为了验证即使方法做的事情相同 但是内存地址不一样
// let demoOne = function () { return this; }
// let demoTwo = function () { return this; }
// _log(demoOne, demoTwo)

// DONE
/**
 * 构造函数继承
 * 核心
 *  将父类构造函数的内容复制给了子类的构造函数 可以理解成将父类中进行的步骤在子类中重新进行一次
 * 优点
 *  父类的引用属性不会被共享
 *  子类构建实例时可以向父类传递参数
 * 缺点
 *  父类的方法不能复用 子类实例的方法每次都是单独创建
 */

// function ChildTwo() {
//   _Parent.apply(this, Array.prototype.slice.call(arguments, 0));
// }

// let fooTwo = new ChildTwo("ChildTwo 传入了 type");
// let barTwo = new ChildTwo("ChildTwo 传入了 type");

// // 可以传入 type
// // 根据子类生成的两个父类中的引用属性内存地址并不相同
// // 方法未复用 每次都是生成新的方法 新的内存地址
// // 不能够继承父类的 prototype 中的属性
// extendsLog(fooTwo, barTwo);

// DONE
/**
 * 组合继承
 * 核心
 *  原型链继承和构造函数继承的组合
 * 优点
 *  父类的方法可以被复用
 *  父类的引用属性不会被共享
 *  子类构建实例时可以向父类传递参数
 * 缺点
 *  调用了两次父类的构造函数
 *    第一次给子类的原型添加了父类构造函数中的属性
 *    第二次又给子类的构造函数添加了父类的属性 从而覆盖了子类原型中的同名参数 覆盖的情况造成了性能上的浪费
 */

// function ChildThree() {
//   // 当使用 new Child 生成实例的时候再次调用
//   _Parent.apply(this, Array.prototype.slice.call(arguments, 0));
// }

// // 第一次调用 _Parent
// ChildThree.prototype = new _Parent();
// ChildThree.prototype.constructor = ChildThree;

// let fooThree = new ChildThree("ChildThree 传入了 type");
// let barThree = new ChildThree("ChildThree 传入了 type");

// extendsLog(fooThree, barThree);

// DONE
/**
 * 类式继承
 *  Object.create
 */

// function ChildFour() {
//   _Parent.call(this, Array.prototype.slice.call(arguments, 0))
// }

// // function _extend(proto) {
// //   function F() {}
// //   F.prototype = proto;
// //   return new F();
// // }

// ChildFour.prototype = Object.create(_Parent.prototype);
// ChildFour.prototype.constructor = ChildFour;

// let fooFour = new ChildFour("ChildFour 传入了 type");
// let barFour = new ChildFour("ChildFour 传入了 type");

// // 由子类生成的实例所对应的 父类私有属性 内存地址皆不相同
// // 由子类生成的实例所对应的 父类原型属性 内存地址仍旧相同
// extendsLog(fooFour, barFour);

// // 继承多个对象
// function ChildFive() {
//   _Parent.call(this, Array.prototype.slice.call(arguments, 0))
//   _Parents.call(this, Array.prototype.slice.call(arguments, 0))
// }
// // 混合其它
// ChildFive.prototype = Object.create(_Parent.prototype);
// Object.assign(ChildFive.prototype, _Parents.prototype);
// // 重新指定constructor
// ChildFive.prototype.constructor = ChildFive;

// let fooFive = new ChildFive("ChildFive 传入了 type");
// let barFive = new ChildFive("ChildFive 传入了 type");

// extendsLog(fooFive, barFive, true);

// TODO
/**
 * 原型式继承
 * 核心
 *  原型式继承的 object 方法本质上是对参数对象的一个浅复制
 * 优点
 *  父类方法可以复用
 * 缺点
 *  父类的引用属性会被所有子类实例共享
 *  子类构建实例时不能向父类传递参数
 */

// TODO
/**
 * 寄生式继承
 * 核心
 *  使用原型式继承获得一个目标对象的浅复制 然后增强这个浅复制的能力
 */

// TODO
/**
 * 寄生组合继承
 */

// TODO
/**
 * ES6 Class extends
 */