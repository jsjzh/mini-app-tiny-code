/**
 * 展示展示 javascript 中 String 的一些方法的地方
 */

// http://www.w3school.com.cn/jsref/jsref_obj_string.asp

const foo = "King";

/**
 * charAt()
 * 可以返回指定位置的字符 且为字符串类型
 * param
 * index need 从 0 开始，若大于 string.length 则返回空字符串
 */

console.log(foo.charAt(0));

/**
 * charCodeAt()
 * 可以返回指定位置的字符的 Unicode 编码 是 0 - 65535 之间的整数
 * param
 * index need 从 0 开始，若大于 string.length 则返回 NaN
 */

console.log(foo.charCodeAt(0));

/**
 * 
 */