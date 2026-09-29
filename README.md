# L'Arbre de Gratitude &bull; Thanksgiving 2026

Experience web immersive de Thanksgiving en **front-end pur** (Vite + React + Three.js / React Three Fiber + Tailwind CSS v3).

Projet sans aucun backend, sans base de donnees ni API externe. Tout l'etat vit dans le navigateur (`localStorage`) et dans l'URL.

---

## 1. Demarrage Rapide

### Prerequis
- Node.js >= 18
- npm >= 9

### Commandes Principales
```bash
# Installation des dependances
npm install

# Lancement du serveur de developpement local
npm run dev

# Construction statique de production
npm run build

# Previsualisation du build de production localement
npm run preview
```

---

## 2. Architecture du Projet

```text
thanksgiven/
├── netlify.toml            # Configuration de deploiement continu Netlify (command & publish dist)
├── vercel.json             # Configuration de deploiement Vercel
├── public/                 # Assets statiques legers
│   ├── _redirects          # Regle de redirection SPA Netlify
│   └── vite.svg            # Favicon minimaliste
├── src/
│   ├── components/
│   │   ├── canvas/         # Scene 3D WebGL et rendu degrade 2D
│   │   │   ├── CameraController.jsx  # Interpolation fluide de la camera selon l'acte
│   │   │   ├── Candle.jsx            # Bougie intimiste vacillante (Acte 1)
│   │   │   ├── EnvironmentLights.jsx # Eclairage dynamique selon l'heure locale
│   │   │   ├── Experience.jsx        # Canvas Three.js avec brume atmospherique
│   │   │   ├── FallingLeaf.jsx       # Trajectoire de vol parabolique vers l'arbre
│   │   │   ├── Fallback2D.jsx        # Version degradee 2D sans WebGL
│   │   │   ├── FeastTable.jsx        # Banquet d'automne 3D interactif (Acte 3)
│   │   │   ├── MarketElements.jsx    # Offrandes du marche 3D (Acte 2)
│   │   │   └── Tree.jsx              # Arbre low-poly avec ancrage des feuilles
│   │   ├── common/         # Composants partages
│   │   │   ├── ReadOnlyBanner.jsx    # Bandeau d'arbre partage en lecture seule
│   │   │   ├── ScrollIndicator.jsx   # Indicateur de progression du rituel
│   │   │   └── SoundToggle.jsx       # Bouton audio discret en coin
│   │   └── sections/       # Les 5 actes du scrollytelling
│   │       ├── Act1Arrival.jsx       # Acte 1 : Arrivee feutree, bougie & bouton Entrer
│   │       ├── Act2Market.jsx        # Acte 2 : Parallaxe des recoltes d'automne
│   │       ├── Act3Table.jsx         # Acte 3 : Table interactive & histoires des mets
│   │       ├── Act4Gratitude.jsx     # Acte 4 : Formulaire d'offrande & vol de feuille
│   │       └── Act5Tree.jsx          # Acte 5 : Canopee, compte a rebours & export
│   ├── data/
│   │   └── dishesData.js   # Donnees statiques des plats et de leurs recits
│   ├── hooks/
│   │   ├── useDevicePerformance.js   # Detection WebGL et prefers-reduced-motion
│   │   └── useLenisScroll.js         # Integration Lenis + GSAP ScrollTrigger
│   ├── utils/
│   │   ├── cardGenerator.js          # Export PNG 1080x1920 haute resolution
│   │   ├── soundEngine.js            # Synthese audio procedurale (feu et vent)
│   │   └── urlSharing.js             # Encodage/decodage Base64 UTF-8 securise
│   ├── App.jsx             # Orchestration generale et gestion d'etat
│   ├── index.css           # Directives Tailwind v3 et scrollbars
│   └── main.jsx            # Point d'entree React
├── tailwind.config.js      # Palette d'automne (brun, creme, orange brule, ambre)
└── vite.config.js          # Configuration Vite avec decoupage manuel des chunks
```

---

## 3. Personnalisation du Contenu

### Modifier les plats et leurs recits (Acte 3)
Editez le fichier `src/data/dishesData.js`. Chaque plat possede la structure suivante :
```js
{
  id: 'identifiant-unique',
  name: 'Nom du plat',
  origin: 'Sous-titre historique ou symbolique',
  description: 'Histoire culturelle et tradition du mets',
  details: 'Note culinaire ou recette traditionnelle',
}
```

### Modifier les feuilles initiales par defaut
Modifiez le tableau `DEFAULT_GRATITUDES` dans `src/App.jsx`. Ces feuilles sont visibles tant que le visiteur n'a pas enregistre ses propres gratitudes.

### Modifier la date cible du Thanksgiving
Ajustez la constante `TARGET_DATE` dans `src/components/sections/Act5Tree.jsx` (par defaut : `2026-11-26T00:00:00`).

### Modifier la palette graphique d'automne
Les teintes du design system sont configurees dans `tailwind.config.js` :
- `brun` : `#1a0f0a` (fond principal et elements bois)
- `creme` : `#f4ead8` (textes et lin)
- `orange` : `#d9622b` (accent orange brule)
- `ambre` : `#c27827` (reflet dore)

---

## 4. Deploiement Statique Gratuit

Le projet est concu pour un deploiement statique immediat sans aucune configuration complexe :

### Deploiement sur Netlify
- Le fichier `netlify.toml` a la racine du projet configure automatiquement :
  - **Build command** : `npm run build`
  - **Publish directory** : `dist`
  - Redirections SPA automatiques via `public/_redirects`.
- Il suffit de lier votre depot GitHub a Netlify.

### Deploiement sur Vercel
- Le fichier `vercel.json` est deja configure avec la commande de build et le dossier `dist`.
- Importez simplement le depot sur votre tableau de bord Vercel.

---

## 5. Fonctionnalites et Architecture sans Backend

1. **Persistance locale** : Les gratitudes de l'utilisateur sont sauvegardees en continu dans `localStorage` sous la cle `thanksgiving_gratitudes_2026`.
2. **Partage securise par URL (`?g=...`)** :
   - Encodage Base64 UTF-8 compact.
   - Validation stricte, suppression des balises HTML et caracteres de controle.
   - Mode lecture seule automatique pour les invites, preservant le `localStorage` personnel du visiteur.
   - Bouton « Planter mon propre arbre » pour passer en mode creation et restaurer son espace.
3. **Export de carte PNG haute definition** :
   - Generation 100% cote client via HTML5 Canvas 2D.
   - Format standard 1080x1920 (ratio 9:16) optimise pour les stories mobiles.
   - Illustration stylisee de l'arbre, palette d'automne et citations des gratitudes.
4. **Moteur sonore procedural** :
   - Generation en temps reel via Web Audio API (crepitement de feu de cheminee et souffle du vent d'automne).
   - Zéro fichier audio lourd a charger, demarrage propre sur premiere interaction utilisateur.
5. **Accessibilite et mode degrade 2D** :
   - Detection de `prefers-reduced-motion` et des GPU limites.
   - Arriere-plan 2D vectoriel de secours avec bascule manuelle « Mode 3D / Mode 2D ».
   - Navigation clavier complete et contrastes conformes.

---

## 6. Bilan des 8 Etapes du Projet

- [x] **Etape 1** : Setup initial, design tokens, typographies Fraunces et Inter, architecture des 5 actes, Lenis + GSAP ScrollTrigger.
- [x] **Etape 2** : Scene 3D WebGL (Three.js / React Three Fiber), bougie vacillante, arbre low-poly et transitions de camera douces.
- [x] **Etape 3** : Acte 4 avance (formulaire avec limite 80 car, suggestions, palette de couleurs dorees, vol 3D parabolique de la feuille vers l'arbre, synchronisation localStorage).
- [x] **Etape 4** : Partage URL securise base64 (`?g=...`), assainissement anti-XSS, mode lecture seule avec bandeau et bouton « Planter mon propre arbre ».
- [x] **Etape 5** : Generation et export PNG de la carte souvenir haute resolution (1080x1920) 100% cote client.
- [x] **Etape 6** : Actes 2 et 3 enrichis (elements 3D du marche, table du banquet avec decouverte interactive des plats), sonorisation d'ambiance d'automne procedurale.
- [x] **Etape 7** : Version degradee 2D fluide avec detection `prefers-reduced-motion` et bascule manuelle.
- [x] **Etape 8** : Deploiement statique (Netlify & Vercel), documentation complete et revue finale.
