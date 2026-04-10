import { Renderer } from "./renderer";
import "./style.css";

function init() {
  const canvas = document.getElementById("renderer");

  if (!canvas) {
    throw new Error("Canvas does not exist");
  }

  new Renderer(canvas as HTMLCanvasElement);
}

init();
