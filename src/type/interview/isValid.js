const map = { "(": ")", "{": "}", "[": "]" };

function isValid(s) {
  if (s.length % 2 !== 0 || s.length === 0) return false;
  if (s.length === 2) {
    if (map[s[0]] === s[1]) {
      return true;
    } else {
      return false;
    }
  }
  for (let index = 0; index < s.length / 2; index++) {
    const element = s[index];
    if (element !== s[s.length - index]) return false;
  }
  return true;
}

console.log(isValid("()[]{}"));
