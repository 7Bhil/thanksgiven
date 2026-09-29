import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Candle({ position = [0, 0.2, 1.2], isDaytime = false }) {
  const lightRef = useRef()
  const flameRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    // Frémissement naturel et non répétitif de la flamme
    const flicker = Math.sin(t * 7.5) * 0.12 + Math.cos(t * 13.2) * 0.08 + Math.sin(t * 23.1) * 0.04
    
    if (lightRef.current) {
      lightRef.current.intensity = (isDaytime ? 1.5 : 2.5) + flicker * 0.8
      lightRef.current.distance = 5 + flicker
    }

    if (flameRef.current) {
      flameRef.current.scale.y = 1 + flicker * 0.35
      flameRef.current.scale.x = 1 - flicker * 0.15
      flameRef.current.scale.z = 1 - flicker * 0.15
      flameRef.current.rotation.z = Math.sin(t * 4) * 0.06
    }
  })

  return (
    <group position={position}>
      {/* Coupelle / support en terre cuite */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.3, 0.25, 0.08, 16]} />
        <meshStandardMaterial color="#321e14" roughness={0.8} />
      </mesh>

      {/* Corps de la bougie en cire naturelle */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.14, 0.15, 0.65, 16]} />
        <meshStandardMaterial
          color="#f4ead8"
          roughness={0.4}
          metalness={0.05}
        />
      </mesh>

      {/* Mèche */}
      <mesh position={[0, 0.67, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.08, 8]} />
        <meshStandardMaterial color="#1a0f0a" roughness={0.9} />
      </mesh>

      {/* Flamme stylisée low-poly */}
      <group position={[0, 0.76, 0]}>
        <mesh ref={flameRef}>
          <coneGeometry args={[0.055, 0.16, 8]} />
          <meshBasicMaterial
            color="#ff8438"
            transparent
            opacity={0.95}
          />
        </mesh>
        
        {/* Noyau lumineux interne de la flamme */}
        <mesh position={[0, -0.03, 0]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color="#fff3db" />
        </mesh>

        {/* Halo de lumière ponctuelle projetée par la flamme */}
        <pointLight
          ref={lightRef}
          color="#ff9944"
          intensity={2.5}
          distance={5}
          decay={2}
        />
      </group>
    </group>
  )
}
