import {
  Scene,
  PerspectiveCamera,
  AmbientLight,
  PointLight,
  SphereGeometry,
  MeshStandardMaterial,
  Mesh,
  WebGLRenderer,
  BoxGeometry,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const createScene = () => {
  return new Scene();
};

export const createCamera = () => {
  const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 0);
  return camera;
};

export const createLights = () => {
  const ambientLight = new AmbientLight("white", 0.2);
  const pointLight = new PointLight("red", 3);
  pointLight.position.set(10, 0, 0);

  return [ambientLight, pointLight];
};

export const createBox = () => {
  const geometry = new BoxGeometry(3, 0.05, 3);
  const material = new MeshStandardMaterial({ color: "grey" }); // standard material reflects light
  const box = new Mesh(geometry, material);
  box.position.set(0, -2, -4);

  return box;
};

const SPHERE_POSITION = [0, -0.5, -4];
export const createShere = () => {
  const geometry = new SphereGeometry(1, 15, 15);
  const material = new MeshStandardMaterial({ color: "white", wireframe: true });
  const sphere = new Mesh(geometry, material);
  sphere.position.set(...SPHERE_POSITION);
  return sphere;
};

export const createArSphere = () => {
  const geometry = new SphereGeometry(0.1, 15, 15);
  const material = new MeshStandardMaterial({ color: "white" });
  const sphere = new Mesh(geometry, material);
  sphere.position.set(0, 0, -0.5);
  return sphere;
};

export const create2DRenderer = () => {
  const renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  return renderer;
};

export const createVrRenderer = () => {
  const renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;
  return renderer;
};

export const createArRenderer = () => {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;
  return renderer;
};

export const createInteractivityControls = (camera, renderer) => {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(...SPHERE_POSITION);
  controls.update();
  return controls;
};

export const setupWindowResize = (camera, renderer) => {
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
};
