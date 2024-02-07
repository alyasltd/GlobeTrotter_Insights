# Home Page and Country Search

## Search Functionality:
- **Implement a search bar** that interacts with the REST Countries API to suggest a list of countries based on the user's input. If possible, display about ten matching countries in real-time for the user to choose from.
- **Language selection**: Offer the option to select one of three languages (English, French, Spanish) to display the information. This could be achieved by storing information in different languages and changing the display based on the user's selection.

## Country Details Page

**Information display**: Once a country is selected, display a details page that includes:
    The country's flag and a brief description.
    A map showing the geographical location of the country.
    The FIFA abbreviation, the official and common name, population, capital, and currency.
This page will serve as a central point to access more detailed and specific information about the country.

## Integration with OpenRouteService API (or similar) for Travel Advice and Itineraries

- **Travel advice**: Use an API or governmental data to provide travel advice regarding the selected country. This can include information on safety, visa requirements, vaccinations, etc.
- **Itinerary generator**: Offer a feature where the user can select a travel duration (between 2 and 14 days) and generate a proposed itinerary including activities, places to visit, etc.

-----------------------------------------------------------------------------------
# Page d'Accueil et Recherche de Pays

## Fonctionnalité de recherche : 
- **Implémente une barre de recherche** qui interagit avec l'API REST Countries pour proposer une liste de pays basée sur la saisie de l'utilisateur. Si possible, affiche une dizaine de pays correspondants en temps réel pour que l'utilisateur puisse choisir.
- **Sélection de la langue** : Offre la possibilité de sélectionner l'une des trois langues (Anglais, Français, Espagnol) pour afficher les informations. Cela pourrait être réalisé en stockant les informations dans différentes langues et en changeant l'affichage en fonction de la sélection de l'utilisateur.

## Page des Détails du Pays

**Affichage des informations** : Une fois un pays sélectionné, affiche une page de détails qui inclut :
    Le drapeau du pays et une brève description.
    Une carte montrant l'emplacement géographique du pays.
    L'abréviation FIFA, le nom officiel et commun, la population, la capitale, et la devise.
Cette page servira de point central pour accéder à des informations plus détaillées et spécifiques sur le pays.

## Intégration avec API OpenRouter IA (ou similaire) pour Conseils de Voyage et Itinéraires

- **Conseils aux voyageurs** : Utilise une API ou des données gouvernementales pour fournir des conseils aux voyageurs concernant le pays sélectionné. Cela peut inclure des informations sur la sécurité, les exigences de visa, les vaccins, etc.
- **Générateur d'itinéraire** : Offre une fonctionnalité où l'utilisateur peut sélectionner une durée de voyage (entre 2 et 14 jours) et générer un itinéraire proposé incluant des activités, des lieux à visiter, etc. 

# API Utilisées 
 mistralai/mistral-7b-instruct:free
 https://restcountries.com/v3.1

