import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function FallingLeaf({ startPos = [0.2, 2.2, 3.0], targetPos = [0, 2.0, 0], color = '#d9622b', onComplete }) {
  const meshRef = useRef()
  const progressRef = useRef(0)

  useFrame((_, delta) => {
    if (!meshRef.current) return

    // Progression temporelle (duree ~1.8 seconde)
    progressRef.current += delta * 0.55
    const t = Math.min(progressRef.current, 1)

    // Trajectoire en courbe de Bézier quadratique douce
    // Point de départ (proche de la caméra), point intermédiaire (légère montée puis descente au vent), point d'arrivée (branche)
    const p0 = new THREE.Vector3(...startPos)
    const p1 = new THREE.Vector3(
      (startPos[0] + targetPos[0]) / 2 + 0.4,
      Math.max(startPos[1], targetPos[1]) + 0.6,
      (startPos[2] + targetPos[2]) / 2
    )
    const p2 = new THREE.Vector3(...targetPos)

    // Formule Bézier : B(t) = (1-t)^2 * p0 + 2(1-t)t * p1 + t^2 * p2
    const currentPos = new THREE.Vector3()
      .addScaledVector(p0, Math.pow(1 - t, 2))
      .addScaledVector(p1, 2 * (1 - t) * t)
      .addScaledVector(p2, Math.pow(t, 2))

    // Effet d oscillation au vent
    currentPos.x += Math.sin(t * Math.PI * 4) * 0.15 * (1 - t)

    meshRef.current.position.copy(currentPos)

    // Rotations de voltige de la feuille
    meshRef.current.rotation.x = t * Math.PI * 3 + Math.sin(t * 10) * 0.4
    meshRef.current.rotation.y = t * Math.PI * 2 + Math.cos(t * 8) * 0.3
    meshRef.current.rotation.z = Math.sin(t * 12) * 0.5

    // Ajustement d échelle progressive a l approche de la branche
    const scale = THREE.MathUtils.lerp(0.35, 0.22, t)
    meshRef.current.scale.set(scale, scale * 1.4, scale * 0.4)

    if (t >= 1) {
      if (onComplete) onComplete()
    }
  })

  return (
    <group ref={meshRef}>
      <mesh castShadow>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          roughness={0.3}
          metalness={0.1}
          flatShading
        />
      </mesh>
      {/* Source lumineuse d accompagment du vol */}
      <pointLight color={color} intensity={1.5} distance={2} />
    </group>
  )
}
