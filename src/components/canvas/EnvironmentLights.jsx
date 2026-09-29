import { useMemo } from 'react'

export function EnvironmentLights() {
  // Adaptation a l heure locale du visiteur
  const isDaytime = useMemo(() => {
    const hours = new Date().getHours()
    return hours >= 7 && hours < 18
  }, [])

  return (
    <>
      {/* Lumiere d ambiance feutree */}
      <ambientLight
        color={isDaytime ? '#f4ead8' : '#e27b49'}
        intensity={isDaytime ? 0.7 : 0.4}
      />

      {/* Lumiere principale descendante */}
      <directionalLight
        position={[5, 8, 4]}
        intensity={isDaytime ? 1.6 : 0.9}
        color={isDaytime ? '#ffe8cc' : '#ff9944'}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={20}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />

      {/* Lumiere de remplissage ambre chaud */}
      <directionalLight
        position={[-4, 3, -3]}
        intensity={0.4}
        color="#c27827"
      />
    </>
  )
}
