import { useState, useEffect, useCallback } from 'react'
import { useLenisScroll } from './hooks/useLenisScroll'
import { useDevicePerformance } from './hooks/useDevicePerformance'
import { Experience } from './components/canvas/Experience'
import { Fallback2D } from './components/canvas/Fallback2D'
import { GRATITUDE_LEAF_POSITIONS } from './components/canvas/Tree'
import { Act1Arrival } from './components/sections/Act1Arrival'
import { Act2Market } from './components/sections/Act2Market'
import { Act3Table } from './components/sections/Act3Table'
import { Act4Gratitude } from './components/sections/Act4Gratitude'
import { Act5Tree } from './components/sections/Act5Tree'
import { SoundToggle } from './components/common/SoundToggle'
import { ScrollIndicator } from './components/common/ScrollIndicator'
import { ReadOnlyBanner } from './components/common/ReadOnlyBanner'
import { encodeGratitudesToUrl, decodeGratitudesFromUrl } from './utils/urlSharing'
import { generateThanksgivingCard } from './utils/cardGenerator'
import { autumnSound } from './utils/soundEngine'
import { DISHES_DATA } from './data/dishesData'
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
  const { useFallback2D, setUseFallback2D, prefersReducedMotion } = useDevicePerformance()
  const [isPlayingSound, setIsPlayingSound] = useState(false)
  const [currentAct, setCurrentAct] = useState(1)
  const [animatingLeaf, setAnimatingLeaf] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isReadOnly, setIsReadOnly] = useState(false)
  const [selectedDish, setSelectedDish] = useState(null)

  // Recuperation initiale (URL partagee prioritaire sans ecraser le stockage local)
  const [gratitudes, setGratitudes] = useState(() => {
    if (typeof window !== 'undefined') {
      const shared = decodeGratitudesFromUrl(window.location.search)
      if (shared && shared.length > 0) {
        return shared
      }
    }

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

  // Verification au montage du mode lecture seule
  useEffect(() => {
    const shared = decodeGratitudesFromUrl(window.location.search)
    if (shared && shared.length > 0) {
      setIsReadOnly(true)
    }
  }, [])

  // Sauvegarde dans localStorage uniquement pour l arbre personnel
  useEffect(() => {
    if (isReadOnly) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gratitudes))
    } catch (err) {
      console.warn('Impossible de synchroniser le localStorage', err)
    }
  }, [gratitudes, isReadOnly])

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

  // Activation du son au premier clic "Entrer"
  const handleEnterExperience = () => {
    autumnSound.start()
    setIsPlayingSound(true)
    scrollTo('#acte-2', { duration: 1.6 })
  }

  // Bascule du son par le bouton dédié
  const handleToggleSound = () => {
    const active = autumnSound.toggle()
    setIsPlayingSound(active)
  }

  // Sélection d un plat (3D ou clic carte)
  const handleSelectDish = useCallback((dishOrId) => {
    if (!dishOrId) {
      setSelectedDish(null)
      return
    }
    if (typeof dishOrId === 'string') {
      const found = DISHES_DATA.find((d) => d.id === dishOrId)
      setSelectedDish(found || null)
    } else {
      setSelectedDish(dishOrId)
    }
  }, [])

  // Declenchement du vol de la feuille
  const handleAddGratitude = useCallback((newGratitude) => {
    if (gratitudes.length >= 12 || isAnimating || isReadOnly) return

    if (useFallback2D || prefersReducedMotion) {
      // Ajout direct sans calcul 3D si mode dégradé
      setGratitudes((prev) => [newGratitude, ...prev].slice(0, 12))
      scrollTo('#acte-5', { duration: 1.5 })
      return
    }

    setIsAnimating(true)

    const targetIndex = gratitudes.length % GRATITUDE_LEAF_POSITIONS.length
    const branchTarget = GRATITUDE_LEAF_POSITIONS[targetIndex]
    
    const targetWorldPos = [
      branchTarget[0],
      branchTarget[1] - 0.2,
      branchTarget[2] - 0.5,
    ]

    setAnimatingLeaf({
      startPos: [0.2, 2.3, 3.2],
      targetPos: targetWorldPos,
      color: newGratitude.leafColor || '#d9622b',
      onComplete: () => {
        setGratitudes((prev) => [newGratitude, ...prev].slice(0, 12))
        setAnimatingLeaf(null)
        setIsAnimating(false)
        scrollTo('#acte-5', { duration: 2.0 })
      },
    })
  }, [gratitudes.length, isAnimating, isReadOnly, useFallback2D, prefersReducedMotion, scrollTo])

  // Suppression d une feuille personnelle
  const handleDeleteGratitude = useCallback((id) => {
    if (isReadOnly) return
    setGratitudes((prev) => prev.filter((g) => g.id !== id))
  }, [isReadOnly])

  // Passage en mode personnel (quitter la lecture seule)
  const handleResetToPersonal = useCallback(() => {
    if (window.history && window.history.pushState) {
      window.history.pushState({}, '', window.location.pathname)
    }

    setIsReadOnly(false)

    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setGratitudes(parsed)
          scrollTo('#acte-4', { duration: 1.5 })
          return
        }
      }
    } catch {
      // Ignorer
    }
    setGratitudes(DEFAULT_GRATITUDES)
    scrollTo('#acte-4', { duration: 1.5 })
  }, [scrollTo])

  // Generation de la carte souvenir PNG 1080x1920
  const handleDownloadCard = useCallback(async () => {
    return generateThanksgivingCard(gratitudes)
  }, [gratitudes])

  // Copie de l URL avec encodage base64 des gratitudes
  const handleShareLink = useCallback(() => {
    const encoded = encodeGratitudesToUrl(gratitudes)
    const shareUrl = `${window.location.origin}${window.location.pathname}?g=${encoded}`
    navigator.clipboard?.writeText?.(shareUrl)
  }, [gratitudes])

  return (
    <div className="relative min-h-screen bg-brun-900 text-creme-200 selection:bg-orange-accent selection:text-creme-100 font-sans">
      {/* Bandeau d indication si visite en lecture seule */}
      {isReadOnly && (
        <ReadOnlyBanner onResetToPersonal={handleResetToPersonal} />
      )}

      {/* Arrière-plan graphique : Scene 3D WebGL ou Fallback 2D */}
      {useFallback2D ? (
        <Fallback2D gratitudes={gratitudes} />
      ) : (
        <Experience
          currentAct={currentAct}
          gratitudes={gratitudes}
          animatingLeaf={animatingLeaf}
          onSelectDish={handleSelectDish}
        />
      )}

      {/* Bouton de son d ambiance */}
      <SoundToggle
        isPlaying={isPlayingSound}
        onToggle={handleToggleSound}
      />

      {/* Sélecteur discret de mode graphique (3D / 2D) */}
      <button
        type="button"
        onClick={() => setUseFallback2D((v) => !v)}
        aria-label={useFallback2D ? 'Activer la 3D WebGL' : 'Activer la 2D allégée'}
        className="fixed top-6 left-6 z-50 px-2.5 py-1 rounded-full border border-creme-200/15 bg-brun-900/60 backdrop-blur-md text-[10px] font-mono tracking-wider uppercase text-creme-200/60 hover:text-creme-100 hover:border-orange-accent/40 transition-all"
      >
        {useFallback2D ? 'Mode 2D' : 'Mode 3D'}
      </button>

      {/* Indicateur d acte au scroll */}
      <ScrollIndicator activeAct={currentAct} totalActs={5} />

      {/* Contenu principal en 5 Actes */}
      <main className="relative z-10">
        <Act1Arrival onEnter={handleEnterExperience} />
        <Act2Market />
        <Act3Table
          selectedDish={selectedDish}
          onSelectDish={handleSelectDish}
        />
        <Act4Gratitude
          gratitudes={gratitudes}
          onAddGratitude={handleAddGratitude}
          onDeleteGratitude={handleDeleteGratitude}
          onResetToPersonal={handleResetToPersonal}
          maxGratitudes={12}
          isAnimating={isAnimating}
          isReadOnly={isReadOnly}
        />
        <Act5Tree
          gratitudes={gratitudes}
          onDownloadCard={handleDownloadCard}
          onShareLink={handleShareLink}
          onResetToPersonal={handleResetToPersonal}
          isReadOnly={isReadOnly}
        />
      </main>
    </div>
  )
}
