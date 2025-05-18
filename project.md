# Prédicteur de Trafic - Application Web

## Description

Une application web moderne permettant de prédire le trafic routier à Abidjan. L'application utilise des données en temps réel et historiques pour fournir des prédictions précises sur la congestion routière.

## Fonctionnalités principales

### 1. Prédiction de Trafic

- Sélection des points de départ et d'arrivée
- Affichage de plusieurs itinéraires alternatifs
- Calcul du taux de congestion pour chaque itinéraire
- Prise en compte de multiples facteurs :
  - Conditions météorologiques
  - Événements spéciaux (matchs, concerts, manifestations)
  - Présence de chantiers

### 2. Interface Utilisateur

- Design moderne et responsive
- Formulaire intuitif
- Visualisation des itinéraires sur une carte
- Affichage des résultats avec code couleur selon le niveau de congestion

### 3. Authentification

- Système de connexion sécurisé
- Gestion des profils utilisateurs
- Historique des recherches (à venir)

## Architecture Technique

### Frontend

- Next.js 14 (React)
- TypeScript
- Tailwind CSS
- Ant Design (composants UI)
- Framer Motion (animations)
- Leaflet (cartographie)
- Zustand (gestion d'état)

### Backend

- API REST
- OpenRouteService pour le calcul d'itinéraires
- Service de prédiction ML personnalisé

## APIs Externes

- OpenRouteService : Calcul d'itinéraires
- API de prédiction : Modèle ML pour les prédictions de trafic

## Installation

```bash
# Cloner le projet
git clone [url-du-projet]

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local

# Lancer le serveur de développement
npm run dev
```

## Variables d'Environnement

- `ORS_KEY` : Clé API OpenRouteService
- `API_URL` : URL de l'API de prédiction
- `NEXT_PUBLIC_MAPBOX_TOKEN` : Token Mapbox (optionnel)

## Structure du Projet

```
src/
├── app/                 # Pages Next.js
├── components/          # Composants React
├── hooks/              # Hooks personnalisés
├── services/           # Services (API, etc.)
├── stores/             # Stores Zustand
├── utils/              # Utilitaires
└── types/              # Types TypeScript
```

## Contribuer

1. Créer une branche (`git checkout -b feature/nom-feature`)
2. Commit les changements (`git commit -m 'Description'`)
3. Push la branche (`git push origin feature/nom-feature`)
4. Créer une Pull Request

## Licence

MIT

## Équipe

- KODJO TAMEGNON ELISEE HENOC @henoceli3
