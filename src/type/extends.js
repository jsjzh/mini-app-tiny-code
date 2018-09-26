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
function ParentsOne(name = "未传入值") {
  this.type = "animal";
  this.foo = ["one", "two", "three"];
  this.name = name;
  this.hi = function () {
    return `hi my name is ${this.name}`;
  }
}
ParentsOne.prototype.bar = ["three", "two", "one"];
ParentsOne.prototype.hello = function () {
  return `hello my name is ${this.name}`;
}

function ChildOne() {}

ChildOne.prototype = new ParentsOne();
ChildOne.prototype.constructor = ChildOne;

console.log("-----");
// 无法传入参数
let catOne = new ChildOne("传入的name");
console.log("catOne.type", catOne.type);
console.log("catOne.foo", catOne.foo);
console.log("catOne.name", catOne.name);
console.log("catOne.hi()", catOne.hi());

console.log("catOne.bar", catOne.bar);
console.log("catOne.hello()", catOne.hello());
console.log("-----");
// 由于是引用属性，所以修改父类会直接影响到子类实例
ParentsOne.prototype.bar = [3, 2, 1];
ParentsOne.prototype.hello = function () {
  return `hello my name is change`;
}
console.log("catOne.bar", catOne.bar);
console.log("catOne.hello()", catOne.hello());

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