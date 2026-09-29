import { useMemo } from 'react'

/**
 * Version dégradée 2D fluide pour appareils faibles ou prefers-reduced-motion
 * Zéro WebGL, animations CSS pures et légères
 */
export function Fallback2D({ gratitudes = [] }) {
  // Génération déterministe de feuilles 2D d'ambiance
  const floatingLeaves = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${(i * 19) % 94}%`,
      top: `${(i * 23) % 90}%`,
      size: 16 + (i % 4) * 8,
      duration: 8 + (i % 6) * 3,
      delay: -(i * 1.5),
      color: ['#d9622b', '#c27827', '#e27b49', '#dec195', '#b85e2b'][i % 5],
      rotation: (i * 47) % 360,
    }))
  }, [])

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-brun-900"
      aria-hidden="true"
    >
      {/* Halos d'ambiance d'automne */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-orange-accent/10 blur-[150px]" />
      <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-ambre-dark/10 blur-[120px]" />

      {/* Silhouette de l'Arbre en 2D stylisé au centre */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-25 scale-75 md:scale-100 transition-opacity duration-1000">
        <svg
          width="420"
          height="500"
          viewBox="0 0 420 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Tronc */}
          <path d="M190 500 L205 280 L215 280 L230 500 Z" fill="#42291a" />
          {/* Branches */}
          <path d="M205 320 Q160 260 110 240" stroke="#42291a" strokeWidth="14" strokeLinecap="round" />
          <path d="M215 310 Q260 250 310 230" stroke="#42291a" strokeWidth="12" strokeLinecap="round" />
          <path d="M210 280 Q215 200 210 140" stroke="#42291a" strokeWidth="10" strokeLinecap="round" />
          {/* Amas de feuillage 2D */}
          <circle cx="210" cy="110" r="75" fill="#d9622b" fillOpacity="0.8" />
          <circle cx="130" cy="190" r="65" fill="#c27827" fillOpacity="0.75" />
          <circle cx="290" cy="180" r="70" fill="#e27b49" fillOpacity="0.8" />
          <circle cx="80" cy="240" r="50" fill="#9e5e1b" fillOpacity="0.7" />
          <circle cx="330" cy="235" r="55" fill="#dec195" fillOpacity="0.7" />
        </svg>
      </div>

      {/* Feuilles 2D flottant doucement */}
      {floatingLeaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute rounded-full opacity-60 animate-pulse"
          style={{
            left: leaf.left,
            top: leaf.top,
            width: `${leaf.size}px`,
            height: `${leaf.size * 1.5}px`,
            backgroundColor: leaf.color,
            transform: `rotate(${leaf.rotation}deg)`,
            transition: 'transform 4s ease-in-out',
            boxShadow: `0 0 10px ${leaf.color}40`,
          }}
        />
      ))}
    </div>
  )
}
