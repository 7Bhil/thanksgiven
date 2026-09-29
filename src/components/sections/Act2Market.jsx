import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const INGREDIENTS = [
  { name: 'Citrouilles ambrees', role: 'Douceur d antan', delay: '0.1' },
  { name: 'Mais de recolte', role: 'Pain dore sur braises', delay: '0.2' },
  { name: 'Pommes sauvages', role: 'Cidre et epices chaudes', delay: '0.3' },
  { name: 'Noix & chataignes', role: 'Richesses de sous-bois', delay: '0.4' },
]

export function Act2Market() {
  const containerRef = useRef(null)
  const itemsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation en parallaxe des elements du marche
      itemsRef.current.forEach((el, index) => {
        if (!el) return
        const speed = (index + 1) * 25
        gsap.fromTo(
          el,
          { y: speed * 1.5, opacity: 0.2 },
          {
            y: -speed,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="acte-2"
      ref={containerRef}
      aria-labelledby="title-acte-2"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 py-28 z-10 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto w-full space-y-16">
        <header className="text-center space-y-4 max-w-lg mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-orange-accent font-sans">
            Acte II &bull; Les Recoltes
          </p>
          <h2
            id="title-acte-2"
            className="font-serif text-4xl md:text-5xl font-normal text-creme-100"
          >
            Le Marche d&apos;Automne
          </h2>
          <p className="font-sans text-sm text-creme-200/70 font-light leading-relaxed">
            Avant de s&apos;assoir a la table, contemplons les tresors offerts par la terre au crepuscule des saisons.
          </p>
        </header>

        {/* Grille d ingredients avec effet de profondeur */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          {INGREDIENTS.map((item, idx) => (
            <div
              key={item.name}
              ref={(el) => (itemsRef.current[idx] = el)}
              className="p-6 rounded-2xl bg-brun-800/40 border border-creme-200/10 backdrop-blur-sm space-y-3 hover:border-orange-accent/30 transition-colors"
            >
              <span className="text-[11px] font-mono tracking-widest text-creme-200/40 uppercase">
                Offrande 0{idx + 1}
              </span>
              <h3 className="font-serif text-lg text-creme-100 font-medium">
                {item.name}
              </h3>
              <p className="font-sans text-xs text-creme-200/60 leading-relaxed">
                {item.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
