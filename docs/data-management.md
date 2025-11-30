# 📝 Gestion des Données

Toutes les données du site sont stockées dans des fichiers JSON dans le dossier `/data`. Aucune base de données n'est nécessaire pour le contenu statique !

## Ajouter un partenaire

Éditer `/data/partners.json` :

```json
{
  "id": "identifiant-unique",
  "name": "Nom du partenaire",
  "category": "bar",
  "city": "Rennes",
  "logo": "/images/partners/logo.png",
  "advantages": ["-10% sur l'addition", "Happy hour prolongé"],
  "conditions": "Valable avec la carte BDE",
  "website": "https://example.com",
  "address": "12 Rue Exemple, 35000 Rennes",
  "active": true
}
```

**Catégories disponibles :** `bar`, `restaurant`, `sport`, `culture`, `services`, `shopping`, `autre`

## Ajouter un événement

Éditer `/data/events.json` :

```json
{
  "slug": "mon-evenement-2025",
  "title": "Mon Événement",
  "date": "2025-12-31T20:00:00+01:00",
  "place": "Lieu de l'événement",
  "cover": "/images/events/mon-evenement.jpg",
  "tags": ["soirée", "campus"],
  "description": "Description détaillée de l'événement...",
  "ticketUrl": "https://billetterie.example.com",
  "published": true
}
```

**Important :** Le format de date doit être ISO 8601 avec timezone (ex: `2025-12-31T20:00:00+01:00`)

## Ajouter un membre de l'équipe

Éditer `/data/team.json` :

```json
{
  "name": "Prénom NOM",
  "role": "Poste",
  "photo": "/images/team/prenom.jpg",
  "links": {
    "instagram": "https://instagram.com/username",
    "linkedin": "https://linkedin.com/in/username",
    "email": "prenom.nom@example.com"
  }
}
```

## Modifier les paramètres généraux

Éditer `/data/settings.json` :

```json
{
  "association": "BDE Sup'RNova",
  "year": "2025-2026",
  "email": "bureau@suprennes.me",
  "shopUrl": "https://boutique.suprennes.me",
  "instagram": "https://instagram.com/...",
  "discord": "https://discord.gg/...",
  "facebook": "https://facebook.com/...",
  "linkedin": "https://linkedin.com/company/..."
}
```
