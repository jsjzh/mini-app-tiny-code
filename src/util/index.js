export function _log(first, second) {
  arguments.length === 1 ? (console.log(first, ` --- ${first}`)) : arguments.length === 2 ? (console.log(first === second, `${first} --- ${second}`)) : (console.log("err"));
}