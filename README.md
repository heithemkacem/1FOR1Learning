# 1FOR1 Learning 📚

Application mobile d'apprentissage développée avec React Native et Expo.

---

## ✨ Fonctionnalités

### 🔐 Authentification Clerk

L'application utilise **Clerk** comme solution d'authentification complète :

- **Connexion par Email/Téléphone** : Authentification via code de vérification OTP
- **OAuth Social** : Connexion avec Google et Facebook
- **Gestion de session sécurisée** : Tokens stockés via `expo-secure-store`
- **Protection des routes** : Redirection automatique selon l'état d'authentification

---

## 🚀 Instructions d'installation et de lancement

### Prérequis

- Node.js (v18+)
- Yarn ou npm
- Expo CLI
- Android Studio (pour émulateur Android) ou Xcode (pour simulateur iOS)

### Installation

1. **Cloner le projet**
   ```bash
   git clone <repository-url>
   cd 1FOR1Learning
   ```

2. **Installer les dépendances**
   ```bash
   yarn install
   # ou
   npm install
   ```

3. **Configuration des variables d'environnement**
   
   Créer un fichier `.env` à la racine du projet :
   ```env
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_key
   ```

4. **Lancer l'application**
   ```bash
   # Mode développement
   npm start
   
   # Android
   npm android
   
   # iOS
   npm ios
   
   # Web
   npm web
   ```

### Build de production (EAS)

```bash
# Build Android
eas build --platform android --profile development

# Build iOS
eas build --platform ios --profile development
```

---

## 🛠 Technologies utilisées

| Catégorie | Technologies |
|-----------|--------------|
| **Framework** | React Native 0.81.5, Expo SDK 54 |
| **Langage** | TypeScript 5.9 |
| **Routing** | Expo Router (file-based routing) |
| **Authentification** | Clerk (`@clerk/clerk-expo`) |
| **State Management** | TanStack React Query |
| **Navigation** | React Navigation v7 |
| **Animations** | React Native Reanimated 4.1 |
| **UI/Styling** | React Native SVG, Expo Linear Gradient |
| **Stockage sécurisé** | Expo Secure Store |
| **Linting** | ESLint avec config Expo |

---

## 📁 Architecture du projet

```
1FOR1Learning/
├── app/                          # Routes (file-based routing)
│   ├── _layout.tsx               # Layout principal + providers
│   ├── index.tsx                 # Splash screen
│   ├── login.tsx                 # Écran de connexion
│   ├── loading.tsx               # Écran de chargement post-auth
│   ├── discover.tsx              # Page découverte
│   └── oauth-native-callback.tsx # Callback OAuth
│
├── src/
│   ├── assets/                   # Ressources statiques
│   │   ├── fonts/                # Polices Inter
│   │   └── images/               # Images, logos, icônes
│   │
│   ├── components/               # Composants React
│   │   ├── screens/              # Composants par écran
│   │   │   ├── login-screen/     # Composants login
│   │   │   ├── loading-screen/   # Composants loading
│   │   │   └── splach_screen/    # Composants splash
│   │   └── ui/                   # Composants UI réutilisables
│   │       ├── brand-button.tsx
│   │       ├── brand-input.tsx
│   │       ├── progress-ring.tsx
│   │       └── snackbar.tsx
│   │
│   ├── constants/                # Constantes (thème, couleurs)
│   │   └── theme.ts
│   │
│   └── hooks/                    # Custom hooks
│       ├── useClerkAuth.ts       # Hook authentification Clerk
│       ├── use-theme.ts          # Gestion du thème
│       └── use-color-scheme.ts   # Détection mode sombre
│
├── app.json                      # Configuration Expo
├── eas.json                      # Configuration EAS Build
├── tsconfig.json                 # Configuration TypeScript
└── package.json                  # Dépendances
```

### Flux d'authentification

```
index.tsx (Splash) → login.tsx → [Clerk Auth] → loading.tsx → discover.tsx
                          ↓
              oauth-native-callback.tsx (OAuth redirect)
```

---

## ⚠️ Difficultés rencontrées et solutions apportées

### 1. Configuration OAuth avec Clerk

**Problème** : Les redirections OAuth (Google/Facebook) ne fonctionnaient pas correctement sur mobile natif.

**Solution** : 
- Utilisation de `makeRedirectUri` d'Expo Auth Session avec un scheme personnalisé
- Configuration du callback `oauth-native-callback.tsx` pour gérer le retour OAuth
- Whitelist des URLs de redirection dans le dashboard Clerk

### 2. Gestion des tokens sécurisés

**Problème** : Persistance des sessions utilisateur entre les redémarrages de l'app.

**Solution** : Implémentation d'un `tokenCache` personnalisé utilisant `expo-secure-store` pour stocker les tokens de manière sécurisée.

### 3. Animations fluides

**Problème** : Performance des animations sur les appareils bas de gamme.

**Solution** : Utilisation de `react-native-reanimated` avec des animations sur le thread UI natif.

### 4. Gestion des états de vérification

**Problème** : Complexité du flow OTP (email_code/phone_code) avec différentes stratégies.

**Solution** : Hook `useClerkAuth` centralisé gérant tous les états et transitions de l'authentification.

---

## ⏱ Temps passé sur le projet

| Phase | Durée estimée |
|-------|---------------|
| Configuration initiale (Expo, TypeScript) | 1h |
| Intégration Clerk + OAuth | 1h |
| UI/UX (écrans, composants) | 3h |
| Gestion des thèmes (dark/light) | 1h |
| Documentation | 30min |
| **Total** | **~6h:30** |

---

## 📚 Ressources

- [Documentation Expo](https://docs.expo.dev/)
- [Documentation Clerk](https://clerk.com/docs)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)

---

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push sur la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request
