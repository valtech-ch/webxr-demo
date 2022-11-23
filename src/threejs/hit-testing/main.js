// https://github.com/mrdoob/three.js/blob/master/examples/webxr_ar_hittest.html

import { ARButton } from "three/examples/jsm/webxr/ARButton";
import {
  createScene,
  createCamera,
  createArRenderer,
  setupWindowResize,
  createHemisphereLight,
  createReticle,
  setupHitTestingRendering,
  getCylinderCreationFn,
} from "../helper/createBasicScene";

const scene = createScene();
const camera = createCamera();
const light = createHemisphereLight();
const reticle = createReticle(); // indicate where object can be placed
scene.add(light, reticle);

const renderer = createArRenderer();
setupWindowResize(camera, renderer);

const controller = renderer.xr.getController(0);
const createCylinder = getCylinderCreationFn();
controller.addEventListener("select", () => {
  // only visible when surface was detected
  if (reticle.visible) {
    const cylinder = createCylinder();
    // use the position of the reticle to place the cylinder
    reticle.matrix.decompose(cylinder.position, cylinder.quaternion, cylinder.scale);
    scene.add(cylinder);
  }
});
scene.add(controller);

const hitTestingRenderFn = setupHitTestingRendering(renderer, reticle, scene, camera);
renderer.setAnimationLoop(hitTestingRenderFn);

document.body.appendChild(renderer.domElement);
document.body.appendChild(ARButton.createButton(renderer, { requiredFeatures: ["hit-test"] })); // add required feature
