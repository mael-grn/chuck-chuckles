# ChuckNorrisJokes - Interface Web Vanilla JS

## Description

Ce projet fournit une interface web simple et intuitive pour explorer et s'amuser avec des blagues sur Chuck Norris. Il a été développé en utilisant uniquement HTML, CSS, et JavaScript "Vanilla", sans l'utilisation de frameworks ou de bibliothèques externes. Cette initiative a pour but de démontrer l'application pratique des connaissances en JavaScript, AJAX, et JSON pour intégrer et manipuler des données provenant d'une API publique, ici l'API de blagues sur Chuck Norris.

## Objectifs

- Utiliser uniquement HTML, CSS, et JavaScript "Vanilla".
- Pratiquer les appels AJAX pour consommer une API publique.
- Mettre en œuvre la manipulation de JSON pour afficher dynamiquement les données.
- Appliquer les principes de base du design web pour une interface utilisateur agréable.
- Familiariser avec Git et GitHub pour le versionnage et le partage du code.

## Fonctionnalités

- **Recherche de blague :** Le site permettra à l'utilisateur de rechercer des blagues sur chuck norris via l'api chucknorris.io, en retrant une "query string" dans un champs de recherche.

- **Sauvegarde de recherche :** L'utilsateur pourra sauvegarder ses recherches préferées dans le localStrorage grace à un simple bouton.

- **Sauvegarde de blague :** En plus de pouvoir sauvegarder des recherches, l'utilisateur pourra sauvegarder des blagues spécifiques.

- **Tranduction :** Bien que nous sommes francais, les blagues récupérées via l'API sont en anglais. Mais c'etait sans compter sur une seconde API pour les traduires : l'API DeepL.

- **Design responsive :** Le site est accessible et agréable à consulter sur des appareils de différentes tailles, des smartphones aux écrans larges.

## Technologies utilisées

- **HTML :** Structure de base de la page web.
- **CSS :** Mise en forme et style visuel de la page.
- **JavaScript "Vanilla" :** Logique pour les requêtes AJAX, la manipulation du DOM, et l'intégration avec l'API de blagues Chuck Norris.

## Installation et utilisation

Pour utiliser ce projet, suivez ces étapes :

1. Clonez le dépôt sur votre machine locale :

```bash
git clone https://github.com/votreNomUtilisateur/ChuckNorrisJokes.git
```

2. Ouvrez le fichier `index.html` dans votre navigateur web.

Il n'est pas nécessaire d'exécuter un serveur web local pour ce projet, car il ne dépend pas de backend et les requêtes à l'API sont faites directement depuis le navigateur de l'utilisateur.

## Contribuer

Les contributions sont les bienvenues ! Si vous avez des suggestions d'amélioration, des corrections de bugs, ou de nouvelles fonctionnalités, n'hésitez pas à ouvrir une issue ou à proposer une pull request.

## Changements et améliorations futures

### À apporter

- **Internationalisation :** Ajouter la prise en charge de plusieurs langues.
- **Filtrage des blagues :** Permettre aux utilisateurs de filtrer les blagues selon divers critères, tels que la popularité ou les catégories.

### Idées à explorer

- **Sauvegarde des favoris :** Offrir la possibilité de sauvegarder les blagues favorites localement dans le navigateur.
- **Mode sombre :** Implementer un commutateur pour un mode sombre afin d'améliorer le confort visuel en environnement peu lumineux.

## Licence

Ce projet est distribué sous la licence MIT. Pour plus de détails, veuillez consulter le fichier `LICENSE` inclus dans ce dépôt.

---

Amusez-vous bien avec ChuckNorrisJokes et préparez-vous à découvrir les blagues les plus hilarantes sur Chuck Norris en ligne !

Lien vers l'API : [https://api.chucknorris.io/](https://api.chucknorris.io/)