import { useState } from 'react'
import { Send, Leaf } from 'lucide-react'

export function Act4Gratitude({ onAddGratitude, gratitudes = [], maxGratitudes = 12 }) {
  const [text, setText] = useState('')
  const [author, setAuthor] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    if (gratitudes.length >= maxGratitudes) return

    onAddGratitude({
      id: Date.now().toString(),
      text: text.trim().slice(0, 80),
      author: author.trim().slice(0, 30) || 'Un cœur reconnaissant',
      createdAt: new Date().toISOString(),
    })

    setText('')
    setAuthor('')
  }

  const isFull = gratitudes.length >= maxGratitudes

  return (
    <section
      id="acte-4"
      aria-labelledby="title-acte-4"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 py-28 z-10"
    >
      <div className="max-w-xl mx-auto w-full space-y-10">
        <header className="text-center space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-orange-accent font-sans">
            Acte IV &bull; L Offrande Personnelle
          </p>
          <h2
            id="title-acte-4"
            className="font-serif text-4xl md:text-5xl font-normal text-creme-100"
          >
            La Feuille de Gratitude
          </h2>
          <p className="font-sans text-sm text-creme-200/70 font-light leading-relaxed">
            Pour qui ou pour quoi bat votre gratitude aujourd&apos;hui ? Confiez vos mots a l&apos;arbre.
          </p>
        </header>

        {/* Formulaire d offrande */}
        <form
          onSubmit={handleSubmit}
          className="p-8 rounded-3xl bg-brun-800/60 border border-creme-200/15 backdrop-blur-md shadow-xl space-y-6"
        >
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono text-creme-200/50">
              <label htmlFor="gratitude-input">Votre gratitude (max 80 caracteres)</label>
              <span>{text.length}/80</span>
            </div>
            <textarea
              id="gratitude-input"
              rows={3}
              maxLength={80}
              disabled={isFull}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={isFull ? 'L arbre est pleinement fleuri (12 feuilles atteintes).' : 'Un instant de paix, la voix d un proche, une saveur partagee...'}
              className="w-full px-4 py-3 rounded-2xl bg-brun-900/80 border border-creme-200/10 text-creme-100 placeholder:text-creme-200/30 text-sm focus:outline-none focus:border-orange-accent focus:ring-1 focus:ring-orange-accent resize-none transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="author-input" className="text-xs font-mono text-creme-200/50 block">
              Votre prenom ou signature (optionnel)
            </label>
            <input
              id="author-input"
              type="text"
              maxLength={30}
              disabled={isFull}
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Ex: Camille"
              className="w-full px-4 py-2.5 rounded-xl bg-brun-900/80 border border-creme-200/10 text-creme-100 placeholder:text-creme-200/30 text-sm focus:outline-none focus:border-orange-accent focus:ring-1 focus:ring-orange-accent transition-colors"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 text-xs font-mono text-creme-200/60">
              <Leaf className="w-3.5 h-3.5 text-orange-accent" />
              <span>{gratitudes.length} / {maxGratitudes} feuilles</span>
            </div>

            <button
              type="submit"
              disabled={!text.trim() || isFull}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-orange-accent hover:bg-orange-light active:bg-orange-dark disabled:opacity-40 disabled:pointer-events-none text-creme-100 text-xs tracking-wider uppercase font-medium transition-colors"
            >
              <span>Accrocher a l arbre</span>
              <Send className="w-3 h-3" />
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
