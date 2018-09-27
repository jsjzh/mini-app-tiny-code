export function _log(first, second) {
  arguments.length === 1 ? (console.log(first, ` --- ${first}`)) : arguments.length === 2 ? (console.log(first === second, `${first} --- ${second}`)) : (console.log("err"));
}

export function extendsLog(foo, bar, flag = false) {
  _log(foo.name, bar.name);
  _log(foo.type, bar.type);
  _log(foo.arr, bar.arr);

  if (foo.arr && bar.arr) {
    foo.arr.push(1);
    _log(foo.arr, bar.arr);
  }

  _log(foo.getName, bar.getName);

  _log(foo.age, bar.age);
  _log(foo.Arr, bar.Arr);

  if (foo.Arr && bar.Arr) {
    foo.Arr.push(1);
    _log(foo.Arr, bar.Arr);
  }

  _log(foo.getAge, bar.getAge);

  if (flag) {
    console.log("----------- 分割线 -------------");
    _log(foo.names, bar.names);
    _log(foo.types, bar.types);
    _log(foo.arrs, bar.arrs);

    if (foo.arrs && bar.arrs) {
      foo.arrs.push(1);
      _log(foo.arrs, bar.arrs);
    }

    _log(foo.getNames, bar.getNames);

    _log(foo.ages, bar.ages);
    _log(foo.Arrs, bar.Arrs);

    if (foo.Arrs && bar.Arrs) {
      foo.Arrs.push(1);
      _log(foo.Arrs, bar.Arrs);
    }
  }
}