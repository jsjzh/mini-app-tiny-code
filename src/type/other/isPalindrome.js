function isPalindrome(x) {
  if (x === 0) return true
  if (x < 0) return false
  if (x > 0) {
    let xArr = x.toString().split('')
    let len = xArr.length
    for (let index = 0; index < len / 2; index++) {
      if (xArr[index] !== xArr[len - index - 1]) {
        return false
      }
    }
    return true
  }
}

function isPalindrome_best(x) {
  if (x < 0) return false
  if (x < 10) return true
  if (x % 10 === 0) return false
  let rev = 0
  while (x >= 10) {
    let cur = x % 10
    rev = rev * 10 + cur
    if (x === rev) return true
    x = ~~(x / 10)
    if (x === rev) return true
    if (x < rev) return false
  }
  return false
}

console.log(isPalindrome_best(1000021))
