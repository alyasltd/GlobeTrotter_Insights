// Fonction asynchrone pour récupérer les détails d'un pays en fonction de son nom
export async function fetchCountryDetails(name, lang) {
  try {
    // Envoi de la requête GET à l'API REST Countries pour obtenir les détails du pays par son nom
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    // Conversion de la réponse en format JSON
    const countries = await response.json();

    // Affiche quelques informations pour le débogage
    console.log(Array.isArray(countries)); // Devrait afficher true si 'countries' est un tableau
    console.log(typeof countries); // Affiche le type de 'countries'
    console.log(countries); // Vérifie la structure réelle des données

    // Recherche du pays dans le tableau de pays récupéré
    const country = countries.find(c => c.name.common.toLowerCase() === name.toLowerCase());

    // Si le pays n'est pas trouvé dans la réponse, lance une erreur
    if (!country) { 
      throw new Error('Country not found');
    }

    // Retourne les données brutes du pays pour le moment
    return country;
  } catch (error) {
    // Gestion des erreurs : affiche l'erreur et la renvoie pour être traitée plus haut dans la pile d'appels
    console.error(`Error fetching country details: ${error}`);
    throw error;
  }
}
