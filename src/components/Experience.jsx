import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three"
import { Dragon } from "./Dragon";
export const Experience = () => {
  const map = useTexture("textures/f9cd8fac-841f-4c02-bd17-6f5e5f1b7d86.jpeg")
  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />
      <OrbitControls />
      <Dragon scale={0.6} position-y={-1}/>
      <mesh>
        <sphereGeometry args={[5,64,64]} />
        <meshBasicMaterial map={map} side={THREE.BackSide}/>
      </mesh>
    </>
  );
};
