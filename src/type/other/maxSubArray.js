var maxSubArray = function(nums) {
  for (let i = 1; i < nums.length; i++) {
    nums[i] = Math.max(nums[i], nums[i] + nums[i - 1])
  }
  console.log(nums)
  return Math.max(...nums)
}

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))
