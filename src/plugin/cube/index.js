import { _log, ready } from "util";
import { RED, GREEN, YELLOW, BLUE, ORANGE, GREY } from "./cube";

// ready(main);

// window.onload = main;



class Cube {
  constructor() {
    this.canvas = undefined;
    this.cube = undefined;
    this.init();
  }

  renderBg() {
    this.cube.clearColor(0.0, 0.0, 0.0, 1.0);
    this.cube.clear(this.cube.COLOR_BUFFER_BIT);
  }

  init() {
    this.canvas = document.getElementById("cube");
    this.cube = this.canvas.getContext("webgl");
    this.cube && this.renderBg();
  }
}

let cube;

let timer = setTimeout(() => {
  cube = new Cube();
}, 0);

timer = null;
cube = null;