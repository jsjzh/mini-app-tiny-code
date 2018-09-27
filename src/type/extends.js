import {
  _log
} from "util";

/**
 * 继承
 * 想要一个对象能够访问另一个对象的属性 同时 这个对象还能够添加自己新的属性或是覆盖可访问的另一个对象的属性 我们实现这个目标的方式叫做 继承
 */

/**
 * 继承
 * 期望的效果
 * 当 new 了一个 child 之后 生成的实例对象可以直接调用 Parent 的属性和方法 包括私有方法和原型方法
 */
let i = 0;

function _Parent(type = "未传入值") {
  _log("_Parent 调用次数 ===>", ++i);
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

// _log(fooOne.name, BarOne.name);
// _log(fooOne.type, BarOne.type);
// _log(fooOne.arr, BarOne.arr);

// // 更改父类中的私有引用属性
// // 由该子类生成的各实例中该属性也改变了
// fooOne.arr.push(1);
// _log(fooOne.arr, BarOne.arr);

// // 方法进行了复用 两个子类的方法指向相同
// _log(fooOne.getName, BarOne.getName);

// _log(fooOne.age, BarOne.age);
// _log(fooOne.Arr, BarOne.Arr);

// // 改变父类中的原型引用属性
// // 由该子类生成的各实例中该属性也改变了
// fooOne.Arr.push(1);
// _log(fooOne.Arr, BarOne.Arr);

// // 方法进行了复用 两个子类的方法指向相同
// _log(fooOne.getAge, BarOne.getAge);


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

// _log(fooTwo.name, barTwo.name);
// // 可以传入 type
// _log(fooTwo.type, barTwo.type);
// // 根据子类生成的两个父类中的引用属性内存地址并不相同
// _log(fooTwo.arr, barTwo.arr);
// // 方法未复用 每次都是生成新的方法 新的内存地址
// _log(fooTwo.getName, barTwo.getName);
// // 不能够继承父类的 prototype 中的属性
// _log(fooTwo.age, barTwo.age);
// _log(fooTwo.Arr, barTwo.Arr);
// _log(fooTwo.getAge, barTwo.getAge);

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

// // 由子类生成的实例所对应的父类私有属性内存地址皆不相同
// _log(fooThree.name, barThree.name);
// _log(fooThree.type, barThree.type);
// _log(fooThree.arr, barThree.arr);
// fooThree.arr.push(1);
// _log(fooThree.arr, barThree.arr);
// _log(fooThree.getName, barThree.getName);

// // 由子类生成的实例所对应的父类原型属性内存地址仍旧相同
// _log(fooThree.age, barThree.age);
// _log(fooThree.Arr, barThree.Arr);
// fooThree.Arr.push(1);
// _log(fooThree.Arr, barThree.Arr);
// _log(fooThree.getAge, barThree.getAge);


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

/**
 * 类式继承
 *  Object.create
 */

// function Parent() {
//   this.x = 0;
//   this.y = 0;
// }

// // 父类的方法
// Parent.prototype.move = function (x, y) {
//   this.x += x;
//   this.y += y;
//   console.info('Parent moved.');
// };

// function Child() {
//   Parent.call(this); // call super constructor.
// }

// // 子类续承父类
// Child.prototype = Object.create(Parent.prototype);
// Child.prototype.constructor = Child;

// var rect = new Child();

// console.log(rect instanceof Child, 'Is rect an instance of Child?');
// console.log(rect instanceof Parent, 'Is rect an instance of Parent?');

// rect.move(1, 1); // Outputs, 'Shape moved.'

// console.log(Object.create(Parent.prototype));
// console.log(new Parent());

// 继承多个对象
// function MyClass() {
//   SuperClass.call(this);
//   OtherSuperClass.call(this);
// }

// // 继承一个类
// MyClass.prototype = Object.create(SuperClass.prototype);
// // 混合其它
// Object.assign(MyClass.prototype, OtherSuperClass.prototype);
// // 重新指定constructor
// MyClass.prototype.constructor = MyClass;

// MyClass.prototype.myMethod = function () {
//   // do a thing
// };

// 比较在意 polyfill 最后使用的是 function F() {}
// 是否意味着这个更干净？
// 是否意味着这才是所谓的起源？
// if (typeof Object.create !== "function") {
//   Object.create = function (proto, propertiesObject) {
//     if (typeof proto !== 'object' && typeof proto !== 'function') {
//       throw new TypeError('Object prototype may only be an Object: ' + proto);
//     } else if (proto === null) {
//       throw new Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.");
//     }

//     if (typeof propertiesObject != 'undefined') throw new Error("This browser's implementation of Object.create is a shim and doesn't support a second argument.");

//     function F() {}
//     F.prototype = proto;

//     return new F();
//   };
// }

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