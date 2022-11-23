import {
  createScene,
  createCamera,
  createLights,
  createBox,
  createSphere,
  create2DRenderer,
  setupWindowResize,
} from "../helper/createBasicScene";

// Scene: object that includes everything to display
const scene = createScene();

// Renderer: displays scenes using WebGL
const renderer = create2DRenderer();

// Camera: viewers perspective
const camera = createCamera();

// Light (one or many): needed to see the objects
const lights = createLights();

// Mesh object to display (consists of a geometry and a material)
const box = createBox();
const sphere = createSphere();

// Combine everything
scene.add(...lights, box, sphere);
renderer.render(scene, camera);
document.body.appendChild(renderer.domElement);

// Allow resizing
setupWindowResize(camera, renderer, scene);

// Add rotation
const animate = () => {
  requestAnimationFrame(animate);
  sphere.rotation.y += 0.005;
  renderer.render(scene, camera);
};
animate();
