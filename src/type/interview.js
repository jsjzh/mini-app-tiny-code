// 第一种写法 哈哈哈 笑死我了这个写法
// 直接用模板语法
String.prototype.renderOne = function (options) {
  return eval(`\`${this.replace(/\$\{/g, "${options.")}\``);
}

// 第二种写法
// 正则取出 ${} 的元素，然后进行替换
String.prototype.renderTwo = function (options) {
  const str = this;
  return str.replace(/\$\{([\w,\.])*?\}/g, function (item) {
    function getDeep(ops, keys) {
      let op = ops[keys[0]];
      if (typeof op === "object" || keys.slice(1).length !== 0) {
        // 还需要深入进行解析
        return getDeep(op, keys.slice(1))
      } else {
        return op
      }
    }
    return getDeep(options, item.slice(2, -1).split("."))
  })
}

// 第三种方法
// 反过来想，如果从 options 先入手，把 options 转成字符串的形式，深度用 . 来代表，最后执行替换，岂不是美滋滋
String.prototype.renderThree = function (options) {
  const str = this;
  let done;
  "options.name"
  "options.age"
  "options.job.jobName"
  "options.job.jobLevel"
  "options.deep.deep.deep.deep"

  function getDeepPro(ops) {
    for (const key in ops) {
      if (ops.hasOwnProperty(key)) {
        let item = ops[key];
        if (typeof item === "object") {

        } else {
          return key
        }
      }
    }
  }

  console.log(getDeepPro(options));
  return done;
}

// 网友说的一些比较特别的，我没想到或者有一些新东西的方法
// -------------------------------------------------
// 严格模式下不能够使用 with =3=
String.prototype.renderFour = function (obj) {
  // with(obj) {
  //   return eval('`' + this + '`')
  // }
}
// -------------------------------------------------
String.prototype.renderFive = function (ctx) {
  return this.replace(/\x24\x7b([\w\.]+)\x7d/ig, (_, key) => key.split('\.').reduce((obj, attr) => obj[attr], ctx))
}
// -------------------------------------------------

const str = "my name is ${name}, age ${age}, my job is ${job.jobName}, test ${deep.deep.deep.deep}";
const bar = {
  name: "king",
  age: 24,
  job: {
    jobName: "web-fontend",
    jobLevel: "senior"
  },
  deep: {
    deep: {
      deep: {
        deep: "success"
      }
    }
  }
}
// console.log(str.renderOne(bar));
// console.log(str.renderTwo(bar));
console.log(str.renderThree(bar));
// console.log(str.renderFour(bar));
// console.log(str.renderFive(bar));