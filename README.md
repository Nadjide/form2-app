# Form2-App - Application de Gestion d'Utilisateurs

## Objectifs du Projet

Ce projet vise à créer une application web complète avec une architecture Docker moderne, incluant un formulaire d'inscription, une gestion d'utilisateurs et un système d'administration.

### Architecture Technique

- **Frontend**: React.js avec formulaire d'inscription
- **Backend**: API Python (FastAPI/Flask)
- **Base de données**: MySQL avec Adminer pour la gestion
- **Containerisation**: Docker Compose pour l'orchestration
- **Tests**: Tests unitaires, d'intégration et end-to-end avec Cypress
- **CI/CD**: GitHub Actions avec déploiement automatique

## Fonctionnalités

### Application React
- Formulaire d'inscription avec sauvegarde en base de données (remplace le localStorage)
- Affichage de la liste des utilisateurs (informations réduites)
- Système d'authentification administrateur
- Gestion des utilisateurs (suppression, consultation des informations privées)

### Compte Administrateur
L'administrateur est créé automatiquement lors de l'initialisation de la base de données :
- **Email**: loise.fenoll@ynov.com
- **Mot de passe**: PvdrTAzTeR247sDnAZBr

## Architecture Docker

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   React     │    │   Python    │    │   MySQL     │    │  Adminer    │
│  Frontend   │◄──►│   Backend   │◄──►│  Database   │◄──►│   Admin     │
│             │    │             │    │             │    │             │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

## Pipeline GitHub Actions

### Tests
1. **Tests unitaires** avec rapport de couverture sur Codecov
2. **Tests d'intégration** 
3. **Tests end-to-end** avec Cypress dans l'environnement Docker

### Déploiement
- **Frontend**: GitHub Pages
- **Backend**: Vercel
- **Base de données**: Aiven ou AlwaysData (production)

## Critères d'Évaluation

| Critère | Points |
|---------|--------|
| Architecture Docker fonctionnelle (MySQL/Python/Adminer/React) | 6 pts |
| Tests unitaires et d'intégration avec rapport de couverture sur Codecov | 6 pts |
| Tests end-to-end avec Cypress | 6 pts |
| Pipeline GitHub Actions (tests + déploiement) avec DB en production | 2 pts |
| **Total** | **20 pts** |

## Installation et Développement

### Prérequis
- Docker et Docker Compose
- Node.js (pour le développement local)
- Python 3.8+

### Démarrage Rapide

```bash
# Cloner le repository
git clone <repository-url>
cd form2-app

# Démarrer l'architecture Docker
docker-compose up -d

# Accéder à l'application
# Frontend: http://localhost:3000
# Adminer: http://localhost:8080
# API Backend: http://localhost:8000
```

### Variables d'Environnement

Créez un fichier `.env` à la racine du projet :

```env
# Base de données
DB_HOST=mysql
DB_PORT=3306
DB_NAME=form2app
DB_USER=root
DB_PASSWORD=your_password

# Admin credentials
ADMIN_EMAIL=loise.fenoll@ynov.com
ADMIN_PASSWORD=PvdrTAzTeR247sDnAZBr

# Production database (Aiven/AlwaysData)
PROD_DB_URL=your_production_database_url
```

## Scripts Disponibles

### Développement
```bash
npm start          # Démarre l'app React en mode développement
npm test           # Lance les tests unitaires
npm run build      # Build de production
```

### Docker
```bash
docker-compose up -d    # Démarre tous les services
docker-compose down     # Arrête tous les services
docker-compose logs     # Affiche les logs
```

### Tests
```bash
npm run test:unit      # Tests unitaires
npm run test:integration # Tests d'intégration
npm run test:e2e       # Tests end-to-end avec Cypress
```

## Structure du Projet

```
form2-app/
├── frontend/          # Application React
├── backend/           # API Python
├── database/          # Scripts de base de données
├── docker/            # Configuration Docker
├── tests/             # Tests unitaires et d'intégration
├── cypress/           # Tests end-to-end
├── .github/           # GitHub Actions
└── docs/              # Documentation
```

## Déploiement

### Production
- **Frontend**: Automatiquement déployé sur GitHub Pages via GitHub Actions
- **Backend**: Automatiquement déployé sur Vercel via GitHub Actions
- **Base de données**: MySQL sur Aiven ou AlwaysData

### Environnement de Test
- Tests automatisés dans l'environnement Docker
- Validation de l'architecture complète
- Tests de performance et de sécurité

## Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## Support

Pour toute question ou problème, veuillez ouvrir une issue sur GitHub. 