export function _log(first, second) {
  arguments.length === 1
    ? console.log(first, ` --- ${first}`)
    : arguments.length === 2
    ? console.log(first === second, `${first} --- ${second}`)
    : console.log("err");
}

export function ready(fn) {
  if (document.readyState !== "loading") {
    fn();
  } else if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", fn);
  } else {
    document.attachEvent("onreadystatechange", function() {
      document.readyState !== "loading" && fn();
    });
  }
}

export function extendsLog(foo, bar, flag = false) {
  _log(foo.name, bar.name);
  _log(foo.type, bar.type);
  _log(foo.arr, bar.arr);

  if (foo.arr && bar.arr) {
    foo.arr.push("push 一个玩意儿进去");
    _log(foo.arr, bar.arr);
  }

  _log(foo.getName, bar.getName);

  _log(foo.age, bar.age);
  _log(foo.Arr, bar.Arr);

  if (foo.Arr && bar.Arr) {
    foo.Arr.push("push 一个玩意儿进去");
    _log(foo.Arr, bar.Arr);
  }

  _log(foo.getAge, bar.getAge);

  if (flag) {
    console.log("----------- 上面为继承 _Parent 分割线 下面为继承 _Parents -------------");
    _log(foo.names, bar.names);
    _log(foo.types, bar.types);
    _log(foo.arrs, bar.arrs);

    if (foo.arrs && bar.arrs) {
      foo.arrs.push("push 一个玩意儿进去");
      _log(foo.arrs, bar.arrs);
    }

    _log(foo.getNames, bar.getNames);

    _log(foo.ages, bar.ages);
    _log(foo.Arrs, bar.Arrs);

    if (foo.Arrs && bar.Arrs) {
      foo.Arrs.push("push 一个玩意儿进去");
      _log(foo.Arrs, bar.Arrs);
    }
  }
}
