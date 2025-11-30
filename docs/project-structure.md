# 📁 Structure du Projet

Voici l'organisation des dossiers et fichiers du projet :

```
BDESIte/
├── app/                          # Pages Next.js (App Router)
│   ├── page.tsx                  # Page d'accueil
│   ├── bde/                      # Page Le BDE
│   ├── partenaires/              # Page Partenaires
│   ├── evenements/               # Page Événements
│   │   └── [slug]/               # Détail d'un événement
│   ├── carte-bde/                # Page Carte BDE
│   ├── contact/                  # Page Contact
│   ├── mentions-legales/         # Mentions légales
│   ├── politique-confidentialite/# Politique de confidentialité
│   ├── layout.tsx                # Layout racine
│   └── globals.css               # Styles globaux
├── components/                   # Composants React réutilisables
│   ├── Header.tsx                # En-tête du site
│   ├── Footer.tsx                # Pied de page
│   ├── Hero.tsx                  # Bannière principale
│   ├── Button.tsx                # Bouton
│   ├── Badge.tsx                 # Badge
│   ├── Container.tsx             # Conteneur
│   ├── Section.tsx               # Section de page
│   ├── PartnerCard.tsx           # Carte partenaire
│   ├── EventCard.tsx             # Carte événement
│   ├── TeamCard.tsx              # Carte membre d'équipe
│   ├── Filters.tsx               # Composant de filtres
│   └── EmptyState.tsx            # État vide
├── lib/                          # Bibliothèques et utilitaires
│   ├── data.ts                   # Fonctions de chargement des données
│   ├── schemas.ts                # Schémas Zod pour validation
│   ├── utils.ts                  # Fonctions utilitaires
│   └── seo.ts                    # Configuration SEO
├── data/                         # Données JSON (IMPORTANT !)
│   ├── partners.json             # Liste des partenaires
│   ├── events.json               # Liste des événements
│   ├── team.json                 # Membres de l'équipe
│   └── settings.json             # Paramètres généraux
├── public/                       # Fichiers statiques
│   ├── fonts/                    # Polices personnalisées
│   └── images/                   # Images (logos, visuels)
│       ├── partners/             # Logos des partenaires
│       ├── events/               # Visuels des événements
│       └── team/                 # Photos de l'équipe
└── README.md                     # Documentation racine
```
