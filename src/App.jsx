import { useState, useEffect } from 'react'
import { useLenisScroll } from './hooks/useLenisScroll'
import { Experience } from './components/canvas/Experience'
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
    createdAt: '2026-09-29T12:00:00.000Z',
  },
  {
    id: 'init-2',
    text: 'Le souffle du vent frais sous les arbres d or',
    author: 'Julien',
    createdAt: '2026-09-29T12:30:00.000Z',
  },
  {
    id: 'init-3',
    text: 'La lumiere d une fin de journee d automne',
    author: 'Sarah',
    createdAt: '2026-09-29T13:00:00.000Z',
  },
]

export default function App() {
  const { scrollTo } = useLenisScroll()
  const [isPlayingSound, setIsPlayingSound] = useState(false)
  const [currentAct, setCurrentAct] = useState(1)
  const [gratitudes, setGratitudes] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : DEFAULT_GRATITUDES
    } catch {
      return DEFAULT_GRATITUDES
    }
  })

  // Synchronisation du localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gratitudes))
    } catch (err) {
      console.warn('Impossible de sauvegarder dans localStorage', err)
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

  const handleAddGratitude = (item) => {
    setGratitudes((prev) => [item, ...prev].slice(0, 12))
    scrollTo('#acte-5', { duration: 1.8 })
  }

  const handleDownloadCard = () => {
    alert('L export de la carte sera integre a l etape 5.')
  }

  const handleShareLink = () => {
    navigator.clipboard?.writeText?.(window.location.href)
  }

  return (
    <div className="relative min-h-screen bg-brun-900 text-creme-200 selection:bg-orange-accent selection:text-creme-100 font-sans">
      {/* Toile 3D Three.js immersive en arriere-plan fixe */}
      <Experience currentAct={currentAct} gratitudes={gratitudes} />

      {/* Bouton de son discret */}
      <SoundToggle
        isPlaying={isPlayingSound}
        onToggle={() => setIsPlayingSound((p) => !p)}
      />

      {/* Indicateur de progression du rituel */}
      <ScrollIndicator activeAct={currentAct} totalActs={5} />

      {/* Contenu textuel et interactif scrollytelling */}
      <main className="relative z-10">
        <Act1Arrival onEnter={handleEnterExperience} />
        <Act2Market />
        <Act3Table />
        <Act4Gratitude
          gratitudes={gratitudes}
          onAddGratitude={handleAddGratitude}
          maxGratitudes={12}
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
