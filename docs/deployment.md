# 🚢 Déploiement

Ce guide explique comment préparer et déployer l'application pour la production.

## 📦 Build de Production

Pour créer une version optimisée pour la production :

```bash
npm run build
```

Cela va :

1.  Générer les pages statiques.
2.  Compiler le TypeScript.
3.  Optimiser les assets.
4.  Créer le dossier `.next`.

## 🚀 Lancer en Production (Localement)

Pour tester le build de production localement :

```bash
npm run start
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000).

## 🐳 Déploiement avec Docker

Le projet inclut un `Dockerfile` pour conteneuriser l'application Next.js elle-même.

### 1. Build de l'image

```bash
docker build -t bde-site .
```

### 2. Lancer avec Docker Compose

Le fichier `docker-compose.yml` inclut déjà le service `app` pour lancer l'application avec la base de données et MinIO.

```bash
docker-compose up -d
```

> [!WARNING]
> En production, assurez-vous de changer les mots de passe par défaut et les clés secrètes dans le fichier `.env` ou les variables d'environnement du conteneur.

## ☁️ Hébergement (Vercel, Netlify, etc.)

Le projet est compatible avec les plateformes comme Vercel ou Netlify.

1.  Connectez votre dépôt Git.
2.  Configurez les variables d'environnement (voir `.env.example`).
3.  Commandes de build :
    - Build command : `npm run build`
    - Output directory : `.next`
    - Install command : `npm install`

> [!IMPORTANT]
> Pour un déploiement sur Vercel/Netlify, vous aurez besoin d'une base de données PostgreSQL hébergée (ex: Supabase, Neon, AWS RDS) et d'un stockage S3 (ex: AWS S3, Cloudflare R2), car le `docker-compose.yml` ne tourne pas sur ces plateformes "Serverless".
