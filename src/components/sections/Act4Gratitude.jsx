import { useState } from 'react'
import { Send, Leaf, Trash2, CheckCircle2 } from 'lucide-react'

const SUGGESTIONS = [
  'La chaleur d un repas partage en paix',
  'Le rire complice au coin du feu',
  'La bienveillance d une presence fidele',
  'La quietude d un matin d automne',
]

const LEAF_COLORS = [
  { id: 'orange', hex: '#d9622b', label: 'Orange brule' },
  { id: 'ambre', hex: '#c27827', label: 'Ambre dore' },
  { id: 'cuivre', hex: '#b85e2b', label: 'Cuivre chaud' },
  { id: 'rouge', hex: '#a83822', label: 'Rouge erable' },
  { id: 'creme', hex: '#dec195', label: 'Dore automnal' },
]

export function Act4Gratitude({
  onAddGratitude,
  onDeleteGratitude,
  gratitudes = [],
  maxGratitudes = 12,
  isAnimating = false,
}) {
  const [text, setText] = useState('')
  const [author, setAuthor] = useState('')
  const [selectedColor, setSelectedColor] = useState(LEAF_COLORS[0].hex)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim() || isAnimating) return
    if (gratitudes.length >= maxGratitudes) return

    const newGratitude = {
      id: `leaf-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      text: text.trim().slice(0, 80),
      author: author.trim().slice(0, 30) || 'Un cœur reconnaissant',
      leafColor: selectedColor,
      createdAt: new Date().toISOString(),
    }

    onAddGratitude(newGratitude)
    setText('')
    setAuthor('')
    setShowConfirmation(true)
    setTimeout(() => setShowConfirmation(false), 3000)
  }

  const isFull = gratitudes.length >= maxGratitudes
  const remainingChars = 80 - text.length

  return (
    <section
      id="acte-4"
      aria-labelledby="title-acte-4"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 py-28 z-10"
    >
      <div className="max-w-2xl mx-auto w-full space-y-12">
        <header className="text-center space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-orange-accent font-sans font-medium">
            Acte IV &bull; L Offrande Personnelle
          </p>
          <h2
            id="title-acte-4"
            className="font-serif text-4xl md:text-5xl font-normal text-creme-100"
          >
            La Feuille de Gratitude
          </h2>
          <p className="font-sans text-sm text-creme-200/75 font-light leading-relaxed max-w-lg mx-auto">
            Pour qui ou pour quoi bat votre reconnaissance aujourd&apos;hui ? Posez vos mots sur une feuille qui s&apos;envolera vers l&apos;arbre.
          </p>
        </header>

        {/* Formulaire d offrande */}
        <form
          onSubmit={handleSubmit}
          className="p-8 rounded-3xl bg-brun-800/70 border border-creme-200/15 backdrop-blur-md shadow-2xl space-y-6"
        >
          {/* Zone de texte de la gratitude */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono text-creme-200/60">
              <label htmlFor="gratitude-input">Votre parole de gratitude</label>
              <span className={remainingChars < 10 ? 'text-orange-accent font-semibold' : ''}>
                {text.length} / 80
              </span>
            </div>
            <textarea
              id="gratitude-input"
              rows={3}
              maxLength={80}
              disabled={isFull || isAnimating}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={isFull ? 'L arbre a accueilli ses 12 feuilles. Vous pouvez en liberer une ci-dessous.' : 'Un instant de paix, la voix d un proche, une saveur partagee...'}
              className="w-full px-4 py-3 rounded-2xl bg-brun-900/80 border border-creme-200/15 text-creme-100 placeholder:text-creme-200/30 text-sm focus:outline-none focus:border-orange-accent focus:ring-1 focus:ring-orange-accent resize-none transition-colors"
            />
          </div>

          {/* Suggestions rapides d inspiration */}
          {!isFull && (
            <div className="space-y-2">
              <span className="text-[11px] font-mono tracking-wider text-creme-200/40 uppercase block">
                Inspirations d automne
              </span>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((sug) => (
                  <button
                    key={sug}
                    type="button"
                    onClick={() => setText(sug)}
                    className="px-3 py-1 rounded-full bg-brun-900/60 border border-creme-200/10 hover:border-orange-accent/40 text-[11px] text-creme-200/70 hover:text-creme-100 transition-colors"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Choix de la nuance d automne */}
          <div className="space-y-2">
            <label className="text-[11px] font-mono tracking-wider text-creme-200/40 uppercase block">
              Nuance de la feuille
            </label>
            <div className="flex items-center gap-3">
              {LEAF_COLORS.map((col) => (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => setSelectedColor(col.hex)}
                  title={col.label}
                  aria-label={col.label}
                  className={`w-7 h-7 rounded-full border-2 transition-all ${
                    selectedColor === col.hex
                      ? 'border-creme-100 scale-110 shadow-[0_0_12px_rgba(217,98,43,0.6)]'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: col.hex }}
                />
              ))}
            </div>
          </div>

          {/* Auteur ou signature */}
          <div className="space-y-2">
            <label htmlFor="author-input" className="text-xs font-mono text-creme-200/60 block">
              Prenom ou signature (optionnel)
            </label>
            <input
              id="author-input"
              type="text"
              maxLength={30}
              disabled={isFull || isAnimating}
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Ex: Camille, Thomas..."
              className="w-full px-4 py-2.5 rounded-xl bg-brun-900/80 border border-creme-200/15 text-creme-100 placeholder:text-creme-200/30 text-sm focus:outline-none focus:border-orange-accent focus:ring-1 focus:ring-orange-accent transition-colors"
            />
          </div>

          {/* Pied du formulaire et validation */}
          <div className="flex items-center justify-between pt-2 border-t border-creme-200/10">
            <div className="flex items-center gap-2 text-xs font-mono text-creme-200/60">
              <Leaf className="w-4 h-4 text-orange-accent" />
              <span>{gratitudes.length} / {maxGratitudes} feuilles ancrees</span>
            </div>

            <button
              type="submit"
              disabled={!text.trim() || isFull || isAnimating}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-light to-orange-dark hover:brightness-110 active:scale-95 disabled:opacity-40 disabled:pointer-events-none text-creme-100 text-xs tracking-wider uppercase font-medium shadow-md shadow-orange-accent/30 transition-all"
            >
              {isAnimating ? (
                <span>Envol en cours...</span>
              ) : (
                <>
                  <span>Accrocher a l arbre</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>

          {/* Notification temporaire d envol */}
          {showConfirmation && (
            <div className="p-3 rounded-xl bg-orange-accent/15 border border-orange-accent/30 text-xs text-creme-100 flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-orange-accent shrink-0" />
              <span>Votre feuille s&apos;envole et rejoint les branches de l&apos;arbre...</span>
            </div>
          )}
        </form>

        {/* Liste des gratitudes existantes avec gestion */}
        {gratitudes.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xs font-mono tracking-widest text-creme-200/50 uppercase text-center">
              Feuilles actuellement suspendues a votre arbre
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {gratitudes.map((g) => (
                <div
                  key={g.id}
                  className="p-4 rounded-2xl bg-brun-900/60 border border-creme-200/10 flex items-start justify-between gap-3 group hover:border-orange-accent/30 transition-colors"
                >
                  <div className="space-y-1">
                    <p className="text-xs text-creme-100 leading-relaxed font-light">
                      &laquo; {g.text} &raquo;
                    </p>
                    <span className="text-[11px] font-mono text-creme-200/40 block">
                      {g.author} &bull; {new Date(g.createdAt).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  {onDeleteGratitude && (
                    <button
                      type="button"
                      onClick={() => onDeleteGratitude(g.id)}
                      aria-label="Liberer cette feuille"
                      className="p-1 rounded-md text-creme-200/30 hover:text-orange-accent hover:bg-brun-800 transition-colors"
                      title="Liberer cette feuille"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
