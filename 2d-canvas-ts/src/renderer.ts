import { Display } from "./display";
import { Size } from "./size";
import type { Vec2, Vec3 } from "./vector";


const FOV_FACTOR = 200;
const CAMERA_POSITION = 2;

export class Renderer {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  display: Display;
  size: Size;
  points: Vec3[] = [];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = this.canvas.getContext("2d");

    if (!context) {
      throw new Error("Context not available");
    }

    this.context = context;
    this.size = new Size(this.canvas);
    this.display = new Display(this.context, this.size);

    for (let x = -1; x < 1; x += 0.25) {
      for (let y = -1; y < 1; y += 0.25) {
        for (let z = -1; z < 1; z += 0.25) {
          this.points.push({
            x,
            y,
            z,
          });

        }
      }
    }

    this.update();
  }


  project(point: Vec3) {
    const projected_x = point.x / (point.z + CAMERA_POSITION);
    const projected_y = point.y / (point.z + CAMERA_POSITION);

    const projected_point: Vec2 = {
      x: projected_x * FOV_FACTOR,

      y: projected_y * FOV_FACTOR
    };

    return projected_point;
  }

  update() {
    // Add grid lines to the context buffer
    // this.context.beginPath();
    // this.display.draw_gird(30, "#2a2a2a");
    // this.context.stroke();
    for (const point of this.points) {
      const projected_point = this.project(point);
      this.display.draw_dot(projected_point.x, projected_point.y);


    }

    requestAnimationFrame(() => this.update());
  }
}

