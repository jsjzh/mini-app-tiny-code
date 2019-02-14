console.log('-----------------------from string.js-----------------------')
/**
 * 展示展示 javascript 中 String 的一些方法的地方
 */

const foo = 'Hello'
const bar = 'King'
const spaceStr = '    king    '
const longStr = 'hello my name is king. =A='
const ABCDStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

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
console.log('charAt charCodeAt----------------------------------------------')
console.log(foo.charAt(0))
console.log(foo.charCodeAt(0))
console.log('charAt charCodeAt----------------------------------------------')
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
console.log('concat----------------------------------------------')
console.log(foo.concat(bar))
console.log(foo)
console.log('concat----------------------------------------------')
/**
 * indexOf()
 *  可返回某个指定的字符串在字符串中首次出现的位置
 * param
 *  searchValue need 需要被搜索的字符串
 *  fromIndex nope 一个整数参数，规定字符串中开始检索的位置，合法取值为 0 ～ string.length - 1
 *   若省略则从首字符开始，也就是默认为 0
 *
 * 注意
 *  若找到则返回被找字符第一次出现的位置，若没找到则返回 -1
 * -----
 * lastIndexOf()
 *  返回某个指定的字符串再字符串中最后出现的位置
 * param
 *  searchValue need 需要被搜索的字符串
 *  fromIndex nope 一个整数参数，规定字符串中开始检索的位置，默认为被搜索的字符串的长度，也就是 string.length
 * 注意
 *  若找到则返回被找字符最后出现的位置，若没找到则返回 -1
 * -----
 * ES6
 * includes()
 *  用于判断一个字符串是否包含在另一个字符串内，根据情况返回 true 或 false
 * param
 *  searchValue need 需要被搜索的字符串
 *  fromIndex nope 字符串开始索引的位置
 */
console.log('indexOf lastIndexOf includes----------------------------------------------')
console.log(foo.indexOf('l'))
console.log(foo.lastIndexOf('l'))

console.log(foo.indexOf('l', 1))
console.log(foo.lastIndexOf('l', 1))

console.log(foo.includes('e'))
console.log(foo.includes('e', 2))

// 一般情况下 includes 可以用 indexOf 替代
console.log(!!(foo.indexOf('e') !== -1))
console.log(!!(foo.indexOf('e', 2) !== -1))
console.log('indexOf lastIndexOf includes----------------------------------------------')
/**
 * padEnd()
 *  用一个指定的字符串将原字符串填充到指定的长度，从右侧开始填充
 * param
 *  targetLength need 需要被填充到的长度，若小于当前字符串，则直接返回该字符串
 *  padString nope 指定填充进去的字符串，若不传入则默认为 " "
 * -----
 * padStart()
 *  和上面一样，只不过是从左侧开始填充
 * param
 *  targetLength need 需要被填充到的长度，若小于当前字符串，则直接返回该字符串
 *  padString nope 指定填充进去的字符串，若不传入则默认为 " "
 */
console.log('padEnd padStart----------------------------------------------')
console.log(foo.padEnd('20') + 'end')
console.log(foo.padEnd('20', 'k'))

console.log('start' + foo.padStart('20'))
console.log(foo.padStart('20', 'k'))
console.log('padEnd padStart----------------------------------------------')
/**
 * repeat()
 *  将一个制定的字符串重复指定次数并返回重复后的字符串
 * param
 *  count need 字符串需要被重复的次数
 */
console.log('repeat----------------------------------------------')
console.log(foo.repeat('10'))
console.log(foo.repeat('10').match(/H/g).length)
console.log('repeat----------------------------------------------')
/**
 * slice()
 *  用于提取字符串的某个部分
 * param
 *  beginSlice nope 从字符串的该索引处开始提取，若为负值，则从后面开始算
 *   0 作为基数
 *  endSlice nope 结束的索引处，若为负值，则从后面开始算
 *   0 作为基数
 * 注意
 *  该方法不改变原字符串
 *  提取的新字符串包括 beginSlice 不包括 endSlice
 *   说人话就是，如果提取的两个都是整数，则第二个参数可以当作是要提取的字符串个数，而不是索引
 * -----
 * substr()
 *  提取一个字符串中指定开始的索引，指定长度的字符串
 * param
 *  start nope 指定要开始提取的索引，若不传则为 0，若为负数则从后开始算索引
 *  length nope 指定要提取的长度
 * 注意
 *  若 start 大于字符串长度，则返回一个空字符串
 *  若 start 为负值，且其绝对值大于字符串长度，则当作 0 来计算
 *  若 length 为 0 或负值，则返回一个空字符串
 *  若 length 不传入，则提取从 start 到字符串末尾
 *  ECMAscript 没有对该方法进行标准化，不建议使用
 * -----
 * substring()
 *  和 slice 类似，用于提取字符串的某个部分
 * param
 *  indexStart need 一个从 0 到 string.length 的整数
 *  indexEnd nope 一个从 0 到 string.length 的整数
 * 注意
 *  若 indexStart 等于 indexEnd 则返回空字符串
 *  若 indexEd 不传入，则提取从 indexStart 直到末尾
 *  若任一参数小于 0 或为 NaN，则被当作 0
 *  若任一参数大于 string.length，则被当作 string.length
 *  若 indexStart 大于 indexEnd，则执行效果等同于两个参数对调
 */
console.log('slice substr substring----------------------------------------------')
console.log(foo.slice(1, 3))
console.log(foo.slice(1, -1))
console.log(foo.slice(-3, 3))
console.log(foo.slice(-3, -1))

console.log(foo.substr(0, 3))
console.log(foo.substr(3))

console.log(foo.substring(1, 3))
console.log(foo.substring(3, 1))
console.log(foo.substring(1, -1))
console.log(foo.substring(-1, 1))
console.log(foo.substring(-1, -1))
console.log('slice substr substring----------------------------------------------')
/**
 * trim()
 *  用于去除字符串前后的字符串，可去除 \s \uFEFF \xA0
 */
console.log('trim----------------------------------------------')
console.log(spaceStr.trim())
console.log('trim----------------------------------------------')
/**
 * toLowerCase()
 *  字符串转为小写
 * -----
 * toUpperCase()
 *  字符串转为大写
 */
console.log('toLowerCase toUpperCase----------------------------------------------')
console.log(foo.toLowerCase())
console.log(foo.toUpperCase())
console.log('toLowerCase toUpperCase----------------------------------------------')
/**
 * 可传入正则表达式的方法
 * 正则可用下标
 *  g 查找所有可能的匹配，返回的结果可能是多个，不加的话最多只匹配一个
 *  i 表示不区分大小写
 *  m 表示多行匹配，就是匹配换行符两端可能存在的潜在匹配
 * split()
 *  用于分割一个字符串为数组
 * param
 *  separator nope 可传入字符串或正则表达式
 *  limit nope 限制返回的字符串长度
 * 注意
 *  若不传入 separator 则会返回每个字符分割的数组
 *  若传入的是正则，并且有捕获符号，也就是 ()，则返回的结果中也会包含被分割的字符串
 * -----
 * search()
 *  用于搜索字符串是否存在某一被搜索内容，和 indexOf 不同的是他支持正则
 * param
 *  regexp nope 可传入字符串或正则表达式
 * 注意
 *  若存在则返回被搜索的内容的索引，若不存在则返回 -1
 * -----
 * match()
 * param
 *  regexp nope 一个正则表达式对象，如果传入的不是正则表达式，则会隐式调用 new RegExp
 * 注意
 *
 * -----
 * replace()
 */
console.log('split search replace match----------------------------------------------')
console.log(longStr.split(' '))
console.log(longStr.split(' ', 3))
console.log(longStr.split(/\s*[\., \s]\s*/))
console.log(longStr.split(/(\s*[\., \s]\s*)/))

console.log(longStr.search(''))
console.log(longStr.search('p'))
console.log(longStr.search(/\d/))
console.log(longStr.search(/\w/))

console.log(longStr.match(/\s*[\., \s]\s*/))
console.log(longStr.match(/\s*[\., \s]\s*/g))
console.log(longStr.match(/(my name (is))/))
// 输出如下
// {
// 是正则匹配的值
//   0: "my name is",
// 是第一个 () 匹配的值
//   1: "my name is",
// 第二个 () 匹配的值
//   2: "is",
// 是在原字符串中，正则表达式开始匹配时候的索引
//   index: 6,
// 原字符串
//   input: "hello my name is king. =A="
// }

console.log('split search replace match----------------------------------------------')

console.log('-----------------------from string.js-----------------------')
