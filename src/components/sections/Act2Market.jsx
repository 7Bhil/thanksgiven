import { useState } from 'react'
import { ShoppingBag, Plus, Check } from 'lucide-react'
import { THANKSGIVING_PRODUCTS } from '../../data/thanksgivingProducts'
import { autumnSound } from '../../utils/soundEngine'

export function Act2Market({ onAddToCart }) {
  const [addedId, setAddedId] = useState(null)

  const handleAdd = (product) => {
    onAddToCart?.(product)
    autumnSound.playLeafArrival()
    setAddedId(product.id)
    setTimeout(() => setAddedId(null), 1500)
  }

  return (
    <section
      id="acte-2"
      aria-labelledby="title-acte-2"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 py-28 z-10 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full space-y-16">
        <header className="text-center space-y-4 max-w-xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-orange-accent font-sans">
            Acte II &bull; Les Récoltes &bull; La Boutique
          </p>
          <h2
            id="title-acte-2"
            className="font-serif text-4xl md:text-5xl font-normal text-creme-100"
          >
            Le Marché d&apos;Automne
          </h2>
          <p className="font-sans text-sm text-creme-200/80 font-light leading-relaxed">
            Paniers gourmands, douceurs artisanales et ornements de fête : choisissez vos trésors du terroir pour embellir vos tablées de Thanksgiving.
          </p>
        </header>

        {/* Grille d'articles e-commerce */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {THANKSGIVING_PRODUCTS.map((product) => {
            const isJustAdded = addedId === product.id

            return (
              <article
                key={product.id}
                className="relative p-7 rounded-3xl bg-forest-900/60 border border-creme-100/10 hover:border-orange-accent/40 backdrop-blur-md shadow-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="space-y-4">
                  {/* Catégorie & Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-orange-accent">
                      {product.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-orange-accent/10 border border-orange-accent/30 text-[10px] font-mono text-creme-100">
                      {product.badge}
                    </span>
                  </div>

                  {/* Nom & Description */}
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl text-creme-100 font-normal group-hover:text-orange-accent transition-colors">
                      {product.name}
                    </h3>
                    <p className="font-sans text-xs text-creme-200/70 font-light leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* Prix & Bouton Ajout */}
                <div className="pt-6 mt-6 border-t border-creme-100/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-creme-200/50 font-sans block">Prix unitaire</span>
                    <span className="font-serif text-xl md:text-2xl text-creme-100 font-semibold">
                      {product.price.toLocaleString('fr-FR')} XOF
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAdd(product)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-sans tracking-wide uppercase transition-all duration-200 ${
                      isJustAdded
                        ? 'bg-orange-accent text-forest-900 font-semibold shadow-lg shadow-orange-accent/30'
                        : 'bg-creme-100/10 hover:bg-orange-accent hover:text-forest-900 text-creme-100 border border-creme-100/20 hover:border-orange-accent'
                    }`}
                  >
                    {isJustAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Ajouté</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Ajouter</span>
                      </>
                    )}
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
