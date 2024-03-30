# GlobeTrotter Insights 🌍✈️

GlobeTrotter Insights est une application web fournissant des informations sur les pays du monde, s'appuyant sur les API REST Countries et Open Router IA GPT 3.5. Elle offre des données culturelles, historiques et géographiques, parfaites pour les voyageurs et les curieux.

## Fonctionnalités de l'API et du site web :

### Page d'Accueil et Recherche de Pays

#### Fonctionnalité de recherche :
- Implémente une possibilité de filtrer les pays recherchés en sélectionnant la première lettre. Cette liste de pays est issue de l'API REST Countries pour proposer une liste de pays basée sur la sélection de l'utilisateur. 
- Sélection de la langue : Offre la possibilité de sélectionner l'une des trois langues (Anglais, Français, Espagnol) **après la sélection d'un pays** afin d'afficher les informations traduite pour un pays. Les informations sont stockées dans différentes langues et l'affichage change en fonction de la sélection de l'utilisateur.

### Page des Détails du Pays

#### Affichage des informations :
- Une fois un pays sélectionné, affiche une page de détails incluant :
    - Le nom et le drapeau du pays (REST COUNTRIES API)
    - Une brève description (générée par GPT 3.5)
    - Des informations diversies : le nom officiel, la capitale, la population, la devise, la place du conducteur, le continent, l'indice de Gini (2018), la surface etc.
    - Une carte montrant l'emplacement géographique du pays.
- Cette page sert de point central pour accéder à des informations plus détaillées et spécifiques sur le pays.

### Intégration avec l'API OpenRouter IA GPT 3.5 pour Conseils de Voyage et Itinéraires

- Conseils aux voyageurs : permet de fournir des conseils aux voyageurs concernant le pays sélectionné. Cela peut inclure des informations sur la sécurité, les exigences de visa, les vaccins, etc.
- Générateur d'itinéraire : Offre une fonctionnalité où l'utilisateur peut sélectionner une durée de voyage (entre 2 et 14 jours) et générer un itinéraire proposé incluant des activités, des lieux à visiter, etc.

## Configuration et Exécution

1. **Clés d'API** :
    - Pour exécuter l'application, vous aurez besoin d'une d'API pour l'API OpenRouter IA.
    - Rendez-vous sur [OpenRouter IA](https://openrouter.ai/models/openai/gpt-3.5-turbo-0301) pour obtenir une clé d'API.
    - Pour l'API REST Countries, consultez [REST Countries API](https://restcountries.com/v3.1).

2. **Configuration** :
    - Une fois que vous avez obtenu votre clés d'API, allez dans le fichier de configuration nommé `.env` à la racine du projet.
    - Voici un exemple de structure de `.env` :
        ```
        APIKEY_OPENROUTER= XXXXXXXX
        ```

3. **Exécution** :
    - Assurez-vous d'avoir Node.js installé sur votre système.
    - Clonez ce dépôt et accédez au répertoire du projet.
    - Exécutez `npm install` pour installer les dépendances.
    - Lancez l'application avec `npm start`.
  OU
    - Directement sur codespaces, il faut écrire la commande :
        ```
        npm run dev
        ```

## Remarques
Assurez-vous d'avoir une connexion Internet active lors de l'utilisation de l'application, car elle dépend des API externes pour récupérer les données. De plus, la clé d'API GPT peut ne plus contenir de crédit, si une erreur anormale apparait, il faut donc changer la clé. 

# API Utilisées 
- https://openrouter.ai/models/openai/gpt-3.5-turbo-0301
- https://restcountries.com/v3.1

