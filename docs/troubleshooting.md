# 🐛 Problèmes Connus et Résolutions

## Erreur : Font Chunk Five introuvable

Si vous voyez une erreur concernant `ChunkFive-Regular.woff2`, vous avez deux options :

1.  Ajouter la police dans `/public/fonts/`
2.  Ou supprimer la référence dans `app/layout.tsx` (les fallbacks Impact/Arial Black seront utilisés)

## Build échoue avec les images

Si le build échoue car des images sont manquantes, ajoutez des placeholders ou commentez temporairement les références dans les fichiers JSON.
