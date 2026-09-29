import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Configurations spatiales de la caméra selon les 5 Actes
const ACT_CONFIGS = {
  1: {
    pos: new THREE.Vector3(0, 0.95, 2.6),
    target: new THREE.Vector3(0, 0.85, 1.2),
  },
  2: {
    pos: new THREE.Vector3(1.6, 1.4, 4.4),
    target: new THREE.Vector3(0.3, 0.8, 0.5),
  },
  3: {
    pos: new THREE.Vector3(-1.4, 1.7, 4.6),
    target: new THREE.Vector3(0, 1.0, 0.2),
  },
  4: {
    pos: new THREE.Vector3(0.5, 2.3, 3.8),
    target: new THREE.Vector3(0, 2.2, 0),
  },
  5: {
    pos: new THREE.Vector3(0, 2.7, 7.2),
    target: new THREE.Vector3(0, 2.0, 0),
  },
}

export function CameraController({ currentAct = 1 }) {
  const { camera } = useThree()
  const currentTarget = useRef(new THREE.Vector3(0, 0.85, 1.2))

  useFrame((_, delta) => {
    const config = ACT_CONFIGS[currentAct] || ACT_CONFIGS[1]

    // Interpolation douce vers la position cible de l'acte
    camera.position.lerp(config.pos, Math.min(delta * 2.2, 1))

    // Interpolation douce de la cible du regard
    currentTarget.current.lerp(config.target, Math.min(delta * 2.5, 1))
    camera.lookAt(currentTarget.current)
  })

  return null
}
