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

export function Tree({ position = [0, 0, 0], gratitudes = [] }) {
  const groupRef = useRef()
  const foliageRefs = useRef([])
  const leavesParticlesRef = useRef()

  // Generation de particules de feuilles flottantes dans la brume
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

    // Respiration et legere torsion globale de l arbre au vent
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.04
    }

    // Oscillation douce des amas de feuillage
    foliageRefs.current.forEach((mesh, idx) => {
      if (!mesh) return
      const cluster = FOLIAGE_CLUSTERS[idx]
      const offset = idx * 0.4
      mesh.rotation.y = Math.sin(t * cluster.speed + offset) * 0.06
      mesh.rotation.z = Math.cos(t * cluster.speed * 0.8 + offset) * 0.04
    })

    // Animation continue des particules de feuilles d automne
    if (leavesParticlesRef.current) {
      const dummy = new THREE.Object3D()
      particles.forEach((p, i) => {
        p.y -= p.speedY
        p.x += Math.sin(t * p.swaySpeed + i) * p.swayRadius
        p.rotX += 0.01
        p.rotY += 0.015

        // Reinitialisation quand la feuille touche le sol
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

  // Positions precalculees pour les feuilles de gratitude de l Acte 4/5
  const gratitudeLeafPositions = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const angle = (i / 12) * Math.PI * 2 + 0.3
      const radius = 1.4 + (i % 3) * 0.4
      const height = 1.8 + (i % 4) * 0.5
      return [
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius,
      ]
    })
  }, [])

  return (
    <group ref={groupRef} position={position}>
      {/* Îlot de terre / socle automnal */}
      <mesh position={[0, -0.4, 0]} receiveShadow>
        <cylinderGeometry args={[2.8, 3.4, 0.8, 12]} />
        <meshStandardMaterial color="#24150e" roughness={0.9} flatShading />
      </mesh>

      {/* Tronc principal low-poly */}
      <mesh position={[0, 1.4, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.65, 2.8, 7]} />
        <meshStandardMaterial color="#42291a" roughness={0.85} flatShading />
      </mesh>

      {/* Branches maîtresses divergentes */}
      <group position={[0, 2.2, 0]}>
        {/* Branche gauche */}
        <mesh position={[-0.55, 0.4, 0.1]} rotation={[0.2, 0, 0.75]}>
          <cylinderGeometry args={[0.18, 0.28, 1.5, 6]} />
          <meshStandardMaterial color="#42291a" roughness={0.85} flatShading />
        </mesh>
        {/* Branche droite */}
        <mesh position={[0.6, 0.5, 0.15]} rotation={[-0.1, 0, -0.7]}>
          <cylinderGeometry args={[0.16, 0.26, 1.6, 6]} />
          <meshStandardMaterial color="#42291a" roughness={0.85} flatShading />
        </mesh>
        {/* Branche arriere */}
        <mesh position={[0.1, 0.6, -0.6]} rotation={[-0.7, 0.3, 0]}>
          <cylinderGeometry args={[0.15, 0.24, 1.4, 6]} />
          <meshStandardMaterial color="#42291a" roughness={0.85} flatShading />
        </mesh>
      </group>

      {/* Amas volumétriques de feuillage (Low-Poly Icosaedre) */}
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

      {/* Feuilles de gratitude fixées sur les branches */}
      {gratitudes.map((gratitude, index) => {
        const pos = gratitudeLeafPositions[index % gratitudeLeafPositions.length]
        return (
          <group key={gratitude.id} position={pos}>
            <mesh scale={0.22}>
              <dodecahedronGeometry args={[1, 0]} />
              <meshStandardMaterial
                color="#f4ead8"
                emissive="#d9622b"
                emissiveIntensity={0.35}
                roughness={0.4}
                flatShading
              />
            </mesh>
          </group>
        )
      })}

      {/* Particules instanciees de feuilles d automne tourbillonnantes */}
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
