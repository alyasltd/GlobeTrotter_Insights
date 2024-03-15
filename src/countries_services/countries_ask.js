export async function fetchCountryDetails(name, lang) {
  try {
    
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    const countries = await response.json();
    console.log(Array.isArray(countries)); // This should log true if 'countries' is an array
    console.log(typeof countries); // This will show the type of 'countries'
    console.log(countries); // Check the actual structure
    const country = countries.find(c => c.name.common.toLowerCase() === name.toLowerCase());

    if (!country) {
      throw new Error('Country not found');
    }

    return country; // Retourne les données brutes du pays pour le moment
  } catch (error) {
    console.error(`Error fetching country details: ${error}`);
    throw error; // Renvoie l'erreur pour la gestion d'erreur plus haut dans la pile d'appels
  }
}