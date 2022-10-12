import { createRoot } from "react-dom/client";
import React, { useRef, useState } from "react";
import { CylinderGeometry, Mesh, MeshStandardMaterial } from "three";
import { ARCanvas, useHitTest, useXREvent } from "@react-three/xr";
import { Clone } from "@react-three/drei";

const createCylinders = (matrices) => {
  const geometry = new CylinderGeometry(0.1, 0.1, 0.4, 32);

  const cylinders = matrices.map((matrix) => {
    const material = new MeshStandardMaterial({ color: "green" });
    const mesh = new Mesh(geometry, material);

    matrix.decompose(mesh.position, mesh.rotation, mesh.scale);

    return mesh;
  });

  return cylinders;
};

const Reticle = () => {
  const mesh = useRef();
  const hitTestResultMatrix = useRef();
  const [placedGeometries, setPlacedGeometries] = useState([]);

  useHitTest((matrix) => {
    hitTestResultMatrix.current = matrix.clone();

    // new example in docuentation, which is not working
    matrix.decompose(mesh.current.position, mesh.current.rotation, mesh.current.scale);
    mesh.current.visible = true;
  });

  useXREvent("select", () => {
    if (!hitTestResultMatrix.current) {
      return;
    }

    const resultMatrix = hitTestResultMatrix.current;
    hitTestResultMatrix.current = null;
    mesh.current.visible = false;

    setPlacedGeometries([...placedGeometries, resultMatrix]);
  });

  return (
    <>
      <mesh ref={mesh} position={[0, 1, -0.4]} visible={false}>
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
  // Add requiredFeatures
  <ARCanvas sessionInit={{ requiredFeatures: ["hit-test", "local-floor"] }}>
    <hemisphereLight args={[0xffffff, 0xbbbbff, 1]} position={[10, 0, 0]} />
    <Reticle />
  </ARCanvas>
);

createRoot(document.getElementById("root")).render(<App />);
