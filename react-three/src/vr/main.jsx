import { createRoot } from "react-dom/client";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { VRCanvas } from "@react-three/xr";

const Box = () => (
  <mesh position={[0, -2, -4]}>
    <boxGeometry args={[3, 0.05, 3]} />
    <meshStandardMaterial color="grey" />
  </mesh>
);

const SPHERE_POSITION = [0, -0.5, -4];
const Sphere = () => {
  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.y += 0.005;
  });

  return (
    <mesh ref={ref} position={SPHERE_POSITION}>
      <sphereGeometry args={[1, 15, 15]}></sphereGeometry>
      <meshStandardMaterial color="white" wireframe />
    </mesh>
  );
};

const App = () => (
  // Use VRCanvas instead of Canvas
  <VRCanvas>
    <color attach="background" args={["black"]} />
    <PerspectiveCamera
      makeDefault
      fov={75}
      aspect={window.innerWidth / window.innerHeight}
      near={0.1}
      far={100}
      position={[0, 0, 0]}
    ></PerspectiveCamera>
    {/* Add OrbitControls with target  */}
    <OrbitControls target={SPHERE_POSITION} />
    <ambientLight color="white" intensity={0.2} />
    <pointLight color="red" intensity={3} position={[10, 0, 0]} />
    <Box />
    <Sphere />
  </VRCanvas>
);

createRoot(document.getElementById("root")).render(<App />);
