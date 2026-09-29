import { DISHES_DATA } from '../../data/dishesData'
import { Info, X } from 'lucide-react'

export function Act3Table({ selectedDish, onSelectDish }) {
  return (
    <section
      id="acte-3"
      aria-labelledby="title-acte-3"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 py-28 z-10"
    >
      <div className="max-w-4xl mx-auto w-full space-y-12">
        <header className="text-center space-y-4 max-w-lg mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-orange-accent font-sans font-medium">
            Acte III &bull; Le Festin Partage
          </p>
          <h2
            id="title-acte-3"
            className="font-serif text-4xl md:text-5xl font-normal text-creme-100"
          >
            La Table du Souvenir
          </h2>
          <p className="font-sans text-sm text-creme-200/70 font-light leading-relaxed">
            Chaque mets porte en lui l&apos;histoire de ceux qui l&apos;ont prepare et l&apos;empreinte des rassemblements passes.
          </p>
        </header>

        {/* Liste interactive des plats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DISHES_DATA.map((dish) => (
            <button
              key={dish.id}
              type="button"
              onClick={() => onSelectDish && onSelectDish(dish)}
              className="text-left p-6 rounded-2xl bg-brun-800/50 border border-creme-200/10 hover:border-orange-accent/40 hover:bg-brun-800/80 transition-all duration-300 group flex flex-col justify-between h-44"
            >
              <div>
                <span className="text-[11px] font-mono tracking-wider text-orange-accent/80 uppercase">
                  {dish.origin}
                </span>
                <h3 className="font-serif text-lg text-creme-100 group-hover:text-creme-50 transition-colors mt-1">
                  {dish.name}
                </h3>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-creme-200/50 group-hover:text-orange-accent transition-colors">
                <Info className="w-3.5 h-3.5" />
                <span className="font-sans">Lire le recit</span>
              </div>
            </button>
          ))}
        </div>

        {/* Modale d histoire du plat */}
        {selectedDish && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-dish-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brun-950/80 backdrop-blur-md transition-all animate-fadeIn"
          >
            <div className="relative max-w-md w-full p-8 rounded-3xl bg-brun-900 border border-creme-200/20 shadow-2xl space-y-6">
              <button
                type="button"
                onClick={() => onSelectDish && onSelectDish(null)}
                aria-label="Fermer le recit"
                className="absolute top-6 right-6 p-1.5 rounded-full text-creme-200/60 hover:text-creme-100 hover:bg-creme-200/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <header className="space-y-1 pr-6">
                <span className="text-xs font-mono tracking-widest text-orange-accent uppercase">
                  {selectedDish.origin}
                </span>
                <h3 id="modal-dish-title" className="font-serif text-2xl text-creme-100">
                  {selectedDish.name}
                </h3>
              </header>

              <p className="font-sans text-sm text-creme-200/80 leading-relaxed font-light">
                {selectedDish.description}
              </p>

              <div className="p-4 rounded-xl bg-brun-800/60 border border-creme-200/10">
                <span className="text-[11px] font-mono tracking-wider text-creme-200/40 uppercase block mb-1">
                  Note culinaire
                </span>
                <p className="font-sans text-xs text-creme-200/70 italic">
                  {selectedDish.details}
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => onSelectDish && onSelectDish(null)}
                  className="px-5 py-2 text-xs font-sans tracking-wide uppercase font-medium rounded-full bg-creme-200/10 text-creme-100 hover:bg-creme-200/20 transition-colors"
                >
                  Refermer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
