var searchInsert = function(nums, target) {
  if (nums.indexOf(target) !== -1) return nums.indexOf(target)
  return [...nums, target].sort((a, b) => a - b).indexOf(target)
};

console.log(searchInsert([3, 5, 7, 9, 10], 8));