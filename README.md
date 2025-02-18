# Photo Gallery Application

Une application Next.js permettant aux utilisateurs de s'authentifier, visualiser et liker des images provenant de l'API Unsplash.

## 🚀 Fonctionnalités

- ✨ Authentification utilisateur
- 📸 Galerie d'images avec défilement infini
- ❤️ Système de likes
- 🔒 Gestion des sessions avec JWT
- 📱 Design responsive

## 🛠️ Technologies Utilisées

- [Next.js](https://nextjs.org/) - Framework React
- [Level](https://github.com/Level/level) - Base de données
- [Unsplash API](https://unsplash.com/developers) - API d'images
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [JWT](https://jwt.io/) - Gestion des tokens d'authentification

## 📋 Prérequis

- Node.js (version 16 ou supérieure)
- npm ou yarn
- Un compte développeur Unsplash avec une clé API

## ⚙️ Installation

1. Clonez le repository
```bash
git clone https://github.com/mohammeddl/gallery-app.git
cd gallery-app
```

2. Installez les dépendances
```bash
npm install
# ou
yarn install
```

3. Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :
```env
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=votre_clé_api_unsplash
JWT_SECRET=votre_secret_jwt
```

4. Démarrez le serveur de développement
```bash
npm run dev
# ou
yarn dev
```

L'application sera accessible à l'adresse : `http://localhost:3000`

## 🔐 Authentification

L'application dispose de trois comptes de test :

| Utilisateur | Mot de passe | Statut |
|------------|--------------|---------|
| muser1     | mpassword1   | Actif   |
| muser2     | mpassword2   | Actif   |
| muser3     | mpassword3   | Bloqué  |

## 🔄 API Endpoints

### Authentication
- `POST /api/auth`
  - Corps : `{ username: string, password: string }`
  - Retourne : `{ token: string }` ou une erreur

### Likes
- `GET /api/likes/:imageId`
  - Headers : `Authorization: Bearer <token>`
  - Retourne : `{ isLiked: boolean }`

- `POST /api/likes/:imageId`
  - Headers : `Authorization: Bearer <token>`
  - Retourne : `{ success: true }`

- `DELETE /api/likes/:imageId`
  - Headers : `Authorization: Bearer <token>`
  - Retourne : `{ success: true }`

## 📁 Structure du Projet

```
/gallery-app
  /.env.local
  /app
    /api
      /auth
        route.js
      /likes
        /[imageId]
          route.js
    /components
      AuthForm.js
      ImageGrid.js
      LikeButton.js
    /gallery
      page.js
    /login
      page.js
    page.js
  /middleware.js
```

## 🚀 Déploiement

1. Construisez l'application :
```bash
npm run build
# ou
yarn build
```

2. Démarrez en production :
```bash
npm start
# ou
yarn start
```

## 📝 Notes de Développement

- La base de données Level est utilisée pour stocker les likes des utilisateurs
- L'authentification utilise JWT pour la gestion des sessions
- Le défilement infini est implémenté avec l'Intersection Observer API
- Les images sont chargées depuis l'API Unsplash avec pagination

## 🤝 Contribution

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👥 Contact


Lien du projet : [https://github.com/mohammeddl/gallery-app](https://github.com/mohammeddl/gallery-app)