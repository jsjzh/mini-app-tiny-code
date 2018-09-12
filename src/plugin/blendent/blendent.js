//这里是一个配色器
;
(function (global, _plugin) {
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
    /**
     * 获取 (xxx,yyy,zzz) 中的 xxx yyy zzz
     * @param {String} color rgb(xxx,yyy,zzz) or hsl(xxx,yyy,zzz)
     * @param {Boolean} flag 是否要去除 hsl 中的 %
     */
    getColorNumber(color, flag = true) {
      return color.split(/[hsl\(,rgb\(,\,\s,,\)]/i).reduce((sum, item) => (item ? [...sum, flag ? item.match("%") ? item.slice(0, -1) : item : item] : sum), [])
    },

    /**
     * 获取互补色
     * @param {Number} color 传入颜色
     */
    mutually(color) {
      return [color, color > 180 ? color - 180 : color + 180];
    },

    /**
     * 获取近似色
     * @param {Number} color 传入颜色
     * @param {Number} number 需要获取几组近似色
     * @param {Number} count 获取的相似度，本意就是色相的分块细度
     */
    similarity(color, number = 1, count = 12) {
      let chunkAngle = 360 / count;
      let arr = [color];
      while (number) {
        arr.push((color + chunkAngle * number) > 360 ? color + chunkAngle * number - 360 : color + chunkAngle * number);
        arr.unshift((color - chunkAngle * number) < 0 ? color - chunkAngle * number + 360 : color - chunkAngle * number);
        number--;
      }
      return arr
    },

    /**
     * 获取三角色
     * @param {Number} color 传入颜色
     */
    triangle(color) {
      return [color, color + 120 > 360 ? color - 240 : color + 120, color + 240 > 360 ? color - 120 : color + 240]
    },

    /**
     * 获取分裂互补色
     * @param {Number} color 传入颜色
     * @param {Boolean} flag 第一个向前或者向后取值
     * @param {Number} count 分块大小
     */
    split(color, flag = true, count = 12) {
      let chunkAngle = 360 / count;
      return [color, flag ? color + chunkAngle * 2 > 360 ? color + chunkAngle * 2 - 360 : color + chunkAngle * 2 : color - chunkAngle * 2 < 0 ? 360 + color - chunkAngle * 2 : color - chunkAngle * 2, color + chunkAngle + 180 > 360 ? color + chunkAngle - 180 : color + chunkAngle + 180];
    },

    /**
     * 获取双分裂互补色
     * @param {Number} color 传入颜色
     * @param {Boolean} flag 第一个向前或者向后取值
     * @param {Number} count 分块大小
     */
    doubleSplit(color, flag = true, count = 12) {
      let chunkAngle = 360 / count;
      return [color, flag ? color + chunkAngle * 2 > 360 ? 360 - color + chunkAngle * 2 : color + chunkAngle * 2 : color - chunkAngle * 2 < 0 ? 360 + color + chunkAngle * 2 : color - chunkAngle * 2, flag ? color + 180 > 360 ? color - 180 : color + 180 : color - 180 < 0 ? color + 180 : color - 180, flag ? color + chunkAngle * 2 + 180 > 360 ? color + chunkAngle * 2 - 180 : color + chunkAngle * 2 + 180 : color + chunkAngle * 2 - 180 < 0 ? color + chunkAngle * 2 + 180 : color + chunkAngle * 2 - 180];
    },

    /**
     * 正方形配色
     * @param {Number} color 传入颜色
     */
    square(color) {
      let chunkQuarter = 360 / 4;
      return [color, color + chunkQuarter > 360 ? color + chunkQuarter - 360 : color + chunkQuarter, color + 180 > 360 ? color - 180 : color + 180, color + chunkQuarter + 180 > 360 ? color + chunkQuarter - 180 : color + chunkQuarter + 180]
    },
  }

  return _blendent
}).call(this))