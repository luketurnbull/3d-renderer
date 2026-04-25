import { Display } from "./display";
import { Size } from "./size";
import type { Vec2, Vec3 } from "./vector";


const FOV_FACTOR = 640;
const CAMERA_POSITION: Vec3 = {
  x: 0,
  y: 0,
  z: -5
};

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
    const projected_x = (point.x * FOV_FACTOR) / point.z;
    const projected_y = (point.y * FOV_FACTOR) / point.z;

    const projected_point: Vec2 = {
      x: projected_x,
      y: projected_y
    };

    return projected_point;
  }

  update() {
    // Add grid lines to the context buffer
    // this.context.beginPath();
    // this.display.draw_gird(30, "#2a2a2a");
    // this.context.stroke();
    //
    console.log(this.points[0].z);
    for (const point of this.points) {

      // Move point away from the camera
      const newPoint: Vec3 = {
        x: point.x,
        y: point.y,
        z: point.z - CAMERA_POSITION.z
      };

      const projected_point = this.project(newPoint);


      this.display.draw_dot(projected_point.x, projected_point.y);


    }

    requestAnimationFrame(() => this.update());
  }
}

