// 在 webpack.config.js 中配置了 alias
// 会自动解析 static 为 webpack.config.js 目录下的 utils.resolve("static")
import "static/css/normalize.css";
import "static/css/reset.css";
import "static/css/github-markdown.css";
import "./index.scss";

const app = document.getElementById("app");
app.innerHTML = require("./index.html");
// -------------
// 开始写项目代码
/**
 * 说明
 * extends
 *  继承
 * new
 *  new 关键字
 * prototype
 *  原型链
 * logic
 *  逻辑
 * interview
 *  面试题
 * string
 *  String 相关
 * array
 *  Array 相关
 * regexp
 *  Regexp 相关
 */
import "plugin/cube";
// import "type/prototype";
// import "type/new";
// import "type/extends";
// import "type/class";
// import "type/functionClass";
// import "type/logic";
// import "type/interview";
// import "type/string";
// import "type/array";
// import "type/regexp";
// -------------
if (module.hot) {
  console.log("------------------------ 天了噜 (╯‵□′)╯︵ 热更新了 ------------------------");
  module.hot.accept();
}