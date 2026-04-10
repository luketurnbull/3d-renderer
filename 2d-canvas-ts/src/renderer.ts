type Size = {
  width: number;
  height: number;
};

export class Renderer {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  size: Size = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  sizeObserver: ResizeObserver;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Context not available");
    }

    this.context = context;

    // Track window size change
    this.sizeObserver = new ResizeObserver(() => {
      this.resize();
    });

    this.sizeObserver.observe(this.canvas);
    this.update();
  }

  resize() {
    this.size = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    console.log(this.size);
  }

  update() {
    // Do some stuff
    console.log("Hit");
    requestAnimationFrame(() => this.update());
  }
}
