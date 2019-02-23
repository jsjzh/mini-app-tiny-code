### Vue 生命周期

使用了 callHook() 进行钩子函数调用，这些钩子函数可以传递数组

- new Vue()
- init
  - lifecycle
    - 在这里会初始化各种初始属性
  - events
    - listeners
  - render
    - 初始化了一些挂在实例上的创建 dom 的函数
- callHook("beforeCreate")
- init
  - inject
    - 初始化父代注入的数据
  - state
    - props methods data computed watch
  - provide
    - 声明自身想要注入子代的数据
- callHook("created")
- 是否有 el 属性
  - 如果实例化时存在这个选项，实例将立即进入编译过程，否则，需要显示调用 $mount() 手动开启编译
- 是否有 render 函数
  - 如果不存在该函数，则大概是完整版（带有 compile 函数）
    - 会去获取 template 属性，该属性若是字符串，并且第一个字符是 #，则会去获取该 id 的 dom 元素
    - 若 template 属性也不存在，就会去获取 el 元素的 outerHTML 用作 template