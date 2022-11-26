import { createRoot } from "react-dom/client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";

const Box = () => (
  // all three.js exports are native to React Three Fiber: mesh, boxGeometry, etc.
  <mesh position={[0, -2, -4]}>
    {/* prop "width" is not working */}
    <boxGeometry args={[3, 0.05, 3]} />
    <meshStandardMaterial color="grey" />
  </mesh>
);

const Sphere = () => {
  const ref = useRef();
  useFrame(() => (ref.current.rotation.y += 0.005));

  return (
    <mesh ref={ref} position={[0, -0.5, -4]}>
      <sphereGeometry args={[1, 15, 15]}></sphereGeometry>
      <meshStandardMaterial color="white" wireframe />
    </mesh>
  );
};

const App = () => (
  <Canvas className="fullscreen-canvas">
    <color attach="background" args={["black"]} />
    {/* some of the three components are needed from @react-three/drei. <perspectiveCamera> is not working */}
    <PerspectiveCamera
      makeDefault
      fov={75}
      aspect={window.innerWidth / window.innerHeight}
      near={0.1}
      far={100}
      position={[0, 0, 0]}
    ></PerspectiveCamera>
    <ambientLight color="white" intensity={0.2} />
    <pointLight color="red" intensity={3} position={[10, 0, 0]} />
    <Box />
    <Sphere />
  </Canvas>
);

createRoot(document.getElementById("root")).render(<App />);
