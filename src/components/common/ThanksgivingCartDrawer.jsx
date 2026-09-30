import { useState } from 'react'
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, CheckCircle } from 'lucide-react'
import { autumnSound } from '../../utils/soundEngine'

export function ThanksgivingCartDrawer({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) {
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [orderCompleted, setOrderCompleted] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
  })

  if (!isOpen) return null

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const shipping = subtotal > 40000 || subtotal === 0 ? 0 : 3000
  const total = subtotal + shipping

  const handleQuantity = (productId, delta) => {
    onUpdateQuantity?.(productId, delta)
    autumnSound.playLeafArrival()
  }

  const handleRemove = (productId) => {
    onRemoveItem?.(productId)
    autumnSound.playLeafArrival()
  }

  const handleSubmitOrder = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.address) return

    const generatedId = `TG-${Math.floor(100000 + Math.random() * 900000)}`
    setOrderId(generatedId)
    setOrderCompleted(true)
    onClearCart?.()
    autumnSound.playLeafArrival()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex justify-end bg-forest-900/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-forest-900 border-l border-orange-accent/30 h-full flex flex-col justify-between p-6 shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête */}
        <div className="flex items-center justify-between border-b border-creme-100/10 pb-4">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-orange-accent" />
            <h2 className="font-serif text-2xl text-creme-100 font-normal">
              {orderCompleted
                ? 'Commande Confirmée'
                : isCheckingOut
                ? 'Validation de Commande'
                : 'Panier du Marché'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-creme-200/50 hover:text-creme-100 transition-colors rounded-full hover:bg-forest-800"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corps */}
        {orderCompleted ? (
          <div className="my-auto text-center space-y-5 py-8">
            <div className="w-16 h-16 mx-auto rounded-full bg-orange-accent/20 border border-orange-accent/40 flex items-center justify-center text-orange-accent">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-widest uppercase text-orange-accent">
                Préparation Artisanale
              </span>
              <h3 className="font-serif text-3xl text-creme-100">
                Merci, {formData.name}
              </h3>
              <p className="font-sans text-xs text-creme-200/80 font-light max-w-xs mx-auto leading-relaxed">
                Votre commande n° <strong className="text-orange-accent font-mono">{orderId}</strong> a été enregistrée avec soin. Un récapitulatif a été expédié à <strong className="text-creme-100">{formData.email}</strong>.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setOrderCompleted(false)
                setIsCheckingOut(false)
                onClose()
              }}
              className="px-6 py-2.5 rounded-full bg-orange-accent text-forest-900 text-xs font-sans uppercase tracking-wider font-semibold hover:bg-orange-accent/90 transition-all"
            >
              Fermer et continuer
            </button>
          </div>
        ) : isCheckingOut ? (
          <form onSubmit={handleSubmitOrder} className="py-4 space-y-4 my-auto">
            <div className="space-y-1 text-left">
              <label className="text-[11px] font-mono uppercase text-orange-accent">Nom &amp; Prénom</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Éléonore Martin"
                className="w-full px-3.5 py-2 rounded-xl bg-forest-800 border border-creme-100/20 text-xs text-creme-100 focus:outline-none focus:border-orange-accent"
              />
            </div>

            <div className="space-y-1 text-left">
              <label className="text-[11px] font-mono uppercase text-orange-accent">Courriel de contact</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="famille@recoltes.fr"
                className="w-full px-3.5 py-2 rounded-xl bg-forest-800 border border-creme-100/20 text-xs text-creme-100 focus:outline-none focus:border-orange-accent"
              />
            </div>

            <div className="space-y-1 text-left">
              <label className="text-[11px] font-mono uppercase text-orange-accent">Adresse de livraison</label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="24 Chemin des Vignes"
                className="w-full px-3.5 py-2 rounded-xl bg-forest-800 border border-creme-100/20 text-xs text-creme-100 focus:outline-none focus:border-orange-accent"
              />
            </div>

            <div className="space-y-1 text-left">
              <label className="text-[11px] font-mono uppercase text-orange-accent">Ville &amp; Code Postal</label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="69000 Lyon"
                className="w-full px-3.5 py-2 rounded-xl bg-forest-800 border border-creme-100/20 text-xs text-creme-100 focus:outline-none focus:border-orange-accent"
              />
            </div>

            {/* Total */}
            <div className="p-3 rounded-xl bg-forest-800 border border-orange-accent/20 space-y-1 text-xs">
              <div className="flex justify-between text-creme-200">
                <span>Total à régler :</span>
                <span className="font-serif text-base text-orange-accent font-semibold">{total.toLocaleString('fr-FR')} XOF</span>
              </div>
              <p className="text-[10px] text-creme-200/50 font-light">
                Simulation de paiement immédiat sans intermédiaire.
              </p>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setIsCheckingOut(false)}
                className="w-1/3 py-2.5 rounded-xl border border-creme-100/20 text-xs text-creme-200 hover:text-creme-100"
              >
                Retour
              </button>
              <button
                type="submit"
                className="w-2/3 py-2.5 rounded-xl bg-orange-accent hover:bg-orange-accent/90 text-forest-900 text-xs font-semibold uppercase tracking-wider transition-all"
              >
                Valider la commande
              </button>
            </div>
          </form>
        ) : (
          <div className="flex-1 py-4 overflow-y-auto space-y-3">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-3 text-creme-200/50">
                <ShoppingBag className="w-10 h-10 mx-auto opacity-30" />
                <p className="font-serif text-lg">Votre panier est vide</p>
                <p className="font-sans text-xs">Sélectionnez des articles d automne dans le Marché.</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-forest-800 border border-creme-100/10 flex items-center justify-between gap-3"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-xl object-cover border border-creme-100/15 flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm text-creme-100 truncate">
                      {item.name}
                    </h4>
                    <span className="text-xs font-mono text-orange-accent">
                      {item.price.toLocaleString('fr-FR')} XOF
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-creme-100/20 rounded-lg bg-forest-900">
                      <button
                        type="button"
                        onClick={() => handleQuantity(item.id, -1)}
                        className="p-1 hover:text-orange-accent text-creme-200/70"
                        aria-label="Diminuer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-mono text-creme-100">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => handleQuantity(item.id, 1)}
                        className="p-1 hover:text-orange-accent text-creme-200/70"
                        aria-label="Augmenter"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      className="p-1.5 text-creme-200/40 hover:text-red-400 transition-colors"
                      aria-label="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Pied */}
        {!orderCompleted && !isCheckingOut && cartItems.length > 0 && (
          <div className="border-t border-creme-100/10 pt-4 space-y-3">
            <div className="space-y-1.5 text-xs text-creme-200/80 font-light">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span className="font-mono text-creme-100">{subtotal.toLocaleString('fr-FR')} XOF</span>
              </div>
              <div className="flex justify-between">
                <span>Frais de livraison</span>
                <span className="font-mono text-creme-100">
                  {shipping === 0 ? 'Gratuits dès 40 000 XOF' : `${shipping.toLocaleString('fr-FR')} XOF`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-medium text-creme-100 pt-1 border-t border-creme-100/10">
                <span>Total</span>
                <span className="font-serif text-lg text-orange-accent font-semibold">
                  {total.toLocaleString('fr-FR')} XOF
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsCheckingOut(true)}
              className="w-full py-3 rounded-full bg-orange-accent hover:bg-orange-accent/90 text-forest-900 font-sans text-xs tracking-wider uppercase font-semibold shadow-lg shadow-orange-accent/20 flex items-center justify-center gap-2 transition-all"
            >
              <span>Commander mes articles</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
