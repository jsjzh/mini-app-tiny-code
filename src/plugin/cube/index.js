import { _log, ready } from "util";
import { RED, GREEN, YELLOW, BLUE, ORANGE, GREY } from "./cube";

ready(main)

function main() {
  const cube = document.querySelector("#cube");
  const gl = cube.getContext("webgl");
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
}