export function _log(first, second) {
  arguments.length === 1 ? (console.log(first, ` --- ${first}`)) : arguments.length === 2 ? (console.log(first === second, `${first} --- ${second}`)) : (console.log("err"));
}

export function extendsLog(foo, bar) {
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
}