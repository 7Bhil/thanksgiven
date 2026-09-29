import { useState, useEffect } from 'react'
import { Share2, Download, Check, Sparkles, Sprout } from 'lucide-react'

// Date cible : Thanksgiving, jeudi 26 novembre 2026
const TARGET_DATE = new Date('2026-11-26T00:00:00')

export function Act5Tree({
  gratitudes = [],
  onDownloadCard,
  onShareLink,
  onResetToPersonal,
  isReadOnly = false,
}) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date()
      const diff = TARGET_DATE.getTime() - now.getTime()

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }

    calculateTime()
    const timer = setInterval(calculateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleShare = () => {
    if (onShareLink) {
      onShareLink()
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <section
      id="acte-5"
      aria-labelledby="title-acte-5"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 py-28 z-10"
    >
      <div className="max-w-4xl mx-auto w-full space-y-14 text-center">
        <header className="space-y-4 max-w-lg mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-orange-accent font-sans font-medium">
            Acte V &bull; {isReadOnly ? 'L Arbre Partage' : 'L Arbre Rayonnant'}
          </p>
          <h2
            id="title-acte-5"
            className="font-serif text-4xl md:text-6xl font-normal text-creme-100"
          >
            {isReadOnly ? 'La Canopee de votre Proche' : 'Votre Canopee de Reconnaissance'}
          </h2>
          <p className="font-sans text-sm text-creme-200/70 font-light leading-relaxed">
            {isReadOnly
              ? 'Toutes ces pensees ont ete rassemblees pour celebrer la reconnaissance et le partage.'
              : 'Chaque parole laissee orne desormais les branches de l arbre.'}
          </p>
        </header>

        {/* Compte a rebours jusqu au 26 novembre 2026 */}
        <div className="p-8 rounded-3xl bg-brun-800/40 border border-creme-200/10 backdrop-blur-md max-w-xl mx-auto">
          <span className="text-xs font-mono tracking-widest text-creme-200/50 uppercase block mb-4">
            Rassemblement du Thanksgiving 2026 dans
          </span>
          <div className="grid grid-cols-4 gap-3 text-center">
            {[
              { label: 'Jours', value: timeLeft.days },
              { label: 'Heures', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Secondes', value: timeLeft.seconds },
            ].map((unit) => (
              <div key={unit.label} className="p-3 rounded-xl bg-brun-900/60 border border-creme-200/5">
                <span className="font-serif text-2xl md:text-3xl text-orange-accent block font-medium">
                  {unit.value}
                </span>
                <span className="text-[10px] font-mono tracking-wider text-creme-200/40 uppercase">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Feuilles deposees */}
        {gratitudes.length > 0 && (
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono tracking-widest text-creme-200/40 uppercase block">
              Feuilles ancrees ({gratitudes.length})
            </span>
            <div className="flex flex-wrap justify-center gap-2.5">
              {gratitudes.map((g) => (
                <div
                  key={g.id}
                  className="px-4 py-2 rounded-full bg-brun-800/80 border border-orange-accent/30 text-xs text-creme-100 flex items-center gap-2 shadow-sm"
                >
                  <Sparkles className="w-3 h-3 text-orange-accent" />
                  <span>&laquo; {g.text} &raquo;</span>
                  {g.author && (
                    <span className="text-creme-200/40 text-[11px]">&bull; {g.author}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Boutons d action : Telecharger et Partager */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            type="button"
            onClick={onDownloadCard}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-creme-200/10 hover:bg-creme-200/20 text-creme-100 font-sans text-xs tracking-wider uppercase font-medium border border-creme-200/20 transition-all duration-300"
          >
            <Download className="w-4 h-4 text-orange-accent" />
            <span>Telecharger ma carte</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-orange-accent hover:bg-orange-light text-creme-100 font-sans text-xs tracking-wider uppercase font-medium shadow-lg shadow-orange-accent/20 transition-all duration-300"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-creme-100" />
                <span>Lien de partage copie !</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-creme-100" />
                <span>Copier mon lien</span>
              </>
            )}
          </button>

          {isReadOnly && onResetToPersonal && (
            <button
              type="button"
              onClick={onResetToPersonal}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-brun-800 hover:bg-brun-700 text-creme-100 font-sans text-xs tracking-wider uppercase font-medium border border-orange-accent/40 shadow-md transition-all duration-300"
            >
              <Sprout className="w-4 h-4 text-orange-accent" />
              <span>Planter mon propre arbre</span>
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
