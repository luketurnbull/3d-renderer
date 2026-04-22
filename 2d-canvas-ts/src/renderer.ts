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

    this.grid = new Grid(this.context, {
      spacing: 30,
      colour: "#000000"
    });

    for (let i = 0; i < 10; i++) {
      this.rectangles.push(

        new Rectangle(
          this.context,
          Math.random() * i * 100,
          Math.random() * i * 100,
          Math.random() * i * 100,
          Math.random() * i * 100,
          colours[Math.ceil(Math.random() * 10)]
        )
      )
    }

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
    this.context.beginPath();

    // Add grid lines to the context buffer
    this.grid.draw(this.size);

    this.context.stroke();
    // Add rectangle lines to the context buffer
    for (const rectangle of this.rectangles) {
      rectangle.draw();

    }


    requestAnimationFrame(() => this.update());
  }
}

