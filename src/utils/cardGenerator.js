/**
 * Générateur de carte souvenir Thanksgiving 2026 en haute résolution (1080x1920 pour stories)
 * Génération 100% côté client via Canvas 2D API
 */

export async function generateThanksgivingCard(gratitudes = []) {
  // Attendre le chargement des polices si disponible
  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready
  }

  const canvas = document.createElement('canvas')
  canvas.width = 1080
  canvas.height = 1920
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  // 1. Fond sombre et dégradé chaleureux
  const bgGrad = ctx.createLinearGradient(0, 0, 0, 1920)
  bgGrad.addColorStop(0, '#120a06')
  bgGrad.addColorStop(0.35, '#1a0f0a')
  bgGrad.addColorStop(0.7, '#24150e')
  bgGrad.addColorStop(1, '#0d0705')
  ctx.fillStyle = bgGrad
  ctx.fillRect(0, 0, 1080, 1920)

  // 2. Halo lumineux chaud au centre de l'arbre
  const aura = ctx.createRadialGradient(540, 850, 50, 540, 850, 650)
  aura.addColorStop(0, 'rgba(217, 98, 43, 0.25)')
  aura.addColorStop(0.5, 'rgba(194, 120, 39, 0.12)')
  aura.addColorStop(1, 'rgba(26, 15, 10, 0)')
  ctx.fillStyle = aura
  ctx.fillRect(0, 0, 1080, 1920)

  // 3. Cadre décoratif raffiné
  ctx.strokeStyle = 'rgba(244, 234, 216, 0.15)'
  ctx.lineWidth = 2
  ctx.strokeRect(40, 40, 1000, 1840)

  ctx.strokeStyle = 'rgba(217, 98, 43, 0.4)'
  ctx.lineWidth = 1
  ctx.strokeRect(55, 55, 970, 1810)

  // Coins décoratifs
  const drawCorner = (x, y, dx, dy) => {
    ctx.beginPath()
    ctx.moveTo(x, y + dy * 20)
    ctx.lineTo(x, y)
    ctx.lineTo(x + dx * 20, y)
    ctx.strokeStyle = '#d9622b'
    ctx.lineWidth = 3
    ctx.stroke()
  }
  drawCorner(55, 55, 1, 1)
  drawCorner(1025, 55, -1, 1)
  drawCorner(55, 1865, 1, -1)
  drawCorner(1025, 1865, -1, -1)

  // 4. En-tête
  ctx.textAlign = 'center'
  ctx.fillStyle = '#d9622b'
  ctx.font = '600 24px "Inter", sans-serif'
  ctx.letterSpacing = '6px'
  ctx.fillText('THANKSGIVING 2026 • 26 NOVEMBRE', 540, 150)

  ctx.fillStyle = '#f4ead8'
  ctx.font = 'normal 72px "Fraunces", Georgia, serif'
  ctx.fillText("L'Arbre de Gratitude", 540, 245)

  ctx.fillStyle = 'rgba(244, 234, 216, 0.65)'
  ctx.font = '300 28px "Inter", sans-serif'
  ctx.fillText('Semé de mercis, enraciné dans le cœur', 540, 305)

  // 5. Dessin stylisé de l'Arbre d'Automne (haute résolution)
  drawStylizedTree(ctx, 540, 920)

  // 6. Sélection des gratitudes à afficher (max 4 pour équilibre visuel)
  const displayGratitudes = gratitudes.slice(0, 4)
  const startY = 1120
  const cardHeight = 115
  const gap = 24

  displayGratitudes.forEach((item, idx) => {
    const y = startY + idx * (cardHeight + gap)
    const cardColor = item.leafColor || '#d9622b'

    // Fond de la carte de gratitude
    ctx.fillStyle = 'rgba(36, 21, 14, 0.85)'
    roundRect(ctx, 120, y, 840, cardHeight, 20)
    ctx.fill()

    // Bordure douce et liseré de couleur
    ctx.strokeStyle = 'rgba(244, 234, 216, 0.12)'
    ctx.lineWidth = 1.5
    roundRect(ctx, 120, y, 840, cardHeight, 20)
    ctx.stroke()

    // Pastille de feuille de couleur
    ctx.fillStyle = cardColor
    ctx.beginPath()
    ctx.arc(165, y + cardHeight / 2, 12, 0, Math.PI * 2)
    ctx.fill()

    // Texte de la gratitude (avec troncature propre)
    ctx.textAlign = 'left'
    ctx.fillStyle = '#f4ead8'
    ctx.font = 'italic 26px "Fraunces", Georgia, serif'
    const cleanText = `« ${item.text} »`
    const truncatedText = cleanText.length > 52 ? `${cleanText.slice(0, 50)}... »` : cleanText
    ctx.fillText(truncatedText, 200, y + 50)

    // Auteur
    ctx.fillStyle = 'rgba(244, 234, 216, 0.55)'
    ctx.font = '500 20px "Inter", sans-serif'
    ctx.fillText(`— ${item.author || 'Un cœur reconnaissant'}`, 200, y + 88)
  })

  // 7. Pied de page
  ctx.textAlign = 'center'
  ctx.fillStyle = 'rgba(217, 98, 43, 0.9)'
  ctx.font = '500 22px "Inter", sans-serif'
  ctx.fillText(`${gratitudes.length} feuille${gratitudes.length > 1 ? 's' : ''} enracinée${gratitudes.length > 1 ? 's' : ''} sur cet arbre`, 540, 1750)

  ctx.fillStyle = 'rgba(244, 234, 216, 0.35)'
  ctx.font = '400 18px "Inter", sans-serif'
  ctx.fillText('thanksgiven • rituel d automne', 540, 1795)

  // Export en Blob puis déclenchement du téléchargement
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        resolve(false)
        return
      }
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `arbre-de-gratitude-${Date.now()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      setTimeout(() => URL.revokeObjectURL(url), 1000)
      resolve(true)
    }, 'image/png')
  })
}

/**
 * Dessine un arbre low-poly d'automne stylisé sur le canvas
 */
function drawStylizedTree(ctx, centerX, baseY) {
  // Tronc en cône facetté
  ctx.fillStyle = '#42291a'
  ctx.beginPath()
  ctx.moveTo(centerX - 35, baseY)
  ctx.lineTo(centerX - 18, baseY - 240)
  ctx.lineTo(centerX + 18, baseY - 240)
  ctx.lineTo(centerX + 35, baseY)
  ctx.closePath()
  ctx.fill()

  // Branches maîtresses
  ctx.strokeStyle = '#42291a'
  ctx.lineWidth = 14
  ctx.lineCap = 'round'

  ctx.beginPath()
  ctx.moveTo(centerX - 12, baseY - 180)
  ctx.lineTo(centerX - 90, baseY - 260)
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(centerX + 12, baseY - 170)
  ctx.lineTo(centerX + 95, baseY - 250)
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(centerX, baseY - 200)
  ctx.lineTo(centerX + 10, baseY - 310)
  ctx.stroke()

  // Amas de feuillage d'automne volumétriques
  const clusters = [
    { x: centerX, y: baseY - 370, r: 85, color: '#d9622b' },
    { x: centerX - 80, y: baseY - 320, r: 75, color: '#c27827' },
    { x: centerX + 85, y: baseY - 310, r: 78, color: '#e27b49' },
    { x: centerX - 120, y: baseY - 240, r: 65, color: '#b85e2b' },
    { x: centerX + 125, y: baseY - 235, r: 70, color: '#dec195' },
    { x: centerX - 30, y: baseY - 270, r: 72, color: '#a83822' },
    { x: centerX + 45, y: baseY - 265, r: 75, color: '#d9622b' },
  ]

  clusters.forEach((c) => {
    ctx.fillStyle = c.color
    drawFacetedCircle(ctx, c.x, c.y, c.r, 8)
  })

  // Feuilles dorées tourbillonnant autour de l'arbre
  const leaves = [
    { x: centerX - 180, y: baseY - 300, r: 8, col: '#d9622b' },
    { x: centerX - 140, y: baseY - 160, r: 7, col: '#dec195' },
    { x: centerX + 160, y: baseY - 280, r: 9, col: '#c27827' },
    { x: centerX + 190, y: baseY - 150, r: 8, col: '#e27b49' },
    { x: centerX - 50, y: baseY - 110, r: 7, col: '#d9622b' },
    { x: centerX + 60, y: baseY - 90, r: 8, col: '#b85e2b' },
  ]

  leaves.forEach((l) => {
    ctx.fillStyle = l.col
    ctx.beginPath()
    ctx.ellipse(l.x, l.y, l.r * 1.5, l.r, Math.PI / 4, 0, Math.PI * 2)
    ctx.fill()
  })
}

/**
 * Dessine un polygone régulier facetté (effet low-poly 2D)
 */
function drawFacetedCircle(ctx, cx, cy, r, sides = 8) {
  ctx.beginPath()
  for (let i = 0; i < sides; i++) {
    const angle = (i / sides) * Math.PI * 2
    const x = cx + Math.cos(angle) * r
    const y = cy + Math.sin(angle) * r
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.closePath()
  ctx.fill()
}

/**
 * Tracé d'un rectangle à coins arrondis
 */
function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.lineTo(x + width - radius, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
  ctx.lineTo(x + width, y + height - radius)
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  ctx.lineTo(x + radius, y + height)
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
  ctx.lineTo(x, y + radius)
  ctx.quadraticCurveTo(x, y, x + radius, y)
  ctx.closePath()
}
