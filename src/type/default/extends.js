import { _log, extendsLog } from "util";

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
  this.getName = function() {
    return this.name;
  };
}

_Parent.prototype.age = "18";
_Parent.prototype.Arr = [3, 2, 1];
_Parent.prototype.getAge = function() {
  return this.age;
};

function _Parents(types = "未传入值 s") {
  this.names = "someOne s";
  this.arrs = [1, 2, 3, 4];
  this.types = types;
  this.getNames = function() {
    return this.names;
  };
}

_Parents.prototype.ages = "18 s";
_Parents.prototype.Arrs = [4, 3, 2, 1];
_Parents.prototype.getAges = function() {
  return this.ages;
};

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

function ChildFour() {
  _Parent.call(this, Array.prototype.slice.call(arguments, 0));
}

ChildFour.prototype = Object.create(_Parent.prototype);
ChildFour.prototype.constructor = ChildFour;

let fooFour = new ChildFour("ChildFour 传入了 type");
let barFour = new ChildFour("ChildFour 传入了 type");

// 由子类生成的实例所对应的 父类私有属性 内存地址皆不相同
// 由子类生成的实例所对应的 父类原型属性 内存地址仍旧相同
extendsLog(fooFour, barFour);

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

// function Create(proto)) {
//   function ctor() {}
//   ctor.prototype = proto;
//   return new ctor();
// }

// function ChildSix() {
//   _Parent.call(this, Array.prototype.slice.call(arguments, 0))
//   _Parents.call(this, Array.prototype.slice.call(arguments, 0))
// }

// ChildSix.prototype = Create(_Parent.prototype);
// Object.assign(ChildSix.prototype, _Parents.prototype);

// ChildSix.prototype.constructor = ChildSix;

// let fooSix = new ChildSix("ChildSix 传入了 type");
// let barSix = new ChildSix("ChildSix 传入了 type");

// extendsLog(fooSix, barSix, true);

// TODO
/**
 * ES6 Class extends
 */

/**
 * class
 *  类的声明不可提升
 *  在代码上看 函数调用即使在函数声明之前 也是可以使用的
 *  但是 class 不会提升
 *  关于 this 由于 class 都是默认在严格模式下的 所以只会指向到 undefined
 *
 * class Parent() {
 *    getName() { return this; }
 *  }
 *  let obj = new Parent();
 *  obj.getName(); // Parent {}
 *  let getName = obj.getName;
 *  getName(); // undefined
 *
 *  function _Parent() {
 *    this._getName = function() { return this; }
 *  }
 *
 *  let _obj = new _Parent();
 *  _obj._getName(); // _Parent {}
 *  let _getName = _obj._getName;
 *  _getName(); // global object
 *
 * constructor() {}
 *  是一个类似 function _Parent() {} 的存在 也就是构造函数
 *  在函数体内部使用 this 也就如同 构造函数中的 this 声明的是私有属性
 * MDN
 *  在一个类中只能有一个 constructor() {} 存在
 *
 *  在普通的类中 constructor 默认为 constructor() {}
 *  在继承的类中 constructor 默认为 constructor(...args) { super(...args) }
 *
 * sayName() {}
 *  在 class {} 函数体内声明的方法 就类似于 function _Parent() {} 上声明 prototype 一样
 *
 * extends
 *  同样 class 也可以继承 值得注意的是 如果想要在子类的 constructor 中使用 this 的话
 *  就必须先运行 super()
 *    super()
 *      可以理解成被继承的那个构造函数
 *      在以前的继承方法中很多见的 _Parent.call(this, Array.prototype.slice.call(arguments, 1)) 表达的意思相同
 *      并且这可以向父类传递参数 super(type) 然后在父类的 constructor(type) 接收即可
 *
 *      另外 可以使用 super.sayName() 直接使用父类的方法
 *      但是 不能使用 super.name 去直接访问父类的私有属性
 *        由于 extends 的时候 子类已经运行了一次父类的构造函数
 *        所以子类也有和父类相同的私有属性 也就是说可以直接使用 this.name 访问
 *
 *      MDN
 *        不能使用 delete 去删除父类的属性
 *        当使用 Object.defineProperty 定义一个属性为不可写时 super 不可以复写这个属性的值
 *        继承的 prototype 必须是一个 object 或者是 null
 *
 * get area(){}
 * set area(){}
 *  这两对类似于 _Parent.prototype.area = xxx 也就是在构造函数原型上的属性
 *  由子类生成的构造函数可以直接访问父类的 prototype 的属性
 *  比较神奇的一点是即使是父类的 prototype 是引用属性 当子类的一个实例更改了该引用属性（push）
 *  但另外一个子类的实例却没有被影响 是否意味着这并不是 prototype 类似的实现？
 *
 * static
 *  有点特殊的一个玩意儿 和 function _Parent() {} 作比较的话 又不是私有属性 又不是原型属性
 *  刚才试了一下 可以通过 _Parent.getName() {} 来获得 static getName() {} 一样的效果
 *  其实说到底函数也是对象 对象就可以添加属性和方法
 *
 *  另外 值得注意的是若子类继承父类 子类声明 static 相同的方法名会覆盖父类
 *  但也不妨碍我们使用父类的 static 方法 只要使用 super.getName() 即可
 *
 *  还有一点值得注意 不管是父类还是子类 生成的实例都不可以使用 static 方法
 *  使用只能是 _Parent.getName() 或者 _Child.getName()
 *
 *  在同一个类中 如果想调用该类的静态方法 可以直接使用 类名.静态方法名 来调用
 *
 * 更改内置对象（似乎在 babel-stage-2 下不能正常运行 但是新版的 chrome 浏览器下可以运行 应该是编译之后导致的错误）
 *  class MyDate extends Date {} 即可
 *    在函数体内部可以自定义一些方法 方法内可以用父类也就是内置函数 Date 的一些方法
 *    只要使用 super.getDate() super.getMonth() super.getFullYear() 等 即可
 *
 *  一般用来创建工具函数
 */

// 在调用函数的过程中，this的值取决于我们怎么样调用函数.  在通常情况下，我们通过一个表达式person1.sayHello()来调用函数：即从一个对象的属性中得到所调用的函数。此时this被设置为我们取得函数的对象（即person1）。这就是为什么person1.sayHello() 使用了姓名“Alice”而person2.sayHello()使用了姓名“bob”的原因。

// 然而我们使用不同的调用方法时, this的值也就不同了。当从变量 helloFunction()中调用的时候， this就被设置成了全局对象 (在浏览器中即window)。由于该对象 (非常可能地) 没有firstName 属性, 我们得到的结果便是"Hello, I'm undefined". (这是松散模式下的结果， 在 严格模式中，结果将不同（此时会产生一个error）。 但是为了避免混淆，我们在这里不涉及细节) 。另外，我们可以像上例末尾那样，使用Function#call (或者Function#apply)显式的设置this的值。

// 也可以扩展传统的基于函数的“类”
// function Animal(name) {
//   this.name = name;
// }
// Animal.prototype.speak = function () {
//   console.log(this.name + ' makes a noise.');
// }

// class Dog extends Animal {
//   speak() {
//     super.speak();
//     console.log(this.name + ' barks.');
//   }
// }

// var d = new Dog('Mitzie');
// d.speak();

// // 请注意，类不能继承常规（非可构造）对象。如果要继承常规对象，可以改用Object.setPrototypeOf()

// var Animal = {
//   speak() {
//     console.log(this.name + ' makes a noise.');
//   }
// };

// class Dog {
//   constructor(name) {
//     this.name = name;
//   }
// }

// Object.setPrototypeOf(Dog.prototype, Animal); // If you do not do this you will get a TypeError when you invoke speak

// var d = new Dog('Mitzie');
// d.speak(); // Mitzie makes a noise.

// class Animal {
//   speak() {
//     return this;
//   }
//   static eat() {
//     return this;
//   }
// }

// let obj = new Animal();
// obj.speak(); // Animal {}
// let speak = obj.speak;
// speak(); // undefined

// Animal.eat() // class Animal
// let eat = Animal.eat;
// eat(); // undefined

// function Animal() {}

// Animal.prototype.speak = function () {
//   return this;
// }

// Animal.eat = function () {
//   return this;
// }

// let obj = new Animal();
// let speak = obj.speak;
// speak(); // global object

// let eat = Animal.eat;
// eat(); // global object

// class One {
//   constructor() {
//     this.name = "One";
//   }
// }

// class Two extends One {
//   constructor() {
//     super();
//   }
// }

// class Three {}

// // 将 Two 的原型指向了 Three
// Object.setPrototypeOf(Two.prototype, Three.prototype);

// console.log(Object.getPrototypeOf(Two.prototype) === One.prototype);
// // false
// console.log(Object.getPrototypeOf(Two.prototype) === Three.prototype);
// // true

// let foo = new Two();
// // 发现仍旧是 One
// console.log(foo.name);

// let foo = new demo();
// _log(foo.name);

// function demo() {
//   this.name = "123"
// }

// let bar = new One();
// _log(bar.name);

// class One {
//   constructor() {
//     this.name = "321"
//   }
// }

// class ClassParent {
//   constructor(type) {
//     this.name = "someOne";
//     this.arr = [1, 2, 3];
//     this.type = type;
//     this.getName = function () {
//       return this.name
//     }
//   }
//   getAge() {
//     return this.age
//   }

// }

// class ClassChild extends ClassParent {
//   constructor() {
//     super();
//   }
// }

// let fooSeven = new ClassChild("ClassChild 传入了 type");
// let barSeven = new ClassChild("ClassChild 传入了 type");

// extendsLog(fooSeven, barSeven);

// 'use strict';
// // Example 1: Creating a new class (declaration-form)
// // ===============================================================

// // A base class is defined using the new reserved 'class' keyword
// class Polygon {
//   // ..and an (optional) custom class constructor. If one is
//   // not supplied, a default constructor is used instead:
//   // constructor() { }
//   constructor(height, width) {
//     this.name = 'Polygon';
//     this.height = height;
//     this.width = width;
//   }

//   // Simple class instance methods using short-hand method
//   // declaration
//   sayName() {
//     console.log('Hi, I am a ', this.name + '.');
//   }

//   sayHistory() {
//     console.log('"Polygon" is derived from the Greek polus (many) ' + 'and gonia (angle).' + this.name);
//   }

//   // We will look at static and subclassed methods shortly
// }

// // Classes are used just like ES5 constructor functions:
// let p = new Polygon(300, 400);
// p.sayName();
// console.log('The width of this polygon is ' + p.width);

// // Example 2: Creating a new class (expression-form)
// // ===============================================================

// // Our Polygon class above is an example of a Class declaration.
// // ES6 classes also support Class expressions - just another way
// // of defining a new class. For example:
// const MyPoly = class Poly {
//   getPolyName() {
//     console.log('Hi. I was created with a Class expression. My name is ' + Poly.name);
//   }
// };

// let inst = new MyPoly();
// inst.getPolyName();

// // Example 3: Extending an existing class
// // ===============================================================

// // Classes support extending other classes, but can also extend
// // other objects. Whatever you extend must be a constructor.
// //
// // Let's extend the Polygon class to create a new derived class
// // called Square.
// class Square extends Polygon {
//   constructor(length) {
//     // The reserved 'super' keyword is for making super-constructor
//     // calls and allows access to parent methods.
//     //
//     // Here, it will call the parent class' constructor with lengths
//     // provided for the Polygon's width and height
//     super(length, length);
//     // Note: In derived classes, super() must be called before you
//     // can use 'this'. Leaving this out will cause a reference error.
//     this.name = 'Square';
//   }

//   // Getter/setter methods are supported in classes,
//   // similar to their ES5 equivalents
//   get area() {
//     return this.height * this.width;
//   }

//   set area(value) {
//     this.area = value;
//   }
// }

// let s = new Square(5);

// s.sayName();
// console.log('The area of this square is ' + s.area);

// // Example 4: Subclassing methods of a parent class
// // ===============================================================

// class Rectangle extends Polygon {
//   constructor(height, width) {
//     super(height, width);
//     this.name = 'Rectangle';
//   }
//   // Here, sayName() is a subclassed method which
//   // overrides their superclass method of the same name.
//   sayName() {
//     console.log('Sup! My name is ', this.name + '.');
//     super.sayHistory();
//   }
// }

// let r = new Rectangle(50, 60);
// r.sayName();

// // Example 5: Defining static methods
// // ===============================================================

// // Classes support static members which can be accessed without an
// // instance being present.
// class Triple {
//   // Using the 'static' keyword creates a method which is associated
//   // with a class, but not with an instance of the class.
//   static triple(n) {
//     n = n || 1;
//     return n * 3;
//   }
// }

// // super.prop in this example is used for accessing super-properties from
// // a parent class. This works fine in static methods too:
// class BiggerTriple extends Triple {
//   static triple(n) {
//     return super.triple(n) * super.triple(n);
//   }
// }
// console.log("!!!");
// console.log(Triple.triple());
// console.log(Triple.triple(6));
// console.log(BiggerTriple.triple(3));
// // var tp = new Triple();
// // console.log(tp.triple()); tp.triple is not a function

// // Example 6: Subclassing built-in classes and DOM
// // ===============================================================

// // Extend Date built-in
// class MyDate extends Date {
//   constructor() {
//     super();
//   }

//   getFormattedDate() {
//     var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//     return super.getDate() + '-' + months[super.getMonth()] + '-' + super.getFullYear();
//   }
// }

// var aDate = new MyDate();
// console.log(aDate.getTime());
// console.log(aDate.getFormattedDate());

// // // Extend Uint8Array
// // class ExtendedUint8Array extends Uint8Array {
// //   constructor() {
// //     super(10);
// //     this[0] = 255;
// //     this[1] = 0xFFA;
// //   }
// // }

// // var eua = new ExtendedUint8Array();
// // console.log(eua.byteLength);

// // Extend DOM Audio element
// class MyAudio extends Audio {
//   constructor() {
//     super();
//     this._lyrics = '';
//   }

//   get lyrics() {
//     return this._lyrics;
//   }

//   set lyrics(str) {
//     this._lyrics = str;
//   }
// }

// var player = new MyAudio();
// player.controls = true;
// player.lyrics = 'Never gonna give you up';
// document.querySelector('body').appendChild(player);
// console.log(player.lyrics);

// // Note: The V8 in Chrome 42 supports subclassing built-ins but Arrays.
// // Subclassing arrays supported in Chrome 43.

// class Stack extends Array {
//   constructor() {
//     super();
//   }

//   top() {
//     return this[this.length - 1];
//   }
// }

// var stack = new Stack();
// stack.push('world');
// stack.push('hello');
// console.log(stack.top());
// console.log(stack.length);
