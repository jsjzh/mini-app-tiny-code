// 直接用模板语法
// 第一种写法 哈哈哈 笑死我了这个写法
String.prototype.renderOne = function (options) {
  return eval(`\`${this.replace(/\$\{/g, "${options.")}\``);
}

// 正则取出 ${} 的元素，然后进行替换
// 第二种写法
String.prototype.renderTwo = function (options) {
  const str = this;
  return str.replace(/\$\{([\w,\.])*?\}/g, function (foo) {
    let arr = foo.slice(2, -1).split(".");

    function get(option, keys) {
      let op = option[keys[0]];
      if (typeof op === "object") {
        return get(op, keys.slice(1))
      }
      return op
    }
    return get(options, arr)
  })
}

// 反过来想，如果从 options 先入手，把 options 转成字符串的样子，深度用 . 来代表
// String.prototype.render = function (options) {
//   const str = this;
//   let done;

//   "options.name"
//   "options.age"
//   "options.job.jobName"
//   "options.job.jobLevel"
//   "options.deep.deep.deep.deep"

//   // for (const key in options) {
//   //   if (options.hasOwnProperty(key)) {
//   //     const item = options[key];
//   //     let proKey = "${" + key + "}";
//   //     console.log(proKey);
//   //     console.log(item);
//   //     done = str.replace(proKey, item);
//   //   }
//   // }
//   return done;
// }

// 网友说的一些比较特别的，我没想到或者有一些新东西的方法
// -------------------------------------------------
// String.prototype.render = function (obj) {
//   with(obj) {
//     return eval('`' + this + '`')
//   }
// }
// -------------------------------------------------
// String.prototype.render = function (ctx) {
//   return this.replace(/\x24\x7b([\w\.]+)\x7d/ig, (_, key) => key.split('\.').reduce((obj, attr) => obj[attr], ctx))
// }
// -------------------------------------------------

const foo = "my name is ${name}, age ${age}, my job is ${job.jobName}, test ${deep.deep.deep.deep}";
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
console.log(foo.renderOne(bar));
console.log(foo.renderTwo(bar));