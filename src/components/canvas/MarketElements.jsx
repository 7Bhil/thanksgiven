import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

/**
 * Composant 3D des offrandes du Marché d'Automne (Acte 2)
 */
export function MarketElements({ position = [1.2, -0.3, 3.2] }) {
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      // Légère oscillation atmosphérique
      const t = state.clock.getElapsedTime()
      groupRef.current.position.y = -0.3 + Math.sin(t * 0.8) * 0.02
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Panier en osier / cageot de récolte */}
      <mesh position={[-0.2, 0.15, 0]}>
        <cylinderGeometry args={[0.55, 0.45, 0.35, 10]} />
        <meshStandardMaterial color="#53392b" roughness={0.9} flatShading />
      </mesh>

      {/* Grosse citrouille orangée */}
      <group position={[0.35, 0.25, 0.1]}>
        <mesh scale={[0.42, 0.32, 0.42]}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial color="#d9622b" roughness={0.7} flatShading />
        </mesh>
        {/* Pédoncule vert sombre */}
        <mesh position={[0, 0.28, 0]} rotation={[0.1, 0, 0.2]}>
          <cylinderGeometry args={[0.03, 0.05, 0.16, 6]} />
          <meshStandardMaterial color="#2d4a22" roughness={0.8} />
        </mesh>
      </group>

      {/* Deuxième citrouille ambrée plus petite */}
      <group position={[-0.45, 0.18, 0.35]}>
        <mesh scale={[0.3, 0.24, 0.3]}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial color="#c27827" roughness={0.65} flatShading />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.025, 0.04, 0.12, 6]} />
          <meshStandardMaterial color="#2d4a22" roughness={0.8} />
        </mesh>
      </group>

      {/* Épis de maïs de récolte */}
      <group position={[-0.05, 0.32, 0.25]} rotation={[0.4, 0.5, -0.6]}>
        <mesh>
          <cylinderGeometry args={[0.06, 0.08, 0.45, 8]} />
          <meshStandardMaterial color="#d48d3b" roughness={0.6} flatShading />
        </mesh>
      </group>

      {/* Pommes d'automne */}
      <mesh position={[0.15, 0.12, 0.5]}>
        <sphereGeometry args={[0.09, 8, 8]} />
        <meshStandardMaterial color="#a83822" roughness={0.4} flatShading />
      </mesh>
      <mesh position={[0.02, 0.1, 0.55]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#dec195" roughness={0.5} flatShading />
      </mesh>

      {/* Lueur chaude rasante sur les récoltes */}
      <pointLight color="#d9622b" intensity={0.9} distance={2.5} position={[0, 0.5, 0.2]} />
    </group>
  )
}
