# Configuration des Secrets et Variables d'Environnement

## 🔐 Secrets GitHub Actions (pour les workflows CI/CD)

Allez dans votre repository GitHub > Settings > Secrets and variables > Actions > New repository secret

### **Secrets nécessaires pour les workflows :**
- `VERCEL_TOKEN` : Token d'API Vercel (généré dans Vercel Dashboard > Settings > Tokens)
- `VERCEL_ORG_ID` : ID de votre organisation Vercel
- `VERCEL_PROJECT_ID` : ID de votre projet Vercel
- `CODECOV_TOKEN` : [déjà configuré]

## 🌐 Variables d'environnement Vercel (pour l'application backend)

Dans le **dashboard Vercel** > votre projet > Settings > Environment Variables

### **Variables pour la base de données AlwaysData :**
- `ALWAYSDATA_HOST` = `mysql-form2app.alwaysdata.net`
- `ALWAYSDATA_USER` = `form2app`
- `ALWAYSDATA_PASSWORD` = [votre mot de passe AlwaysData]
- `ALWAYSDATA_DATABASE` = `form2app_db`

### **Variables pour l'application :**
- `VERCEL_ENV` = `production`
- `PORT` = `8000` (optionnel, Vercel gère automatiquement)

## 🚀 Étapes de configuration

### **1. Configuration Vercel (priorité)**

1. **Créer un compte Vercel** : https://vercel.com
2. **Connecter votre repository GitHub**
3. **Importer le projet** (pointer vers le dossier `/server`)
4. **Ajouter les variables d'environnement** dans Vercel Dashboard
5. **Déployer**

### **2. Configuration GitHub Actions (pour CI/CD)**

1. **Obtenir le token Vercel** : Dashboard > Settings > Tokens
2. **Obtenir les IDs** avec Vercel CLI :
   ```bash
   npm install -g vercel
   vercel login
   cd server
   vercel
   vercel env ls
   ```
3. **Ajouter les secrets** dans GitHub > Settings > Secrets

### **3. Configuration AlwaysData**

1. **Se connecter à phpMyAdmin** AlwaysData
2. **Exécuter le script** `server/alwaysdata_setup.sql`
3. **Vérifier les tables** créées

## 📝 Workflow de déploiement

1. **Push sur GitHub** → déclenche les workflows
2. **Tests et build** → exécutés par GitHub Actions
3. **Déploiement Vercel** → automatique via le workflow `production.yml`
4. **Frontend GitHub Pages** → déployé automatiquement

## 🔗 URLs finales

- **Frontend** : https://nadjide.github.io/form2-app/
- **Backend** : https://form2-app-[hash].vercel.app/
- **API Health Check** : https://form2-app-[hash].vercel.app/health
- **API Users** : https://form2-app-[hash].vercel.app/users

## ⚠️ Important

- Les **variables d'environnement** de l'application (DB, etc.) vont dans **Vercel**
- Les **secrets de déploiement** (tokens, IDs) vont dans **GitHub Actions**
- Une fois déployé sur Vercel, mettez à jour `REACT_APP_SERVER_URL` dans GitHub Actions avec l'URL Vercel finale 