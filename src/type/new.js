function Parents(name) {
  this.name = name;
}

var childOne = new Parents("cat");

console.log(childOne);

function New(Parents) {
  let param = Array.prototype.slice.call(arguments, 1);
  let obj = new Object();
  obj.__proto__ = Parents.prototype;
  Parents.apply(obj, param);
  return obj;
}

var childTwo = New(Parents, "dog");

console.log(childTwo);

for (let i = (setTimeout(() => console.log(i), 2333), 0); i < 2; i++) {

}