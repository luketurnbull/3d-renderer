
export class Size {
  canvas: HTMLCanvasElement;
  sizeObserver: ResizeObserver;
  width: number = 0;
  height: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.sizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      const box = entry.devicePixelContentBoxSize[0];
      this.resize(box.inlineSize, box.blockSize);
    });

    this.sizeObserver.observe(this.canvas);
  }


  resize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
  }
}


