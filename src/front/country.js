// Attend que le contenu de la page soit entièrement chargé avant d'exécuter le code JavaScript.
document.addEventListener('DOMContentLoaded', () => {
  // Récupère les paramètres 'name' (nom du pays) et 'lang' (langue) de l'URL.
  const urlParams = new URLSearchParams(window.location.search);
  const countryName = urlParams.get('name'); // Récupère le nom du pays à partir des paramètres de l'URL.
  const language = urlParams.get('lang') || 'fr'; // Récupère la langue de l'URL ou utilise 'fr' comme langue par défaut.

  // Utilise le nom du pays et la langue pour récupérer et afficher les détails du pays.
  fetchCountryDetails(language, countryName);

  // Met à jour les liens des drapeaux pour refléter la langue et le nom du pays actuels.
  const baseURL = 'https://ominous-trout-gv7jx7r467rfv477-3000.app.github.dev/country.html';
  const flagLinks = document.querySelectorAll('nav ul li a'); // Sélectionne tous les liens dans la barre de navigation.
  flagLinks.forEach(link => {
    // Vérifie si le lien contient une image de drapeau.
    if (link.querySelector('img[src*="images/french.png"], img[src*="images/uk.png"], img[src*="images/Spain.png"]')) {
        // Construit une nouvelle URL basée sur le lien actuel et la base URL.
        const url = new URL(link.href, baseURL);
        const currentLang = url.searchParams.get('lang'); // Récupère la langue actuelle du lien.
        link.href = `?name=${countryName}&lang=${currentLang}`; // Met à jour l'URL du lien pour inclure le nom du pays et la langue actuelle.
        
        // Affiche dans la console pour le débogage.
        console.log('Updated link:', link.href);
    }
  });
  
  // Fonction asynchrone pour récupérer les détails du pays à partir de l'API et les afficher.
  async function fetchCountryDetails(language, countryName) {
    try {
      // Effectue une requête fetch à l'API et attend la réponse.
      const response = await fetch(`https://ominous-trout-gv7jx7r467rfv477-3000.app.github.dev/api/country/${language}/${countryName}`);
      if (!response.ok) { // Vérifie que la réponse est ok.
        throw new Error('Country details not found'); // Lance une erreur si les détails du pays ne sont pas trouvés.
      }
      const countryData = await response.json(); // Convertit la réponse en JSON.
      displayCountryDetails(countryData); // Affiche les détails du pays.
    } catch (error) {
      console.error('Error fetching country details:', error); // Affiche les erreurs de récupération des détails du pays.
    }
  }

  // Fonction pour afficher les détails du pays dans la page.
  function displayCountryDetails(data) {
    // Met à jour les éléments HTML avec les données du pays.
    document.getElementById('country-name').textContent = `🌍 ${data.common_name}`;
    document.getElementById('country-flag').src = data.flag;
    document.getElementById('country-flag').alt = `Flag of ${data.common_name}`;

    // Insère des informations générales sur le pays.
    document.getElementById('general-info').innerHTML += `
      <p id="country-description">${data.description}</p>
      <p>Official Name: ${data.official_name}</p>
      <p>Capital: ${data.capital}</p>
      <p>Population: ${data.population.toLocaleString()}</p>
      <p>Currency: ${data.currency.name} (${data.currency.symbol})</p>
      <p>Drive on the: ${data.side_drive}</p>
      <p>Continent: ${data.continent}</p>
      <p>Gini Index (2018): ${data.gini['2018']}</p>
      <p>Area: ${data.area.toLocaleString()} km²</p>
    `;

    // Insère des informations destinées aux touristes.
    document.getElementById('tourist-guide').innerHTML += `
      <div>
        <h3 class="h3-theme">Les Risques Politiques et Médicaux</h3>
        <p>${data.risks}</p>
      </div>
      <div>
        <h3 class="h3-theme">Votre Itinéraire</h3>
        <p style="text-align: center;">${data.itinerary.replace(/\n/g, '<br>')}</p>
      </div>
    `;

    // Initialise la carte avec les coordonnées du pays.
    initMap(data.lat, data.long);
  }

  // Fonction pour initialiser la carte avec Leaflet.
  function initMap(lat, long) {
    // Crée une nouvelle carte Leaflet et la positionne sur les coordonnées spécifiées.
    const map = L.map('map').setView([lat, long], 5); // Ajuste le niveau de zoom selon les besoins.
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { // Utilise les tuiles d'OpenStreetMap.
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map); // Ajoute la couche de tuiles à la carte.
  }
});
