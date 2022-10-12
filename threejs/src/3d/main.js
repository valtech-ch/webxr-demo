import {
  createScene,
  createCamera,
  createLights,
  createBox,
  createSphere,
  create2DRenderer,
  setupWindowResize,
} from "../helper/createBasicScene";

const scene = createScene();
const camera = createCamera();
const lights = createLights();
const box = createBox();
const sphere = createSphere();
const renderer = create2DRenderer();
scene.add(...lights, box, sphere);
setupWindowResize(camera, renderer);

const animate = () => {
  requestAnimationFrame(animate);
  sphere.rotation.y += 0.005;
  renderer.render(scene, camera);
};
animate();

document.body.appendChild(renderer.domElement);
