function twoSum(nums, target) {
  if (nums.length < 3) return [0, 1];
  for (let index = 0; index < nums.length; index++) {
    const num = nums[index];
    let n = target - num;
    let ind = nums.findIndex(nu => nu === n);
    if (ind !== -1 && index !== ind) return [index, ind]
  }
}

function twoSum_best(nums, target) {
  if (nums.length === 2) return [0, 1];
  const len = nums.length;
  let map = {};
  for (let i = 0; i < len; i++) {
    let n = target - nums[i];
    let find = map[n];
    if (find !== undefined) return [find, i];
    else map[nums[i]] = i;
  }
};

console.log(twoSum([3, 2, 4], 6))
console.log(twoSum_best([3, 2, 4], 6))