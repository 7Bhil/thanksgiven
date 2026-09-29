# L'Arbre de Gratitude &bull; Thanksgiving 2026

Experience web immersive de Thanksgiving en front-end pur (Vite + React + Tailwind CSS v3).

## 1. Demarrage Rapide

### Prerequis
- Node.js >= 18
- npm >= 9

### Installation et Lancement
```bash
# Installation des dependances
npm install

# Lancement du serveur de developpement local
npm run dev

# Construction statique pour production
npm run build

# Previsualisation du build de production
npm run preview
```

---

## 2. Architecture du Projet

```text
thanksgiven/
├── public/                 # Assets statiques legers et icones
├── src/
│   ├── components/
│   │   ├── common/         # Composants partages (son, indicateurs de scroll)
│   │   └── sections/       # Les 5 actes du scrollytelling
│   │       ├── Act1Arrival.jsx     # Acte 1 : Arrivee feutree & bougie
│   │       ├── Act2Market.jsx      # Acte 2 : Parallaxe du marche d'automne
│   │       ├── Act3Table.jsx       # Acte 3 : Table interactive & recits
│   │       ├── Act4Gratitude.jsx   # Acte 4 : Formulaire de feuille & offrande
│   │       └── Act5Tree.jsx        # Acte 5 : Canopee, compte a rebours & partage
│   ├── data/
│   │   └── dishesData.js   # Donnees JSON statiques des plats et de leurs histoires
│   ├── hooks/
│   │   └── useLenisScroll.js # Integration fluide Lenis + GSAP ScrollTrigger
│   ├── App.jsx             # Orchestration globale du parcours et persistance
│   ├── index.css           # Directives Tailwind v3 et tokens de scroll
│   └── main.jsx            # Point d'entree React
├── tailwind.config.js      # Palette d'automne (brun, creme, orange brule) et polices
└── vite.config.js          # Configuration Vite
```

---

## 3. Personnalisation des Textes et des Plats

- **Modifier les plats et leurs recits** : Editez le fichier `src/data/dishesData.js`. Chaque plat comprend un identifiant, un nom, une origine, une description et une note culinaire.
- **Modifier les feuilles initiales par defaut** : Ajustez la constante `DEFAULT_GRATITUDES` dans `src/App.jsx`.
- **Modifier la date cible du compte a rebours** : Ajustez la constante `TARGET_DATE` dans `src/components/sections/Act5Tree.jsx` (par defaut : 26 novembre 2026).
- **Modifier la palette de couleurs** : Adaptez les valeurs hexadecimales dans `tailwind.config.js`.

---

## 4. Feuille de Route par Etapes

- [x] **Etape 1** : Setup du projet (Vite + React), tokens de design (brun `#1a0f0a`, creme `#f4ead8`, orange brule `#d9622b`), typographies (Fraunces & Inter), structure des 5 actes, integration Lenis + GSAP ScrollTrigger.
- [ ] **Etape 2** : Scene 3D Three.js / React Three Fiber (bougie, arbre low-poly, eclairage chaud adaptatif) et transitions de camera liees au scroll.
- [ ] **Etape 3** : Acte 4 avance (formulaire de gratitude, animation de chute de feuille 3D, persistance localStorage).
- [ ] **Etape 4** : Partage par URL securise (`?g=base64...`) et mode lecture seule pour les invites.
- [ ] **Etape 5** : Generation et export de carte PNG (canvas haute definition pour stories).
- [ ] **Etape 6** : Actes 2 et 3 enrichis, ambiance sonore Howler.js (feu qui crepite, vent leger).
- [ ] **Etape 7** : Version degradee 2D animée (appareils faibles / `prefers-reduced-motion`) et optimisations de performance Lighthouse.
- [ ] **Etape 8** : Deploiement statique et verification finale.
