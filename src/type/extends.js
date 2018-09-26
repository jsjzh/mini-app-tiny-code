import {
  _log
} from "util";

/**
 * 继承
 * 想要一个对象能够访问另一个对象的属性，同时，这个对象还能够添加自己新的属性或是覆盖可访问的另一个对象的属性，我们实现这个目标的方式叫做 继承
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


/**
 * 原型链继承
 * 核心
 *  将父类的实例作为子类的原型
 * 优点
 *  父类方法可以复用
 * 缺点
 *  父类的引用属性会被所有子类实例共享
 *  子类构建实例时不能向父类传递参数
 */

/**
 * 继承
 * 期望的效果
 * 当 new 了一个 child 之后，生成的实例对象可以直接调用 Parent 的属性和方法，包括私有方法和原型方法
 */
function ParentOne() {
  this.name = "someOne";
  this.arr = [1, 2, 3];
  this.getName = function () {
    return this.name
  }
}

ParentOne.prototype.age = "18";
ParentOne.prototype.Arr = [3, 2, 1];
ParentOne.prototype.getAge = function () {
  return this.age
}

function ChildOne() {}

ChildOne.prototype = new ParentOne();
ChildOne.prototype.constructor = ChildOne;

let fooOne = new ChildOne();
let BarOne = new ChildOne();

_log(fooOne.name, BarOne.name);
_log(fooOne.arr, BarOne.arr);
fooOne.arr.push(1);
_log(fooOne.arr, BarOne.arr);
_log(fooOne.getName(), BarOne.getName());
_log(fooOne.age, BarOne.age);
_log(fooOne.Arr, BarOne.Arr);
fooOne.Arr.push(1);
_log(fooOne.Arr, BarOne.Arr);
_log(fooOne.getAge(), BarOne.getAge());

// function ParentOne(name = "未传入值") {
//   this.type = "animal";
//   this.foo = ["one", "two", "three"];
//   this.name = name;
//   this.hi = function () {
//     return `hi my name is ${this.name}`;
//   }
// }
// ParentOne.prototype.bar = ["three", "two", "one"];
// ParentOne.prototype.hello = function () {
//   return `hello my name is ${this.name}`;
// }

// function ChildOne() {}

// ChildOne.prototype = new ParentOne();
// ChildOne.prototype.constructor = ChildOne;

// console.log("-----");
// // 无法传入参数
// let catOne = new ChildOne("传入的name");
// _log(catOne.type);
// _log(catOne.foo);
// _log(catOne.name);
// _log(catOne.hi());

// _log(catOne.bar);
// _log(catOne.hello());
// console.log("-----");
// // 由于是引用属性，所以修改父类会直接影响到子类实例
// ParentOne.prototype.bar = [3, 2, 1];
// ParentOne.prototype.hello = function () {
//   return `hello my name is change`;
// }
// _log(catOne.bar);
// _log(catOne.hello());

/**
 * 构造函数继承
 * 核心
 *  将父类构造函数的内容复制给了子类的构造函数，可以理解成将父类中进行的步骤在子类中重新进行一次
 * 优点
 *  父类的引用属性不会被共享
 *  子类构建实例时可以向父类传递参数
 * 缺点
 *  父类的方法不能复用，子类实例的方法每次都是单独创建
 */

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
 *    第二次又给子类的构造函数添加了父类的属性，从而覆盖了子类原型中的同名参数，覆盖的情况造成了性能上的浪费
 */

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
 * 寄生式继承
 * 核心
 *  使用原型式继承获得一个目标对象的浅复制，然后增强这个浅复制的能力
 */

/**
 * 寄生组合继承
 */

/**
 * ES6 Class extends
 */