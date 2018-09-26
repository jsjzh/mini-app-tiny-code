function Fun() {}

Fun.prototype.name = "Fun";

let fn = new Fun();

// __proto__ 是每个对象都有的一个属性，而 prototype 是函数对象才会有的属性

/**
 * __proto__
 * 隐式原型
 * 每个对象都具有的一个属性
 * 一个对象的隐式原型指向该对象的构造函数的原型
 * 这可以方便该对象调用其构造函数的原型属性和方法
 * 
 * 理解成由谁 new 出来的
 */

/**
 * prototype
 * 原型
 * 只有函数对象才具有的属性
 * 几乎所有函数对象都有一个原型属性（除了一些内建函数），这个函数是一个指针，指向一个对象，而这个对象的用途是包含可以
 * 
 * 
 */

// 几乎所有的函数（除了一些内建函数）都有一个名为 prototype（原型）的属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以有特定类型的所有实例共享的属性和方法。prototype是通过调用构造函数而创建的那个对象实例的原型对象。

// fn 的 __proto__ 指向他的构造函数 Fun 的原型
console.log(fn.__proto__ === Fun.prototype);
// Fun 的 __proto__ 指向他的构造函数 Function 的原型
console.log(Fun.__proto__ === Function.prototype);
// Function 的 __proto__ 指向他的构造函数 Function 的原型
// 也就是说 Function 自身就是构造函数，它是由自己构造的
console.log(Function.__proto__ === Function.prototype);

// 函数对象的原型的隐式原型 --> Object 的原型，这也就是经常说的 万物皆对象 的由来
// 函数对象 -> 拥有 prototype，并且这也是个对象 -> 那他的 prototype 属性和方法是哪里来的呢 -> 因为是对象，所以有 __proto__ 属性 -> 这个属性又是指向他的构造函数的原型，也就是 Object.protytype
// 所以说，并没有绕来绕去，因为函数对象有一个特殊的属性 prototype，并且是个对象，对象就有 __proto__ 属性，__proto__ 当然就是指向他的构造构造函数的原型
console.log(Function.prototype.__proto__ === Object.prototype);
// 最终，Object 的原型的隐式原型，就指向了他的构造函数，发现竟然是个 null
// 也就是传说中的 无中生有 了
console.log(Object.prototype.__proto__ === null);

// // Object 作为一个构造函数（是一个函数对象！！函数对象！！），所以他的 __proto__ 指向 Function.prototype
// console.log(Object.__proto__ === Function.prototype) //true

// // Object.prototype 作为一切的源头，他的 __proto__ 是 null
// console.log(Object.prototype.__proto__ === null) //true