import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { EnvironmentLights } from './EnvironmentLights'
import { CameraController } from './CameraController'
import { Candle } from './Candle'
import { Tree } from './Tree'

export function Experience({ currentAct = 1, gratitudes = [] }) {
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
        {/* Brume d ambiance enveloppante dans les teintes brunes de Thanksgiving */}
        <fog attach="fog" args={['#1a0f0a', 2.5, 13]} />

        <Suspense fallback={null}>
          <EnvironmentLights />
          <CameraController currentAct={currentAct} />
          
          {/* Bougie intimiste de l Acte 1 */}
          <Candle position={[0, 0.2, 1.2]} />

          {/* Arbre stylise de gratitude */}
          <Tree position={[0, -0.2, -0.5]} gratitudes={gratitudes} />
        </Suspense>
      </Canvas>
    </div>
  )
}
