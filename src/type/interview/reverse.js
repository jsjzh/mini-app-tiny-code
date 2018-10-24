function reverse(x) {
  if (x === 0) return x;
  if (x < 0) {
    let result = Number("-" + String(x).slice(1).split("").reverse().join(""))
    return result < -2147483648 ? 0 : result
  }
  if (x > 0) {
    let result = Number(String(x).split("").reverse().join(""))
    return result > 2147483647 ? 0 : result
  }
}

function reverse_best(x) {
  if (-2147483648 <= x && x <= 2147483647) {
    if (x > 0)
      return reverseNum(x);
    else {
      let neg = (reverseNum(x * -1));
      var rev = neg * (-1);
      return rev;
    }
  } else
    return 0;
};

function reverseNum(x) {
  var num = 0;
  while (x) {
    let temp = x % 10;
    num = (num * 10) + temp;
    x = Math.floor(x / 10);
  }
  if (-2147483648 <= num && num <= 2147483647)
    return num;
  else return 0;

}

console.log(reverse(1534236469));