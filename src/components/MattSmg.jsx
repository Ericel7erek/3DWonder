/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/models/Characters_Matt_SingleWeapon.gltf -o src/Components/MattSmg.jsx -r public 
*/

import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function MattSmg(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/Characters_Matt_SingleWeapon.gltf')
  const { actions } = useAnimations(animations, group)
  useEffect(() => {
    actions["Run_Stab"].reset().fadeIn(0.5).play();
    return () => actions["Run_Stab"].fadeOut(0.5)
  }, [])
  
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <skinnedMesh name="Matt" geometry={nodes.Matt.geometry} material={materials.Atlas} skeleton={nodes.Matt.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/Characters_Matt_SingleWeapon.gltf')
