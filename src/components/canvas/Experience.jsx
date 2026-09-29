import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { EnvironmentLights } from './EnvironmentLights'
import { CameraController } from './CameraController'
import { Candle } from './Candle'
import { Tree } from './Tree'
import { FallingLeaf } from './FallingLeaf'
import { MarketElements } from './MarketElements'
import { FeastTable } from './FeastTable'

export function Experience({
  currentAct = 1,
  gratitudes = [],
  animatingLeaf = null,
  onSelectDish = null,
}) {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none w-full h-full"
      aria-hidden="true"
    >
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.95, 2.6], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        {/* Brume enveloppante aux teintes de Thanksgiving */}
        <fog attach="fog" args={['#1a0f0a', 2.5, 13]} />

        <Suspense fallback={null}>
          <EnvironmentLights />
          <CameraController currentAct={currentAct} />
          
          {/* Bougie intimiste de l Acte 1 */}
          <Candle position={[0, 0.2, 1.2]} />

          {/* Offrandes du marche (Acte 2) */}
          <MarketElements position={[1.4, -0.2, 3.2]} />

          {/* Table du banquet et ses mets (Acte 3) */}
          <FeastTable position={[-1.2, -0.1, 3.4]} onSelectDish={onSelectDish} />

          {/* Arbre stylise avec ses feuilles ancrees (Acte 4 & 5) */}
          <Tree position={[0, -0.2, -0.5]} gratitudes={gratitudes} />

          {/* Feuille en vol libre vers les branches */}
          {animatingLeaf && (
            <FallingLeaf
              startPos={animatingLeaf.startPos}
              targetPos={animatingLeaf.targetPos}
              color={animatingLeaf.color}
              onComplete={animatingLeaf.onComplete}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  )
}
