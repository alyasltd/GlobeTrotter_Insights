

document.addEventListener('DOMContentLoaded', () => {
  // Déclaration d'un objet contenant les traductions des éléments de la page
  const translations = {
      en: {
          official_name: 'Official Name',
          capital: 'Capital',
          population: 'Population',
          currency: 'Currency',
          drive_on: 'Drive on the',
          continent: 'Continent',
          gini_index: 'Gini Index (2018)',
          area: 'Area',
          political_medical_risks: 'Political and Medical Risks',
          your_itinerary: 'Your Itinerary',
          general_info: 'General Information',
          location: 'Location',
          tourist_guide: 'Tourist Guide'
      },
      fr: {
          official_name: 'Nom officiel',
          capital: 'Capitale',
          population: 'Population',
          currency: 'Devise',
          drive_on: 'Conduite à droite ou à gauche',
          continent: 'Continent',
          gini_index: 'Indice de Gini (2018)',
          area: 'Superficie',
          political_medical_risks: 'Risques Politiques et Médicaux',
          your_itinerary: 'Votre Itinéraire',
          general_info: 'Informations Générales',
          location: 'Localisation',
          tourist_guide: 'Guide Touristique'
      },
      spa: {
          official_name: 'Nombre oficial',
          capital: 'Capital',
          population: 'Población',
          currency: 'Moneda',
          drive_on: 'Conducir por el',
          continent: 'Continente',
          gini_index: 'Índice de Gini (2018)',
          area: 'Área',
          political_medical_risks: 'Riesgos Políticos y Médicos',
          your_itinerary: 'Tu Itinerario',
          general_info: 'Información General',
          location: 'Ubicación',
          tourist_guide: 'Guía Turística'
      }
  };

  // Récupération des paramètres 'name' (nom du pays) et 'lang' (langue) de l'URL
  const urlParams = new URLSearchParams(window.location.search);
  const countryName = urlParams.get('name');
  const language = urlParams.get('lang') || 'fr';

  // Fonction pour obtenir la traduction des éléments de la page en fonction de la langue
  function translate(key) {
      return translations[language][key] || key; // Retourne la traduction ou la clé elle-même si la traduction n'est pas disponible
  }

  // Utilisation du nom du pays et de la langue pour récupérer et afficher les détails du pays
  fetchCountryDetails(language, countryName);

  // Met à jour les liens des drapeaux pour refléter la langue et le nom du pays actuels
  const baseURL = 'https://ominous-trout-gv7jx7r467rfv477-3000.app.github.dev/country.html';
  const flagLinks = document.querySelectorAll('nav ul li a');
  flagLinks.forEach(link => {
      if (link.querySelector('img[src*="images/french.png"], img[src*="images/uk.png"], img[src*="images/Spain.png"]')) {
          const url = new URL(link.href, baseURL);
          const currentLang = url.searchParams.get('lang');
          link.href = `?name=${countryName}&lang=${currentLang}`;
      }
  });

  // Fonction pour récupérer les détails du pays à partir de l'API et les afficher
  async function fetchCountryDetails(language, countryName) {
      try {
          const response = await fetch(`https://ominous-trout-gv7jx7r467rfv477-3000.app.github.dev/api/country/${language}/${countryName}`);
          if (!response.ok) {
              throw new Error('Country details not found');
          }
          const countryData = await response.json();
          displayCountryDetails(countryData);
      } catch (error) {
          console.error('Error fetching country details:', error);
      }
  }

  // Fonction pour afficher les détails du pays dans la page
  function displayCountryDetails(data) {
      // Met à jour les éléments HTML avec les données du pays en utilisant les traductions
      document.getElementById('country-name').textContent = `🌍 ${data.common_name}`;
      document.getElementById('country-flag').src = data.flag;
      document.getElementById('country-flag').alt = `Flag of ${data.common_name}`;

      // Met à jour les titres des sections avec les traductions
      document.getElementById('general-info').querySelector('h2').textContent = `📄 ${translate('general_info')}`;
      document.getElementById('location').querySelector('h2').textContent = `📍 ${translate('location')}`;
      document.getElementById('tourist-guide').querySelector('h2').textContent = `📖 ${translate('tourist_guide')}`;

      document.getElementById('general-info').innerHTML += `
          <p id="country-description">${data.description}</p>
          <p>${translate('official_name')}: ${data.official_name}</p>
          <p>${translate('capital')}: ${data.capital}</p>
          <p>${translate('population')}: ${data.population.toLocaleString()}</p>
          <p>${translate('currency')}: ${data.currency.name} (${data.currency.symbol})</p>
          <p>${translate('drive_on')}: ${data.side_drive}</p>
          <p>${translate('continent')}: ${data.continent}</p>
          <p>${translate('gini_index')}: ${data.gini['2018']}</p>
          <p>${translate('area')}: ${data.area.toLocaleString()} km²</p>
      `;

      document.getElementById('tourist-guide').innerHTML += `
          <div>
              <h3 class="h3-theme">${translate('political_medical_risks')}</h3>
              <p>${data.risks}</p>
          </div>
          <div>
              <h3 class="h3-theme">${translate('your_itinerary')}</h3>
              <p style="text-align: center;">${data.itinerary.replace(/\n/g, '<br>')}</p>
          </div>
      `;

      initMap(data.lat, data.long);
  }

  // Fonction pour initialiser la carte avec Leaflet
  function initMap(lat, long) {
      const map = L.map('map').setView([lat, long], 5);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
  }
});
