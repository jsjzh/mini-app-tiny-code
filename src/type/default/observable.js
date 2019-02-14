function observe(ctx, value, cb) {
  Object.keys(value).forEach(key => defineReactive(ctx, value, key, value[key], cb))
}

function defineReactive(ctx, obj, key, val, cb) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: () => {
      return val
    },
    set: newVal => {
      val = newVal
      cb.call(ctx)
    }
  })
}

function _proxy(data) {
  const that = this
  Object.keys(data).forEach(key => {
    Object.defineProperty(that, key, {
      configurable: true,
      enumerable: true,
      get: function proxyGetter() {
        return that._data[key]
      },
      set: function proxySetter(val) {
        that._data[key] = val
      }
    })
  })
}

class Vue {
  constructor(options) {
    this._data = options.data
    observe(this, this._data, options.render)
    _proxy.call(this, options.data)
  }
}

let data = {
  text: 'textsss',
  text2: 'text2'
}

let app = new Vue({
  el: '#app',
  data,
  render() {
    console.log(this)
  }
})

app.text = 123
