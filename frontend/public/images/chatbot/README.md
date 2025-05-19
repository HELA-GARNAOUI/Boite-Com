# Images pour le Chatbot DigiFlow

Ce dossier doit contenir les images suivantes pour le chatbot :

1. `welcome.png` - Image de bienvenue (dimensions recommandées : 800x400px)
2. `services.png` - Image représentant les services (dimensions recommandées : 800x400px)
3. `pricing.png` - Image pour les tarifs (dimensions recommandées : 800x400px)
4. `seo.png` - Image pour le SEO (dimensions recommandées : 800x400px)
5. `portfolio.png` - Image pour le portfolio (dimensions recommandées : 800x400px)

## Recommandations pour les images

- Format : PNG ou JPG
- Taille maximale : 1MB par image
- Résolution : 72 DPI minimum
- Style : Professionnel, moderne, cohérent avec l'identité visuelle de DigiFlow

## Comment ajouter les images

1. Préparez vos images selon les recommandations ci-dessus
2. Nommez-les exactement comme indiqué dans la liste
3. Placez-les dans ce dossier
4. Vérifiez que les permissions des fichiers sont correctes

## Utilisation dans le code

Les images sont utilisées dans le composant `ChatMessage` :

```tsx
<ChatMessage
  message="Votre message"
  isUser={false}
  image="welcome.png"
/>
```

## Vérification

Pour vérifier que les images sont correctement configurées :
1. Assurez-vous que toutes les images sont présentes dans ce dossier
2. Vérifiez que les noms des fichiers correspondent exactement à ceux mentionnés
3. Testez le chatbot dans l'interface utilisateur 