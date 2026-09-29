import { Sprout, Eye } from 'lucide-react'

export function ReadOnlyBanner({ onResetToPersonal }) {
  return (
    <aside
      aria-label="Mode arbre partagé"
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-2 rounded-full border border-orange-accent/40 bg-brun-900/85 backdrop-blur-md shadow-2xl text-xs text-creme-100 animate-fadeIn"
    >
      <div className="flex items-center gap-1.5 text-orange-accent font-medium">
        <Eye className="w-3.5 h-3.5" />
        <span className="font-sans">Arbre partage</span>
      </div>

      <span className="text-creme-200/30">&bull;</span>

      <button
        type="button"
        onClick={onResetToPersonal}
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-accent hover:bg-orange-light text-creme-100 font-sans text-[11px] font-medium tracking-wide uppercase transition-colors"
      >
        <Sprout className="w-3 h-3" />
        <span>Planter mon propre arbre</span>
      </button>
    </aside>
  )
}
