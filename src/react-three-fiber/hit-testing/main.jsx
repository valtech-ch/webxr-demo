import { createRoot } from "react-dom/client";
import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ARButton, XR, useHitTest, useXREvent } from "@react-three/xr";
import { Clone } from "@react-three/drei";
import { CylinderGeometry, Mesh, MeshStandardMaterial } from "three";

const createCylinders = (matrices) => {
  const geometry = new CylinderGeometry(0.1, 0.1, 0.4, 32);

  const cylinders = matrices.map((matrix) => {
    const material = new MeshStandardMaterial({
      color: 0xffffff * matrix.toArray().reduce((acc, curr) => acc + curr),
    });
    const mesh = new Mesh(geometry, material);

    matrix.decompose(mesh.position, mesh.rotation, mesh.scale);

    return mesh;
  });

  return cylinders;
};

const Reticle = () => {
  const reticle = useRef();
  const [reticleVisible, setReticleVisible] = useState(false);
  const hitTestResultMatrix = useRef();
  const [placedGeometries, setPlacedGeometries] = useState([]);

  useHitTest((hitMatrix) => {
    hitTestResultMatrix.current = hitMatrix.clone();
    hitMatrix.decompose(reticle.current.position, reticle.current.rotation, reticle.current.scale);
    setReticleVisible(true);
  });

  useXREvent("select", () => {
    if (!hitTestResultMatrix.current) {
      return;
    }

    setPlacedGeometries([...placedGeometries, hitTestResultMatrix.current]);
  });

  return (
    <>
      <mesh ref={reticle} visible={reticleVisible}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.15, 0.2, 32]} />
          <meshBasicMaterial />
        </mesh>
      </mesh>
      {createCylinders(placedGeometries).map((cylinder) => (
        <Clone key={cylinder.uuid} object={cylinder} />
      ))}
    </>
  );
};

const App = () => (
  <>
    <ARButton />
    <Canvas className="fullscreen-canvas">
      <XR>
        <hemisphereLight args={[0xffffff, 0xbbbbff, 1]} position={[10, 0, 0]} />
        {/* display possible positions to position objects */}
        <Reticle />
      </XR>
    </Canvas>
  </>
);

createRoot(document.getElementById("root")).render(<App />);
