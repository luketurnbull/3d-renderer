export class Renderer {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Context not available");
    }

    this.context = context;

    this.update();
  }

  update() {
    // Do some stuff
    console.log("Hit");
    requestAnimationFrame(() => this.update());
  }
}
