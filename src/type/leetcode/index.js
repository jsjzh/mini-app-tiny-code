var twoSum = function(nums, target) {
  for (let index = 0; index < nums.length; index++) {
    const number = nums[index]
    let other = target - number
    let _index = nums.indexOf(other)
    if (_index !== -1 && _index !== index) {
      return [index, _index]
    } else {
      continue
    }
  }
  return []
}

var reverse = function(num) {
  if (num < -Math.pow(2, 31) || num > Math.pow(2, 31) - 1 || num === 0) return 0
  let flag = false
  if (num > 0) flag = true
  num = Math.abs(num)
    .toString()
    .split('')
    .reverse()
    .join('')
  if (flag) num = +num
  else num = -+num

  if (num < -Math.pow(2, 31) || num > Math.pow(2, 31) - 1) return 0
  else return num
}
