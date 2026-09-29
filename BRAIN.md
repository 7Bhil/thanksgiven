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
- **Scene 3D** : Three.js, `@react-three/fiber`, `@react-three/drei`
  - Bougie avec flamme tremblante et source ponctuelle animee
  - Arbre low-poly aux teintes d'automne (amas icosaedriques, ecorce chaude)
  - Particules instanciees de feuilles tourbillonnantes au vent
  - Eclairage adaptatif a l'heure locale (jour dore / soiree bougie)
  - Transitions de camera par interpolation douce (lerp) selon l'acte actif
- **Sonorisation (etapes suivantes)** : Howler.js

## 3. Directives & Contraintes
- **Zero Emoji** : Aucun emoji dans le code, les commentaires, la documentation, les commits ou les echanges.
- **Commits en Francais** : Convention de commits normalisee en francais (`feat:`, `fix:`, `chore:`, etc.).
- **Workflow Git** : Developpement sur branche `developp`.
- **Dossier Agent** : Le sous-dossier `agent/` reste localement et est ignore par `.gitignore`.
- **Validation pas a pas** : Chaque etape est livree et validee avec l'utilisateur avant d'entamer la suivante.

## 4. Suivi de l'Avancement
- [x] **Etape 1** : Setup initial, design tokens, typographies Fraunces et Inter, architecture des 5 actes, Lenis + GSAP ScrollTrigger, integration initiale validee au build.
- [x] **Etape 2** : Scene 3D de base (bougie vacillante, arbre low-poly, eclairage dynamique adapte a l'heure, particules de feuilles) et controleur de camera fluide relie au scroll.
- [ ] **Etape 3** : Acte 4 avance (formulaire de gratitude, animation de chute des feuilles, liaison state + localStorage).
- [ ] **Etape 4** : Partage URL securise base64 (`?g=...`) et mode lecture seule.
- [ ] **Etape 5** : Export de la carte PNG (format 1080x1920 pour stories).
- [ ] **Etape 6** : Actes 2 et 3 enrichis, ambiance sonore Howler (feu qui crepite, vent leger).
- [ ] **Etape 7** : Version degradee 2D et optimisations mobiles/a11y.
- [ ] **Etape 8** : Deploiement statique et revue finale.
