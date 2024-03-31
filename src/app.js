// Import des modules nécessaires
import * as url from 'url'; // Module pour travailler avec les URLs
import path from 'path'; // Module pour travailler avec les chemins de fichiers
import express from 'express'; // Framework web pour Node.js
import dotenv from 'dotenv'; // Module pour charger des variables d'environnement à partir d'un fichier .env
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.js';

dotenv.config(); // Chargement des variables d'environnement

// Import des routes définies dans d'autres fichiers
import { fetch_single_country } from './routes/single_country.js'; 
import { fetch_list_countries } from './routes/list_countries.js'; 

// Initialisation de l'application Express
const app = express();

// Middleware pour parser les requêtes au format JSON
app.use(express.json());
// Middleware pour parser les requêtes au format URL-encoded
app.use(express.urlencoded({ extended: false }));

// Définition du chemin du répertoire actuel
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// Middleware pour servir les fichiers statiques depuis le dossier 'front'
app.use(express.static(path.join(__dirname, 'front')));

app.use('/api/api-docs', swaggerUi.serve);
app.get('/api/api-docs', swaggerUi.setup(swaggerDocument)); 
// Définition des routes avec les fonctions à exécuter pour chaque route
app.get('/api/country/:language/:name', fetch_single_country); // Route pour récupérer les détails d'un pays
app.get('/api/countries', fetch_list_countries); // Route pour récupérer la liste des pays


// Export de l'application Express
export default app; 
