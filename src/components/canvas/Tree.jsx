import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Clusters de feuillage d'automne avec variations de taille, position et couleur
const FOLIAGE_CLUSTERS = [
  // Sommet
  { pos: [0, 3.8, 0], scale: 1.3, color: '#d9622b', speed: 0.8 },
  { pos: [0.3, 4.2, -0.2], scale: 0.9, color: '#e27b49', speed: 1.1 },
  // Étage supérieur
  { pos: [-0.9, 3.2, 0.4], scale: 1.1, color: '#c27827', speed: 0.9 },
  { pos: [0.8, 3.3, 0.5], scale: 1.2, color: '#d48d3b', speed: 0.7 },
  { pos: [0.2, 3.4, -0.9], scale: 1.0, color: '#d9622b', speed: 1.0 },
  { pos: [-0.6, 3.5, -0.7], scale: 0.95, color: '#9e5e1b', speed: 0.85 },
  // Étage médian
  { pos: [-1.4, 2.5, 0.2], scale: 1.15, color: '#944b20', speed: 0.75 },
  { pos: [1.3, 2.4, 0.3], scale: 1.25, color: '#c27827', speed: 0.9 },
  { pos: [0.5, 2.6, -1.2], scale: 1.1, color: '#d9622b', speed: 0.8 },
  { pos: [-0.8, 2.4, -1.0], scale: 1.0, color: '#dec195', speed: 1.05 },
  { pos: [0, 2.6, 1.2], scale: 1.2, color: '#e27b49', speed: 0.85 },
  // Étage inférieur
  { pos: [-1.2, 1.7, 0.6], scale: 0.9, color: '#72503d', speed: 0.7 },
  { pos: [1.1, 1.8, -0.5], scale: 0.95, color: '#c27827', speed: 0.8 },
  { pos: [0.2, 1.9, 1.1], scale: 0.85, color: '#d9622b', speed: 0.95 },
]

// Calcul deterministe des positions des 12 feuilles de gratitude sur les branches
export const GRATITUDE_LEAF_POSITIONS = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * Math.PI * 2 + 0.35
  const radius = 1.35 + (i % 3) * 0.35
  const height = 1.85 + (i % 4) * 0.45
  return [
    Math.cos(angle) * radius,
    height,
    Math.sin(angle) * radius,
  ]
})

export function Tree({ position = [0, 0, 0], gratitudes = [] }) {
  const groupRef = useRef()
  const foliageRefs = useRef([])
  const leavesParticlesRef = useRef()

  // Particules d ambiance d automne
  const particleCount = 45
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < particleCount; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 8,
        y: Math.random() * 6,
        z: (Math.random() - 0.5) * 8,
        rotX: Math.random() * Math.PI,
        rotY: Math.random() * Math.PI,
        speedY: 0.004 + Math.random() * 0.008,
        swaySpeed: 0.5 + Math.random() * 1.2,
        swayRadius: 0.005 + Math.random() * 0.01,
        color: ['#d9622b', '#c27827', '#e27b49', '#dec195', '#944b20'][i % 5],
        scale: 0.06 + Math.random() * 0.06,
      })
    }
    return temp
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    // Respiration de l arbre
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.04
    }

    // Mouvement organique du feuillage
    foliageRefs.current.forEach((mesh, idx) => {
      if (!mesh) return
      const cluster = FOLIAGE_CLUSTERS[idx]
      const offset = idx * 0.4
      mesh.rotation.y = Math.sin(t * cluster.speed + offset) * 0.06
      mesh.rotation.z = Math.cos(t * cluster.speed * 0.8 + offset) * 0.04
    })

    // Feuilles d automne tourbillonnantes
    if (leavesParticlesRef.current) {
      const dummy = new THREE.Object3D()
      particles.forEach((p, i) => {
        p.y -= p.speedY
        p.x += Math.sin(t * p.swaySpeed + i) * p.swayRadius
        p.rotX += 0.01
        p.rotY += 0.015

        if (p.y < -0.5) {
          p.y = 5.5 + Math.random()
          p.x = (Math.random() - 0.5) * 7
          p.z = (Math.random() - 0.5) * 7
        }

        dummy.position.set(p.x, p.y, p.z)
        dummy.rotation.set(p.rotX, p.rotY, 0)
        dummy.scale.set(p.scale, p.scale, p.scale)
        dummy.updateMatrix()
        leavesParticlesRef.current.setMatrixAt(i, dummy.matrix)
      })
      leavesParticlesRef.current.instanceMatrix.needsUpdate = true
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Îlot de terre / socle */}
      <mesh position={[0, -0.4, 0]} receiveShadow>
        <cylinderGeometry args={[2.8, 3.4, 0.8, 12]} />
        <meshStandardMaterial color="#24150e" roughness={0.9} flatShading />
      </mesh>

      {/* Tronc en ecorce chaude */}
      <mesh position={[0, 1.4, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.65, 2.8, 7]} />
        <meshStandardMaterial color="#42291a" roughness={0.85} flatShading />
      </mesh>

      {/* Branches maîtresses */}
      <group position={[0, 2.2, 0]}>
        <mesh position={[-0.55, 0.4, 0.1]} rotation={[0.2, 0, 0.75]}>
          <cylinderGeometry args={[0.18, 0.28, 1.5, 6]} />
          <meshStandardMaterial color="#42291a" roughness={0.85} flatShading />
        </mesh>
        <mesh position={[0.6, 0.5, 0.15]} rotation={[-0.1, 0, -0.7]}>
          <cylinderGeometry args={[0.16, 0.26, 1.6, 6]} />
          <meshStandardMaterial color="#42291a" roughness={0.85} flatShading />
        </mesh>
        <mesh position={[0.1, 0.6, -0.6]} rotation={[-0.7, 0.3, 0]}>
          <cylinderGeometry args={[0.15, 0.24, 1.4, 6]} />
          <meshStandardMaterial color="#42291a" roughness={0.85} flatShading />
        </mesh>
      </group>

      {/* Amas volumetriques d automne */}
      {FOLIAGE_CLUSTERS.map((c, i) => (
        <mesh
          key={i}
          ref={(el) => (foliageRefs.current[i] = el)}
          position={c.pos}
          scale={c.scale}
          castShadow
        >
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={c.color}
            roughness={0.75}
            metalness={0.05}
            flatShading
          />
        </mesh>
      ))}

      {/* Feuilles de gratitude fixees avec pulsation doree */}
      {gratitudes.map((gratitude, index) => {
        const pos = GRATITUDE_LEAF_POSITIONS[index % GRATITUDE_LEAF_POSITIONS.length]
        const leafColor = gratitude.leafColor || ['#d9622b', '#c27827', '#e27b49', '#dec195', '#b85e2b'][index % 5]
        
        return (
          <group key={gratitude.id} position={pos}>
            <mesh scale={[0.18, 0.26, 0.08]} rotation={[0.2, (index * 0.5), 0.3]} castShadow>
              <dodecahedronGeometry args={[1, 0]} />
              <meshStandardMaterial
                color={leafColor}
                emissive={leafColor}
                emissiveIntensity={0.4}
                roughness={0.4}
                flatShading
              />
            </mesh>
            {/* Tige de la feuille la reliant a la branche */}
            <mesh position={[0, -0.1, 0]}>
              <cylinderGeometry args={[0.012, 0.012, 0.12, 4]} />
              <meshBasicMaterial color="#321e14" />
            </mesh>
          </group>
        )
      })}

      {/* Particules instanciees */}
      <instancedMesh
        ref={leavesParticlesRef}
        args={[null, null, particleCount]}
      >
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#d9622b"
          side={THREE.DoubleSide}
          roughness={0.7}
          transparent
          opacity={0.85}
        />
      </instancedMesh>
    </group>
  )
}
