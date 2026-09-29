/**
 * Utilitaire d'encodage, décodage et assainissement des gratitudes pour le partage par URL (?g=...)
 */

const MAX_LEAVES = 12
const MAX_TEXT_LENGTH = 80
const MAX_AUTHOR_LENGTH = 30
const ALLOWED_COLORS = ['#d9622b', '#c27827', '#b85e2b', '#a83822', '#dec195', '#e27b49']

/**
 * Assainit une chaîne de caractères en supprimant les caractères de contrôle et balises HTML
 */
function sanitizeString(input, maxLength) {
  if (typeof input !== 'string') return ''
  return input
    .replace(/[<>]/g, '') // Suppression des chevrons HTML
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Suppression des caractères de contrôle
    .trim()
    .slice(0, maxLength)
}

/**
 * Encode un tableau de gratitudes en chaîne Base64 compacte et sûre pour les URL
 */
export function encodeGratitudesToUrl(gratitudes) {
  try {
    if (!Array.isArray(gratitudes) || gratitudes.length === 0) return ''

    // Format compact pour minimiser la longueur de l'URL : [text, author, colorHex]
    const compactData = gratitudes.slice(0, MAX_LEAVES).map((g) => [
      sanitizeString(g.text, MAX_TEXT_LENGTH),
      sanitizeString(g.author, MAX_AUTHOR_LENGTH),
      ALLOWED_COLORS.includes(g.leafColor) ? g.leafColor : ALLOWED_COLORS[0],
    ])

    const jsonString = JSON.stringify(compactData)
    // Encodage robuste compatible UTF-8 (accents français)
    const utf8Bytes = new TextEncoder().encode(jsonString)
    let binary = ''
    utf8Bytes.forEach((byte) => (binary += String.fromCharCode(byte)))
    
    // Base64 compatible URL
    return btoa(binary)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '')
  } catch (err) {
    console.warn('Erreur lors de l encodage de l URL de partage', err)
    return ''
  }
}

/**
 * Décode et valide rigoureusement le paramètre Base64 depuis l'URL
 */
export function decodeGratitudesFromUrl(searchString = window.location.search) {
  try {
    const params = new URLSearchParams(searchString)
    const encoded = params.get('g')
    if (!encoded || typeof encoded !== 'string') return null

    // Restauration du Base64 standard
    let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/')
    while (base64.length % 4 !== 0) {
      base64 += '='
    }

    const binary = atob(base64)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }

    const jsonString = new TextDecoder().decode(bytes)
    const rawData = JSON.parse(jsonString)

    if (!Array.isArray(rawData)) return null

    // Validation et assainissement strict de chaque élément
    const sanitizedLeaves = rawData
      .slice(0, MAX_LEAVES)
      .filter((item) => Array.isArray(item) && typeof item[0] === 'string' && item[0].trim().length > 0)
      .map((item, index) => {
        const text = sanitizeString(item[0], MAX_TEXT_LENGTH)
        const author = sanitizeString(item[1] || 'Un proche', MAX_AUTHOR_LENGTH)
        const color = ALLOWED_COLORS.includes(item[2]) ? item[2] : ALLOWED_COLORS[index % ALLOWED_COLORS.length]

        return {
          id: `shared-leaf-${index}`,
          text,
          author,
          leafColor: color,
          createdAt: new Date().toISOString(),
          isShared: true,
        }
      })

    return sanitizedLeaves.length > 0 ? sanitizedLeaves : null
  } catch (err) {
    console.warn('Parametre de partage invalide ou corrompu dans l URL', err)
    return null
  }
}
