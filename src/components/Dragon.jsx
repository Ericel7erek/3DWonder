/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/models/Dragon_Evolved.gltf -o src/Components/Dragon.jsx -r public 
*/

import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Dragon(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/Dragon_Evolved.gltf')
  const { actions } = useAnimations(animations, group)
  console.log(actions)
  useEffect(()=> {
    actions["Flying_Idle"].reset().fadeIn(0.5).play();
    return () => actions["Flying_Idle"].fadeOut(0.5)
  }, [])
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <skinnedMesh name="Dragon" geometry={nodes.Dragon.geometry} material={materials.Atlas} skeleton={nodes.Dragon.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/Dragon_Evolved.gltf')
