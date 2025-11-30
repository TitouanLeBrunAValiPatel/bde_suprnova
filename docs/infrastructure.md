# 🏗️ Infrastructure Locale

Le projet utilise Docker Compose pour gérer les services externes nécessaires au développement.

## Services

### 🐘 PostgreSQL (Base de données)

- **Service** : `db`
- **Image** : `postgres:15-alpine`
- **Port interne** : 5432
- **Port exposé (hôte)** : **5433** (Attention à ce détail !)
- **Credentials par défaut** :
  - User : `postgres`
  - Password : `postgres`
  - DB : `bde_db`

> [!NOTE]
> Les données sont persistées dans le volume Docker `postgres_data`.

### 🪣 MinIO (Stockage Objet S3-compatible)

MinIO est utilisé pour stocker les images et fichiers uploadés, simulant un bucket AWS S3.

- **Service** : `minio`
- **Image** : `minio/minio:latest`
- **Port API** : 9000
- **Port Console** : 9001
- **Credentials par défaut** :
  - User : `minioadmin`
  - Password : `minioadmin`

#### Accéder à la console MinIO

Vous pouvez accéder à l'interface d'administration de MinIO pour voir les fichiers uploadés :

- **URL** : [http://localhost:9001](http://localhost:9001)
- **Login** : `minioadmin`
- **Password** : `minioadmin`

## 🛠️ Commandes Docker utiles

**Démarrer les services en arrière-plan :**

```bash
docker-compose up -d
```

**Arrêter les services :**

```bash
docker-compose down
```

**Voir les logs :**

```bash
docker-compose logs -f
```

**Réinitialiser les volumes (Attention : perte de données !) :**

```bash
docker-compose down -v
```
