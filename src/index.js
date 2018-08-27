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
import "type/interview";
import "type/string";
import "type/array";
import "type/regexp";

// -------------
if (module.hot) {
  module.hot.accept();
}

// thinkpad10 性能跟不上 atom 的实在是不行 排除

// surface

// thinkpad x1 helix 发热量稍微大一些 价格稍微高了一些 相比较更想要 surface

// thinkpad tablet 2 性能不够
// thinkpad x1 tablet 太贵
