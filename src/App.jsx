import { useState, useEffect, useCallback } from 'react'
import { useLenisScroll } from './hooks/useLenisScroll'
import { Experience } from './components/canvas/Experience'
import { GRATITUDE_LEAF_POSITIONS } from './components/canvas/Tree'
import { Act1Arrival } from './components/sections/Act1Arrival'
import { Act2Market } from './components/sections/Act2Market'
import { Act3Table } from './components/sections/Act3Table'
import { Act4Gratitude } from './components/sections/Act4Gratitude'
import { Act5Tree } from './components/sections/Act5Tree'
import { SoundToggle } from './components/common/SoundToggle'
import { ScrollIndicator } from './components/common/ScrollIndicator'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const STORAGE_KEY = 'thanksgiving_gratitudes_2026'

// Feuilles initiales pre-ecrites pour que l arbre ne soit jamais nu
const DEFAULT_GRATITUDES = [
  {
    id: 'init-1',
    text: 'Le parfum du pain chaud partage en famille',
    author: 'Clara',
    leafColor: '#d9622b',
    createdAt: '2026-09-29T12:00:00.000Z',
  },
  {
    id: 'init-2',
    text: 'Le souffle du vent frais sous les arbres d or',
    author: 'Julien',
    leafColor: '#c27827',
    createdAt: '2026-09-29T12:30:00.000Z',
  },
  {
    id: 'init-3',
    text: 'La lumiere d une fin de journee d automne',
    author: 'Sarah',
    leafColor: '#dec195',
    createdAt: '2026-09-29T13:00:00.000Z',
  },
]

export default function App() {
  const { scrollTo } = useLenisScroll()
  const [isPlayingSound, setIsPlayingSound] = useState(false)
  const [currentAct, setCurrentAct] = useState(1)
  const [animatingLeaf, setAnimatingLeaf] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)

  // Recuperation securisee du localStorage
  const [gratitudes, setGratitudes] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      }
      return DEFAULT_GRATITUDES
    } catch {
      return DEFAULT_GRATITUDES
    }
  })

  // Synchronisation defensive du localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gratitudes))
    } catch (err) {
      console.warn('Impossible de synchroniser le localStorage', err)
    }
  }, [gratitudes])

  // Suivi de l acte actif au scroll avec ScrollTrigger
  useEffect(() => {
    const sections = ['#acte-1', '#acte-2', '#acte-3', '#acte-4', '#acte-5']
    const triggers = sections.map((sel, idx) => {
      return ScrollTrigger.create({
        trigger: sel,
        start: 'top 55%',
        end: 'bottom 55%',
        onEnter: () => setCurrentAct(idx + 1),
        onEnterBack: () => setCurrentAct(idx + 1),
      })
    })

    return () => {
      triggers.forEach((t) => t.kill())
    }
  }, [])

  const handleEnterExperience = () => {
    setIsPlayingSound(true)
    scrollTo('#acte-2', { duration: 1.6 })
  }

  // Declenchement de l animation de vol de la feuille vers l arbre
  const handleAddGratitude = useCallback((newGratitude) => {
    if (gratitudes.length >= 12 || isAnimating) return

    setIsAnimating(true)

    // Calcul de la branche cible sur l arbre 3D
    const targetIndex = gratitudes.length % GRATITUDE_LEAF_POSITIONS.length
    const branchTarget = GRATITUDE_LEAF_POSITIONS[targetIndex]
    
    // Position dans le repere monde de la branche
    const targetWorldPos = [
      branchTarget[0],
      branchTarget[1] - 0.2, // decalage du tronc
      branchTarget[2] - 0.5,
    ]

    setAnimatingLeaf({
      startPos: [0.2, 2.3, 3.2],
      targetPos: targetWorldPos,
      color: newGratitude.leafColor || '#d9622b',
      onComplete: () => {
        // Enracinement permanent sur l arbre
        setGratitudes((prev) => [newGratitude, ...prev].slice(0, 12))
        setAnimatingLeaf(null)
        setIsAnimating(false)
        // Transition douce vers l Acte 5 pour admirer l arbre
        scrollTo('#acte-5', { duration: 2.0 })
      },
    })
  }, [gratitudes.length, isAnimating, scrollTo])

  // Suppression d une gratitude pour liberer une feuille
  const handleDeleteGratitude = useCallback((id) => {
    setGratitudes((prev) => prev.filter((g) => g.id !== id))
  }, [])

  const handleDownloadCard = () => {
    alert('L export de la carte sera integre a l etape 5.')
  }

  const handleShareLink = () => {
    navigator.clipboard?.writeText?.(window.location.href)
  }

  return (
    <div className="relative min-h-screen bg-brun-900 text-creme-200 selection:bg-orange-accent selection:text-creme-100 font-sans">
      {/* Scene 3D WebGL avec support de vol de la feuille */}
      <Experience
        currentAct={currentAct}
        gratitudes={gratitudes}
        animatingLeaf={animatingLeaf}
      />

      {/* Bouton de son discret */}
      <SoundToggle
        isPlaying={isPlayingSound}
        onToggle={() => setIsPlayingSound((p) => !p)}
      />

      {/* Indicateur de progression du rituel */}
      <ScrollIndicator activeAct={currentAct} totalActs={5} />

      {/* Parcours scrollytelling en 5 Actes */}
      <main className="relative z-10">
        <Act1Arrival onEnter={handleEnterExperience} />
        <Act2Market />
        <Act3Table />
        <Act4Gratitude
          gratitudes={gratitudes}
          onAddGratitude={handleAddGratitude}
          onDeleteGratitude={handleDeleteGratitude}
          maxGratitudes={12}
          isAnimating={isAnimating}
        />
        <Act5Tree
          gratitudes={gratitudes}
          onDownloadCard={handleDownloadCard}
          onShareLink={handleShareLink}
        />
      </main>
    </div>
  )
}
