import type { Size } from "./renderer";

type GridOptions = {
  spacing: number;
  colour: string;
}

export class Grid {
  private context: CanvasRenderingContext2D;
  private options: GridOptions;

  constructor(context: CanvasRenderingContext2D, options: GridOptions) {
    this.context = context;
    this.options = options;
  }

  draw(size: Size) {
    this.context.strokeStyle = this.options.colour;
    this.context.lineWidth = 1;

    for (let x = 0; x < size.width; x += this.options.spacing) {
      this.context.moveTo(x, 0);
      this.context.lineTo(x, size.height);
    }

    for (let y = 0; y < size.height; y += this.options.spacing) {
      this.context.moveTo(0, y);
      this.context.lineTo(size.width, y);
    }

  }
}
