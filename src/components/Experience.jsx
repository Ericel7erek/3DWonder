import { CameraControls, Environment, MeshPortalMaterial, OrbitControls, RoundedBox, Text, useTexture } from "@react-three/drei";
import * as THREE from "three"
import { Dragon } from "./Dragon";
import { Matt } from "./Matt";
import { MattSmg } from "./MattSmg";
import { Ninja } from "./Ninja";
import { Captain } from "./Captain";
import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as easing from "maath/easing";
export const Experience = () => {
const [active, setActive] = useState(null)
const controlsRef = useRef()
const scene = useThree((state)=>state.scene)
useEffect(()=>{
if(active){
  const targetPosition = new THREE.Vector3()
  scene.getObjectByName(active).getWorldPosition(targetPosition)
  controlsRef.current.setLookAt(
    0,
    0,
    5,
    targetPosition.x,
    targetPosition.y,
    targetPosition.z,
    true
  ) 
}else {
    controlsRef.current.setLookAt(
      0,
      0,
      10,
      0,
      0,
      0,
      true
    )
  }
},[active])
  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />
      <CameraControls ref={controlsRef} minDistance={-8} maxDistance={10}  truck={[0,0,true]}/>
      <MonsterStage texture={"textures/realisticjaponarthouse/6.jpg"}
      position-x={2.5}
      rotation-y={-Math.PI / 8}
      name={"Ninja"}
      color={"RoyalBlue"}
      active={active}
      setActive={setActive}
      >
        <Ninja scale={0.6} position-y={-1}/>
      </MonsterStage>

      <MonsterStage texture={"textures/43_cb9dc54ff4ced70554b13039682cb501_file.jpg"}
      position-x={-2.5}
      rotation-y={Math.PI / 8}
      name={"Captain"}
      color={"Green"}
      active={active}
      setActive={setActive}
      >
        <Captain scale={1} position-y={-1} />
      </MonsterStage>

      <MonsterStage texture={"textures/f9cd8fac-841f-4c02-bd17-6f5e5f1b7d86.jpeg"}
      name={"Dragon"}
      color={"Orange"}
      active={active}
      setActive={setActive}
      >
        <Dragon scale={0.6} position-y={-1}/>
      </MonsterStage>
    </>
  );
};
const MonsterStage = ({children,name,color,texture,active,setActive,...props})=> {
    const map = useTexture(texture)
    const portal = useRef()

    useFrame((_state,delta)=>{
      const openWorld = active === name;
      easing.damp(portal.current, "blend", openWorld ? 1 : 0, 0.2, delta)
    })
    return(<group {...props}>
    <Text
    font="/src/fonts/Jaro-Regular-VariableFont_opsz.ttf"
    fontSize={0.3}
    color={color}
    position={[0, 1.1, 0.051]}
    >{name}</Text>
          <RoundedBox 
          name={name}
          args={[2,3,0.1]} 
          onDoubleClick={()=> 
          setActive(active===name? null: name)}>
        <MeshPortalMaterial side={THREE.DoubleSide} ref={portal}>
      <ambientLight intensity={1} />
      {children}
      <mesh>
        <sphereGeometry args={[5,64,64]} />
        <meshBasicMaterial map={map} side={THREE.BackSide}/>
      </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
  </group>)
}