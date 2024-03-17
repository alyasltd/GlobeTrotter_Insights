// Importation des fonctions nécessaires depuis les fichiers correspondants
import { fetch_ai_gpt } from '../gpt_services/gpt_ask.js'; // Fonction pour interagir avec l'API OpenRouter AI
import { fetchCountryDetails } from '../countries_services/countries_ask.js'; // Fonction pour récupérer les détails d'un pays

// Fonction pour récupérer la liste des pays
export const fetch_list_countries = async (req, res) => {
    try {
        // Envoi de la requête GET à l'API REST Countries pour récupérer la liste de tous les pays
        const response = await fetch('https://restcountries.com/v3.1/all');
        // Conversion de la réponse en format JSON
        const countries = await response.json();
        // Extraction des noms des pays à partir des données récupérées
        const countryNames = countries.map(country => country.name.common);
        // Envoi des noms des pays en tant que réponse JSON
        res.json(countryNames);
    } catch (error) {
        // Gestion des erreurs : affiche l'erreur dans la console et envoie une réponse d'erreur 500
        console.error('Error fetching countries:', error);
        res.status(500).send('Error fetching country list');
    }
}
