import { createRoot } from "react-dom/client";
import { useRef } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ARButton, XR, useInteraction } from "@react-three/xr";
import { Vector3 } from "three";

const ArSphere = () => {
  const sphere = useRef();

  // add click interaction
  useInteraction(sphere, "onSelect", () => {
    sphere.current.scale.add(new Vector3(1.1, 1.1, 1.1));
  });

  return (
    <mesh ref={sphere} position={[0, 1, -0.4]}>
      <sphereGeometry args={[0.1, 15, 15]}></sphereGeometry>
      <meshStandardMaterial color="white" />
    </mesh>
  );
};

const App = () => (
  <>
    {/* change to ARButton */}
    <ARButton />
    <Canvas className="fullscreen-canvas">
      <XR>
        {/* remove canvas background color */}
        <PerspectiveCamera
          makeDefault
          fov={75}
          aspect={window.innerWidth / window.innerHeight}
          near={0.1}
          far={100}
          position={[0, 0, 0]}
        ></PerspectiveCamera>
        <ambientLight color="white" intensity={0.03} />
        {/* lower pointLight intensity to achive same result */}
        <pointLight color="red" intensity={1.5} position={[10, 0, 0]} />
        <ArSphere />
      </XR>
    </Canvas>
  </>
);

createRoot(document.getElementById("root")).render(<App />);
