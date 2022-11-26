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
setupWindowResize(camera, renderer, scene);

const controller = renderer.xr.getController(0);
const createCylinder = getCylinderCreationFn(); // mesh factory function

// place cylinder in the room when hit result is found / reticle is visible
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

// function to run after ARButton has requested the WebXR session
const hitTestingRenderFn = setupHitTestingRendering(renderer, reticle, scene, camera);
renderer.setAnimationLoop(hitTestingRenderFn);

document.body.appendChild(renderer.domElement);

// Enable hit testing features for performing hit tests against real world geometry.
// https://developer.mozilla.org/en-US/docs/Web/API/XRSystem/requestSession
document.body.appendChild(ARButton.createButton(renderer, { requiredFeatures: ["hit-test"] }));
