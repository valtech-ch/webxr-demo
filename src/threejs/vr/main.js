import { VRButton } from "three/examples/jsm/webxr/VRButton.js";
import {
  createScene,
  createCamera,
  createLights,
  createSphere,
  createVrRenderer,
  createBox,
  createInteractivityControls,
  setupWindowResize,
} from "../helper/createBasicScene";

// https://threejs.org/docs/#manual/en/introduction/How-to-create-VR-content

const scene = createScene();
const camera = createCamera();
const lights = createLights();
const box = createBox();
const sphere = createSphere();
const renderer = createVrRenderer(); // new renderer
scene.add(...lights, box, sphere);
setupWindowResize(camera, renderer, scene);

const controls = createInteractivityControls(camera, renderer); // move around object

const animate = () => {
  renderer.setAnimationLoop(animate); // before: requestAnimationFrame
  sphere.rotation.y += 0.005;
  controls.update();
  renderer.render(scene, camera);
};
animate();

document.body.appendChild(renderer.domElement);

// VR button creates a WebXR Device API session
document.body.appendChild(VRButton.createButton(renderer));

// Polyfill is available, but does not work only work for devices with WebVR support
// -> iPhones are not supported
// import WebXRPolyfill from "webxr-polyfill";
// new WebXRPolyfill();
