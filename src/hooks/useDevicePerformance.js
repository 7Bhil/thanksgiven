import { useState, useEffect } from 'react'

/**
 * Hook de détection des capacités matérielles et préférences d'accessibilité
 */
export function useDevicePerformance() {
  const [useFallback2D, setUseFallback2D] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // 1. Détection de prefers-reduced-motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(motionQuery.matches)

    const handleMotionChange = (e) => {
      setPrefersReducedMotion(e.matches)
      if (e.matches) setUseFallback2D(true)
    }

    if (motionQuery.addEventListener) {
      motionQuery.addEventListener('change', handleMotionChange)
    }

    // 2. Détection du support et de la puissance WebGL
    try {
      const testCanvas = document.createElement('canvas')
      const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl')
      if (!gl) {
        setUseFallback2D(true)
        return
      }

      // Détection des appareils très contraints en mémoire (ex: mobile très ancien)
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
      if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || ''
        if (/SwiftShader|llvmpipe/i.test(renderer)) {
          // Rendu logiciel CPU -> bascule en 2D pour garantir la fluidité
          setUseFallback2D(true)
        }
      }
    } catch {
      setUseFallback2D(true)
    }

    if (motionQuery.matches) {
      setUseFallback2D(true)
    }

    return () => {
      if (motionQuery.removeEventListener) {
        motionQuery.removeEventListener('change', handleMotionChange)
      }
    }
  }, [])

  return {
    useFallback2D,
    setUseFallback2D,
    prefersReducedMotion,
  }
}
