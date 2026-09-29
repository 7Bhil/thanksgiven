import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

/**
 * Composant 3D du banquet d'automne / La Table (Acte 3)
 */
export function FeastTable({ position = [-1.1, -0.1, 3.4], onSelectDish }) {
  const tableRef = useRef()

  useFrame((state) => {
    if (tableRef.current) {
      const t = state.clock.getElapsedTime()
      tableRef.current.rotation.y = Math.sin(t * 0.2) * 0.05
    }
  })

  return (
    <group ref={tableRef} position={position}>
      {/* Table ronde en bois massif */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <cylinderGeometry args={[1.2, 1.25, 0.1, 16]} />
        <meshStandardMaterial color="#321e14" roughness={0.85} />
      </mesh>

      {/* Nappe en lin crème chaleureux */}
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[1.05, 1.15, 0.04, 16]} />
        <meshStandardMaterial color="#f4ead8" roughness={0.9} />
      </mesh>

      {/* Pied central de la table */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.2, 0.35, 0.8, 12]} />
        <meshStandardMaterial color="#24150e" roughness={0.9} />
      </mesh>

      {/* Plat central : Dinde rôtie aux herbes */}
      <group
        position={[0, 0.15, 0]}
        onClick={() => onSelectDish && onSelectDish('dinde')}
      >
        <mesh scale={[0.35, 0.22, 0.25]} castShadow>
          <sphereGeometry args={[1, 8, 8]} />
          <meshStandardMaterial color="#82512d" roughness={0.6} flatShading />
        </mesh>
        {/* Plat de présentation en étain */}
        <mesh position={[0, -0.06, 0]}>
          <cylinderGeometry args={[0.42, 0.38, 0.03, 16]} />
          <meshStandardMaterial color="#6e6259" roughness={0.4} metalness={0.2} />
        </mesh>
      </group>

      {/* Bol de velouté de courge musquée */}
      <group
        position={[-0.45, 0.14, -0.3]}
        onClick={() => onSelectDish && onSelectDish('courge')}
      >
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.16, 0.1, 0.14, 12]} />
          <meshStandardMaterial color="#42291a" roughness={0.7} />
        </mesh>
        {/* Velouté orange chaud à la surface */}
        <mesh position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.14, 0.14, 0.02, 12]} />
          <meshStandardMaterial color="#d9622b" roughness={0.3} />
        </mesh>
      </group>

      {/* Pain de maïs doré */}
      <group
        position={[0.5, 0.12, -0.2]}
        onClick={() => onSelectDish && onSelectDish('mais')}
      >
        <mesh scale={[0.26, 0.08, 0.18]} castShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#d48d3b" roughness={0.65} flatShading />
        </mesh>
      </group>

      {/* Coupelle de sauce aux canneberges */}
      <group
        position={[-0.4, 0.11, 0.35]}
        onClick={() => onSelectDish && onSelectDish('canneberges')}
      >
        <mesh>
          <cylinderGeometry args={[0.12, 0.08, 0.08, 12]} />
          <meshStandardMaterial color="#a83822" roughness={0.4} />
        </mesh>
      </group>

      {/* Tarte à la citrouille */}
      <group
        position={[0.35, 0.12, 0.35]}
        onClick={() => onSelectDish && onSelectDish('tarte')}
      >
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.22, 0.2, 0.06, 14]} />
          <meshStandardMaterial color="#b85e2b" roughness={0.6} />
        </mesh>
        {/* Garniture crème centrale */}
        <mesh position={[0, 0.04, 0]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#faf5ee" roughness={0.5} />
        </mesh>
      </group>

      {/* Bougeoir d'ambiance sur table */}
      <group position={[0.05, 0.14, -0.5]}>
        <mesh>
          <cylinderGeometry args={[0.04, 0.04, 0.15, 8]} />
          <meshStandardMaterial color="#f4ead8" />
        </mesh>
        <pointLight color="#ff8438" intensity={1.2} distance={2.5} position={[0, 0.12, 0]} />
      </group>
    </group>
  )
}
