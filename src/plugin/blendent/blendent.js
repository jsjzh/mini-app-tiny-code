//这里是一个配色器
;(function (global, _plugin) {
  // debugger
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = _plugin;
  } else if (typeof define === "function" && define.amd) {
    define("_blendent", [], function () {
      return _plugin;
    })
  } else {
    !('_blendent' in global) && (global._blendent = _plugin)
  }
})(typeof window !== "undefined" ? window : this, (function () {
  var _blendent;
  _blendent = {
    name: "_blendent"
  }

  return _blendent
}).call(this))