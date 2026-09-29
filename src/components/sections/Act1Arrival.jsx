import { Sparkles } from 'lucide-react'

export function Act1Arrival({ onEnter }) {
  return (
    <section
      id="acte-1"
      aria-labelledby="title-acte-1"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 text-center z-10"
    >
      {/* Halo de lueur feutree */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-orange-accent/15 blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center space-y-10 pt-16">
        <header className="space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-orange-accent font-sans font-medium">
            Thanksgiving 2026 &bull; Rituel d automne
          </p>
          <h1
            id="title-acte-1"
            className="font-serif text-5xl md:text-7xl font-normal tracking-tight text-creme-100 leading-[1.1] drop-shadow-sm"
          >
            L&apos;Arbre de Gratitude
          </h1>
          <p className="font-sans text-sm md:text-base text-creme-200/75 max-w-md mx-auto font-light leading-relaxed">
            Un instant suspendu pour honorer ce qui nous nourrit et semer les mercis qui restent.
          </p>
        </header>

        <div className="pt-2">
          <button
            type="button"
            onClick={onEnter}
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-b from-orange-light to-orange-dark text-creme-100 font-sans text-sm tracking-wide font-medium shadow-[0_8px_24px_rgba(217,98,43,0.35)] hover:shadow-[0_12px_32px_rgba(217,98,43,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-accent focus:ring-offset-2 focus:ring-offset-brun-900 pointer-events-auto"
          >
            <Sparkles className="w-4 h-4 text-creme-200 group-hover:rotate-12 transition-transform duration-300" />
            <span>Entrer dans l&apos;experience</span>
          </button>
        </div>
      </div>
    </section>
  )
}
