// var addBinary = function(a, b) {
//   return (parseInt(a, 2) + parseInt(b, 2)).toString(2)
// };

var addBinary = function(a, b) {
  let i = a.length - 1;
  let j = b.length - 1;
  let carry = 0;
  let result = "";
  while (i >= 0 || j >= 0) {
    let aDigit = a[i] || "0";
    let bDigit = b[j] || "0";
    let temp = parseInt(aDigit) + parseInt(bDigit) + carry;
    let digit = temp % 2;
    carry = Math.floor(temp / 2);
    result = digit + result;
    i--;
    j--;
  }
  if (carry !== 0) result = carry + result;
  return result;
};

console.log(
  addBinary(
    "10100000100100110110010000010101111011011001101110111111111101000000101111001110001111100001101",
    "110101001011101110001111100110001010100001101011101010000011011011001011101111001100000011011110011"
  )
);
