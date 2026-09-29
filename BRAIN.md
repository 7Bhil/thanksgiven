# BRAIN.md - Memoire Vivante du Projet Thanksgiven

## 1. Contexte & Informations Generales
- **Projet** : Thanksgiven (« L'Arbre de Gratitude »)
- **Depot Git distant** : `https://github.com/7Bhil/thanksgiven.git`
- **Branche active** : `developp`
- **Date cible Thanksgiving** : Jeudi 26 novembre 2026
- **Architecture** : Front-end pur, sans backend, export statique pret pour deploiement gratuit

## 2. Stack Technique Validee
- **Moteur & Framework** : Vite + React (JSX)
- **Styles & Design System** : Tailwind CSS v3 (strictement v3) avec tokens d'automne
  - Brun profond : `#1a0f0a`
  - Creme : `#f4ead8`
  - Accent orange brule : `#d9622b`
  - Ambre chaud : `#c27827`
- **Typographies** :
  - Fraunces (titres expressifs serif)
  - Inter (textes sobre sans-serif)
- **Mouvements & Scroll** : Lenis (scroll fluide) synchronise avec GSAP ScrollTrigger
- **3D (etapes suivantes)** : Three.js, `@react-three/fiber`, `@react-three/drei`
- **Sonorisation (etapes suivantes)** : Howler.js

## 3. Directives & Contraintes
- **Zero Emoji** : Aucun emoji dans le code, les commentaires, la documentation, les commits ou les echanges.
- **Commits en Francais** : Convention de commits normalisee en francais (`feat:`, `fix:`, `chore:`, etc.).
- **Workflow Git** : Developpement sur branche `developp`.
- **Dossier Agent** : Le sous-dossier `agent/` reste localement et est ignore par `.gitignore`.
- **Validation pas a pas** : Chaque etape est livree et validee avec l'utilisateur avant d'entamer la suivante.

## 4. Suivi de l'Avancement
- [x] **Etape 1** : Setup initial, design tokens, typographies Fraunces et Inter, architecture des 5 actes, Lenis + GSAP ScrollTrigger, integration initiale validee au build.
- [ ] **Etape 2** : Scene 3D de base (bougie, arbre low-poly, eclairage chaud) et transitions entre actes.
- [ ] **Etape 3** : Acte 4 avance (formulaire, chute de feuilles, persistance).
- [ ] **Etape 4** : Partage URL securise base64 (`?g=...`).
- [ ] **Etape 5** : Export de la carte PNG.
- [ ] **Etape 6** : Marche, table 3D, son d'ambiance Howler, compte a rebours.
- [ ] **Etape 7** : Version degradee 2D et optimisations mobiles/a11y.
- [ ] **Etape 8** : Deploiement statique et revue finale.
