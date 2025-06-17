# 🐳 Guide Docker pour Form2 App

## Vue d'ensemble

Ce projet utilise Docker et Docker Compose pour :
- Conteneuriser l'application React
- Gérer l'API FastAPI backend
- Orchestrer les services en développement et production

## Structure Docker

```
form2-app/
├── Dockerfile                  # React application (conforme ci-cd-ynov)
├── docker-compose.yml         # Orchestration React + Server
├── .dockerignore              # Exclusions Docker
└── server/
    ├── Dockerfile             # API FastAPI
    └── requirements.txt       # Dépendances Python
```

## 🚀 Démarrage rapide

### Développement
```bash
# Construire et démarrer tous les services
docker compose up --build

# En arrière-plan
docker compose up -d

# Arrêter les services
docker compose down
```

### Production
```bash
# Build image React
docker build -t form2-app .

# Lancer l'application
docker run -p 3000:3000 form2-app
```

## 🔧 Services

### Frontend (React)
- **Port**: 3000
- **URL**: http://localhost:3000
- **Hot reload**: Activé

### Backend (FastAPI)
- **Port**: 8000
- **URL**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## 📝 Scripts utiles

```bash
# Voir les logs
docker compose logs -f

# Reconstruire une image
docker compose build react

# Entrer dans un conteneur
docker compose exec react sh

# Supprimer tout
docker compose down -v --rmi all
```

## 🔄 CI/CD avec GitHub Actions

Le workflow automatise :
1. ✅ Tests unitaires
2. 🐳 Build Docker images
3. 🧪 Tests E2E avec Cypress
4. 📦 Push vers Docker Hub
5. 🚀 Déploiement automatique

## Variables d'environnement

```env
REACT_APP_SERVER_URL=http://localhost:8000
DOCKER_USERNAME=votre-username
DOCKERHUB_TOKEN=votre-token
```

## 🛠️ Troubleshooting

### Problèmes courants

1. **Port déjà utilisé**
   ```bash
   docker compose down
   lsof -ti:3000 | xargs kill -9
   ```

2. **Cache npm**
   ```bash
   docker compose build --no-cache
   ```

3. **Volumes persistants**
   ```bash
   docker compose down -v
   ```

## 📋 Prérequis

- Docker Desktop installé
- Node.js 20+ (pour développement local)
- Python 3.11+ (pour développement local)

## 🎯 Optimisations

- **Docker Compose** pour l'orchestration
- **Volumes** pour le hot-reload en développement
- **Variables d'environnement** pour la configuration
- **Cache layers** pour accélérer les builds 