import { Grid } from "./grid";
import { Rectangle } from "./rectangle";

const colours = ["#ff0000", "#00ff00", "#0000ff", "#f0f0f0", "#a1ffee", "#ffff00", "#00ffff", "#0ffff0", "#1111ff", "#ff1111", "#f1111f"]

export type Size = {
  width: number;
  height: number;
};

export class Renderer {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  display: Display;
  sizeObserver: ResizeObserver;
  size: Size = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  grid: Grid;
  rectangles: Rectangle[] = [];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Context not available");
    }

    this.context = context;

    this.display = new Display(this.context);

    this.grid = new Grid(this.context, {
      spacing: 30,
      colour: "#000000"
    });


    // Track window size change
    this.sizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      const box = entry.devicePixelContentBoxSize[0];
      this.resize(box.inlineSize, box.blockSize);
    });


    this.sizeObserver.observe(this.canvas);
    this.update();
  }

  resize(width: number, height: number) {
    this.size = {
      width,
      height,
    };

    this.canvas.width = width;
    this.canvas.height = height;
  }

  update() {

    // Add grid lines to the context buffer
    this.context.beginPath();
    this.grid.draw(this.size);
    this.context.stroke();

    this.display.draw_dot(10, 10);


    requestAnimationFrame(() => this.update());
  }
}

class Display {
  context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
  }

  draw_dot(x: number, y: number) {
    this.context.fillStyle = "#ff0000";
    this.context.fillRect(x, y, 5, 5);
  }
}
