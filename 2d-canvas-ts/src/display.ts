import type { Size } from "./size";

export class Display {
  context: CanvasRenderingContext2D;
  size: Size;

  constructor(context: CanvasRenderingContext2D, size: Size) {
    this.context = context;
    this.size = size;
  }

  draw_dot(x: number, y: number) {
    if (x > this.size.width) {
      return;
    }

    if (y > this.size.height) {
      return;
    }

    this.context.fillStyle = "#ff0000";
    this.context.fillRect(x + this.size.width / 2, y + this.size.height / 2, 5, 5);
  }

  draw_gird(spacing: number, colour: string) {

    this.context.strokeStyle = colour;
    this.context.lineWidth = 1;

    for (let x = 0; x < this.size.width; x += spacing) {
      this.context.moveTo(x, 0);
      this.context.lineTo(x, this.size.height);
    }

    for (let y = 0; y < this.size.height; y += spacing) {
      this.context.moveTo(0, y);
      this.context.lineTo(this.size.width, y);
    }

  }
}

