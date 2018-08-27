console.log("-----------------------from string.js-----------------------");
/**
 * 展示展示 javascript 中 String 的一些方法的地方
 */
// http://www.w3school.com.cn/jsref/jsref_obj_string.asp

const foo = "Hello";
const bar = "King";

/**
 * charAt()
 *  可以返回指定位置的字符 且为字符串类型
 * param
 *  index need 从 0 开始，若大于 string.length 则返回空字符串
 * -----
 * charCodeAt()
 *  可以返回指定位置的字符的 Unicode 编码 是 0 ～ 65535 之间的整数
 * param
 *  index need 从 0 开始，若大于 string.length 则返回 NaN
 */

console.log(foo.charAt(0));
console.log(foo.charCodeAt(0));

/**
 * concat()
 *  用于连接两个或多个字符串
 * param
 *  string*n need 将所有参数转为字符串，然后按顺序连接到原字符串尾部，返回连接后的字符串
 * 
 * 注意
 *  原字符串本身并没有被改变
 *  MDN 上强烈建议使用赋值操作符（+, +=）代替 concat
 */

console.log(foo.concat(bar));
console.log(foo);

/**
 * indexOf()
 *  可返回某个指定的字符串在字符串中首次出现的位置。
 * param
 *  searchValue need 需要被搜索的字符串
 *  formIndex nope 一个整数参数，规定字符串中开始检索的位置，合法取值为 0 ～ string.length - 1
 *   若省略则从首字符开始
 * 
 * 注意
 *  若找到则返回被找字符第一次出现的位置，若没找到则返回 -1
 * -----
 * lastIndexof()
 *  
 */

console.log(foo.indexOf("H"));
console.log(foo.indexOf("H", 1));

/**
 * slice()
 *  用于提取字符串的某个部分。
 * param
 *  start nope 
 * 
 */


console.log("-----------------------from string.js-----------------------");