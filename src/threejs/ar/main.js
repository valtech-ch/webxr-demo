import { Vector3 } from "three";
import { ARButton } from "three/examples/jsm/webxr/ARButton";
import {
  createScene,
  createCamera,
  createLights,
  createArRenderer,
  createArSphere,
  setupWindowResize,
} from "../helper/createBasicScene";

const scene = createScene();
const camera = createCamera();
const lights = createLights();
const sphere = createArSphere();
scene.add(...lights, sphere);

const renderer = createArRenderer(); // new renderer
setupWindowResize(camera, renderer, scene);

const controller = renderer.xr.getController(0); // new XR controller
controller.addEventListener("select", () => {
  sphere.scale.add(new Vector3(1.1, 1.1, 1.1));
});
scene.add(controller);

const animate = () => {
  renderer.setAnimationLoop(animate);
  renderer.render(scene, camera);
};
animate();

document.body.appendChild(renderer.domElement);
document.body.appendChild(ARButton.createButton(renderer)); // add AR button
