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
  - Bougie vacillante intimiste (Acte 1)
  - Arbre low-poly aux teintes d'automne (amas icosaedriques, branches)
  - Feuilles de gratitude personnalisees avec couleurs d'automne et ancrage sur les branches
  - Composant `FallingLeaf` : vol parabolique en courbe de Bezier avec rotations organiques
  - Eclairage adaptatif selon l'heure locale
  - Transitions de camera douces selon l'acte
- **Partage URL & Securite** :
  - Encodage Base64 compatible URL avec gestion complete des caracteres UTF-8
  - Decodage et assainissement strict anti-XSS
  - Mode lecture seule automatique a la reception de `?g=...`
  - Action « Planter mon propre arbre » restaurant l'etat personnel
- **Export Graphique Haute Resolution** :
  - Generateur de carte souvenir 1080x1920 (format story 9:16) via HTML5 Canvas 2D
  - Fond degrade brun chaud, encadrement dore, arbre stylise et mise en page soignee des gratitudes
  - Export direct en PNG cote client sans appel serveur
- **Sonorisation (etapes suivantes)** : Howler.js

## 3. Directives & Contraintes
- **Zero Emoji** : Aucun emoji dans le code, les commentaires, la documentation, les commits ou les echanges.
- **Commits en Francais** : Convention de commits normalisee en francais (`feat:`, `fix:`, `chore:`, etc.).
- **Workflow Git** : Developpement sur branche `developp` et push regulier vers `origin`.
- **Dossier Agent** : Le sous-dossier `agent/` reste localement et est ignore par `.gitignore`.
- **Validation pas a pas** : Chaque etape est livree et validee avec l'utilisateur avant d'entamer la suivante.

## 4. Suivi de l'Avancement
- [x] **Etape 1** : Setup initial, design tokens, typographies Fraunces et Inter, architecture des 5 actes, Lenis + GSAP ScrollTrigger, integration initiale validee au build.
- [x] **Etape 2** : Scene 3D de base (bougie vacillante, arbre low-poly, eclairage dynamique adapte a l'heure, particules de feuilles) et controleur de camera fluide relie au scroll.
- [x] **Etape 3** : Acte 4 avance (formulaire avec limite 80 car, suggestions, palette de teintes dorees, vol 3D parabolique de la feuille vers l'arbre, synchronisation bidirectionnelle state + localStorage et gestion des feuilles).
- [x] **Etape 4** : Partage URL securise base64 (`?g=...`), assainissement XSS, mode lecture seule avec bandeau dedie et bouton « Planter mon propre arbre ».
- [x] **Etape 5** : Generation et export PNG de la carte souvenir haute resolution (1080x1920) 100% cote client avec gestion de l'etat de chargement.
- [ ] **Etape 6** : Actes 2 et 3 enrichis (marche, table 3D avec plats), ambiance sonore Howler (feu qui crepite, vent leger).
- [ ] **Etape 7** : Version degradee 2D et optimisations mobiles/a11y.
- [ ] **Etape 8** : Deploiement statique et revue finale.
