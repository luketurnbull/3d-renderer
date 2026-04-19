export class Rectangle {
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
  width: number;
  height: number;
  colour: string;

  constructor(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, colour: string) {
    this.context = context;

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.colour = colour;
  }

  draw() {
    this.context.fillStyle = this.colour;
    this.context.fillRect(this.x, this.y, this.width, this.height);

  }
}
