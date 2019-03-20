function longestCommonPrefix(arr) {
  if (arr.length === 0) return ''
  return arr.reduce((pre, cur) => {
    let str = ''
    let len = Math.min(pre.length, cur.length)
    for (let index = 0; index < len; index++) {
      if (pre[index] !== cur[index]) {
        break
      } else {
        str += pre[index]
      }
    }
    return str
  })
}

console.log(longestCommonPrefix(['aca', 'cba']))
