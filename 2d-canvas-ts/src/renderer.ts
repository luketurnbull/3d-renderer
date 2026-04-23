import { Display } from "./display";
import { Size } from "./size";
import type { Vec2 } from "./vector";

export class Renderer {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  display: Display;
  size: Size;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = this.canvas.getContext("2d");

    if (!context) {
      throw new Error("Context not available");
    }

    this.context = context;
    this.size = new Size(this.canvas);
    this.display = new Display(this.context, this.size);

    this.update();
  }

  update() {
    // Add grid lines to the context buffer
    this.context.beginPath();
    this.display.draw_gird(30, "#2a2a2a")
    this.context.stroke();

    const point: Vec2 = {
      x: this.size.width / 2,
      y: this.size.height / 2
    };

    this.display.draw_dot(point.x, point.y);

    requestAnimationFrame(() => this.update());
  }
}

