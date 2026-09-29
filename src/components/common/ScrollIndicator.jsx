import { ChevronDown } from 'lucide-react'

export function ScrollIndicator({ activeAct, totalActs = 5 }) {
  return (
    <aside
      aria-label="Navigation du parcours"
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-500"
    >
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-brun-900/40 backdrop-blur-sm border border-creme-200/10">
        <span className="text-[11px] font-mono tracking-widest text-creme-200/60 uppercase">
          Acte {activeAct} / {totalActs}
        </span>
      </div>
      <ChevronDown className="w-4 h-4 text-creme-200/40 animate-bounce" />
    </aside>
  )
}
