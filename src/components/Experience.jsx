import { CameraControls, Environment, MeshPortalMaterial, OrbitControls, RoundedBox, Text, useCursor, useTexture } from "@react-three/drei";
import * as THREE from "three"
import { Dragon } from "./Characters/Dragon";
import { Matt } from "./Characters/Matt";
import { MattSmg } from "./Characters/MattSmg";
import { Ninja } from "./Characters/Ninja";
import { Captain } from "./Characters/Captain";
import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as easing from "maath/easing";
export const Experience = () => {
const [active, setActive] = useState(null)
const [isHovered, setHover] = useState(false)
useCursor(isHovered)
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
      <CameraControls 
      ref={controlsRef} 
      minDistance={0} 
      maxDistance={8}  
      truck={[0,0,true]}
      maxPolarAngle={Math.PI/2} 
      minPolarAngle={Math.PI/3} 
      />
      
      <MonsterStage texture={"textures/realisticjaponarthouse/6.jpg"}
      position-x={2.5}
      rotation-y={-Math.PI / 8}
      name={"Ninja"}
      color={"RoyalBlue"}
      active={active}
      setActive={setActive}
      hover={isHovered}
      setHover={setHover}
      >
        <Ninja scale={0.6} position-y={-1} hovered={isHovered === "Ninja"}/>
      </MonsterStage>

      <MonsterStage texture={"textures/43_cb9dc54ff4ced70554b13039682cb501_file.jpg"}
      position-x={-2.5}
      rotation-y={Math.PI / 8}
      name={"Captain"}
      color={"Green"}
      active={active}
      setActive={setActive}
      hover={isHovered}
      setHover={setHover}
      >
        <Captain scale={1} position-y={-1} hovered={isHovered === "Captain"}/>
      </MonsterStage>

      <MonsterStage texture={"textures/f9cd8fac-841f-4c02-bd17-6f5e5f1b7d86.jpeg"}
      name={"Dragon"}
      color={"Orange"}
      active={active}
      setActive={setActive}
      hover={isHovered}
      setHover={setHover}
      >
        <Dragon scale={0.6} position-y={-1} hovered={isHovered === "Dragon"}/>
      </MonsterStage>
    </>
  );
};
const MonsterStage = ({children,name,color,texture,active,setActive,isHovered,setHover,...props})=> {
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
        position={[0, 1.1, -0.051]}
        >{name}</Text>
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
        setActive(active===name? null: name)}
        onPointerEnter={()=> setHover(name)}
        onPointerLeave={()=> setHover(null)}
        >
          
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