import {
  Scene,
  PerspectiveCamera,
  AmbientLight,
  PointLight,
  HemisphereLight,
  SphereGeometry,
  MeshStandardMaterial,
  Mesh,
  WebGLRenderer,
  BoxGeometry,
  RingGeometry,
  MeshBasicMaterial,
  CylinderGeometry,
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

export const createHemisphereLight = () => {
  const light = new HemisphereLight(0xffffff, 0xbbbbff, 1);
  light.position.set(10, 0, 0);
  return light;
};

export const createBox = () => {
  const geometry = new BoxGeometry(3, 0.05, 3);
  const material = new MeshStandardMaterial({ color: "grey" }); // standard material reflects light
  const box = new Mesh(geometry, material);
  box.position.set(0, -2, -4);
  return box;
};

export const getCylinderCreationFn = () => {
  // reuse geometry for performance
  const geometry = new CylinderGeometry(0.1, 0.1, 0.4, 32);

  return () => {
    const material = new MeshStandardMaterial({ color: 0xffffff * Math.random() });
    const mesh = new Mesh(geometry, material);
    return mesh;
  };
};

const SPHERE_POSITION = [0, -0.5, -4];
export const createSphere = () => {
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

export const createReticle = () => {
  const geometry = new RingGeometry(0.15, 0.2, 32);
  geometry.rotateX(-Math.PI / 2); // -90deg
  const material = new MeshBasicMaterial(); // no light reflection
  const reticle = new Mesh(geometry, material);
  reticle.matrixAutoUpdate = false;
  reticle.visible = false;
  return reticle;
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

export const setupWindowResize = (camera, renderer, scene) => {
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  });
};

export const setupHitTestingRendering = (renderer, reticle, scene, camera) => {
  let hitTestSource = null;
  let hitTestSourceRequested = false;

  const renderFn = (_timestamp, frame) => {
    if (frame) {
      // get coordinate system from the users environment
      const referenceSpace = renderer.xr.getReferenceSpace();
      // ongoing XR session, providing methods and properties used to interact with and control the session (MDN)
      const session = renderer.xr.getSession();

      if (!hitTestSourceRequested) {
        // https://developer.mozilla.org/en-US/docs/Web/API/XRSession/requestReferenceSpace
        session.requestReferenceSpace("viewer").then((referenceSpace) => {
          session.requestHitTestSource({ space: referenceSpace }).then((source) => {
            // handles hit test subscriptions
            hitTestSource = source;
          });
        });

        session.addEventListener("end", () => {
          hitTestSourceRequested = false;
          hitTestSource = null;
        });

        hitTestSourceRequested = true;
      }

      if (hitTestSource) {
        // no result: []
        // result: [XRHitTestResult] 1 or more
        const hitTestResults = frame.getHitTestResults(hitTestSource);

        if (hitTestResults.length) {
          const hit = hitTestResults[0];

          // a three dimensional position and orientation in a three dimensional coordinate system
          const pose = hit.getPose(referenceSpace);

          reticle.matrix.fromArray(pose.transform.matrix);
          reticle.visible = true;
        } else {
          reticle.visible = false;
        }
      }
    }

    renderer.render(scene, camera);
  };

  return renderFn;
};
