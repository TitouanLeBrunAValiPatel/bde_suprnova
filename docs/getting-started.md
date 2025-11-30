# 🚀 Getting Started

Bienvenue sur la documentation développeur du site BDE Sup'RNova. Ce guide vous aidera à installer et lancer le projet localement.

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (v18 ou v20 recommandés)
- **npm** (ou pnpm/yarn)
- **Docker Desktop** (recommandé pour la base de données et MinIO)
- **Git**

## 🛠️ Installation

1.  **Cloner le dépôt** :

    ```bash
    git clone <url-du-repo>
    cd BDESIte
    ```

2.  **Installer les dépendances** :
    ```bash
    npm install
    # ou pnpm install / yarn install
    ```

## ⚙️ Configuration de l'environnement

1.  **Copier le fichier d'exemple** :

    ```bash
    cp .env.example .env
    ```

2.  **Configurer les variables** :
    Ouvrez le fichier `.env` et ajustez les valeurs si nécessaire.

    > [!IMPORTANT]
    > Si vous utilisez Docker via `docker-compose`, le port de la base de données exposé est **5433** (pour éviter les conflits avec un Postgres local sur 5432).
    > Assurez-vous que votre `DATABASE_URL` dans `.env` pointe bien vers le bon port si vous vous connectez depuis l'hôte (votre machine), ou 5432 si c'est inter-conteneurs (mais Next.js tourne souvent sur l'hôte en dev).
    >
    > **Configuration recommandée pour Docker (depuis l'hôte) :**
    > `DATABASE_URL="postgresql://postgres:postgres@localhost:5433/bde_db?schema=public"`

## 🏗️ Lancer l'infrastructure (Docker)

Pour lancer la base de données PostgreSQL et le stockage MinIO :

```bash
docker-compose up -d db minio
```

Vérifiez que les conteneurs tournent :

```bash
docker ps
```

## 🗄️ Initialisation de la Base de Données

Une fois la base de données lancée :

1.  **Pousser le schéma Prisma** :

    ```bash
    npx prisma migrate dev
    ```

2.  **Seeder la base de données** (données de test) :
    ```bash
    npm run seed
    ```

## 🚀 Lancer le projet

Lancez le serveur de développement Next.js :

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📝 Scripts utiles

- `npm run lint` : Vérifier le code (ESLint).
- `npm run format` : Formater le code (Prettier).
- `npm run seed:admin` : Créer un utilisateur admin.
