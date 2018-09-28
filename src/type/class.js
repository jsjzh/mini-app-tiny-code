import {
  _log,
  extendsLog
} from "util";

class Parent {
  constructor(type = "未传入 type") {
    this.name = "someone";
    this.type = type;
    this.arr = [1, 2, 3];
    this.getName = function () {
      return this.name
    }

    this._age = "18";
    this._Arr = [3, 2, 1];
  }

  get age() {
    return this._age;
  }

  set age(val) {
    this._age = val;
  }

  get Arr() {
    return this._Arr;
  }

  set Arr(val) {
    this._Arr = val;
  }

  getAge() {
    return this.age;
  }
}

class ChildOne extends Parent {
  constructor(type) {
    super(type);
  }
}

let fooOne = new ChildOne("传入 type");
let barOne = new ChildOne("传入 type");

extendsLog(fooOne, barOne);