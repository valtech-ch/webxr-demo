import { createRoot } from "react-dom/client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { VRButton, XR } from "@react-three/xr";

const Box = () => (
  <mesh position={[0, -2, -4]}>
    <boxGeometry args={[3, 0.05, 3]} />
    <meshStandardMaterial color="grey" />
  </mesh>
);

const SPHERE_POSITION = [0, -0.5, -4];
const Sphere = () => {
  const sphere = useRef();
  useFrame(() => (sphere.current.rotation.y += 0.005));

  return (
    <mesh ref={sphere} position={SPHERE_POSITION}>
      <sphereGeometry args={[1, 15, 15]}></sphereGeometry>
      <meshStandardMaterial color="white" wireframe />
    </mesh>
  );
};

const App = () => (
  <>
    {/* add vr button */}
    <VRButton />
    <Canvas className="fullscreen-canvas">
      {/* WebXR manager that configures  scene */}
      <XR>
        <color attach="background" args={["black"]} />
        <PerspectiveCamera
          makeDefault
          fov={75}
          aspect={window.innerWidth / window.innerHeight}
          near={0.1}
          far={100}
          position={[0, 0, 0]}
        ></PerspectiveCamera>
        {/* add controls to interact with the VR scene  */}
        <OrbitControls target={SPHERE_POSITION} />
        <ambientLight color="white" intensity={0.2} />
        <pointLight color="red" intensity={3} position={[10, 0, 0]} />
        <Box />
        <Sphere />
      </XR>
    </Canvas>
  </>
);

createRoot(document.getElementById("root")).render(<App />);
