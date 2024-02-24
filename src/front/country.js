document.addEventListener('DOMContentLoaded', () => {
  
  const language = 'fr'; // Langue souhaitée
  const countryName = 'france'; // Nom du pays (ajustez selon besoin)

  fetchCountryDetails(language, countryName);

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

  function displayCountryDetails(data) {
    // Mise à jour des éléments HTML selon votre nouvelle structure
    document.getElementById('country-name').textContent = `🌍 ${data.common_name}`;
    document.getElementById('country-flag').src = data.flag;
    document.getElementById('country-flag').alt = `Flag of ${data.common_name}`;

    // Inserting general information
    document.getElementById('general-info').innerHTML += `
      <p id="country-description"> ${data.description} </p>
      <p>Official Name: ${data.official_name}</p>
      <p>Capital: ${data.capital}</p>
      <p>Population: ${data.population.toLocaleString()}</p>
      <p>Currency: ${data.currency.name} (${data.currency.symbol})</p>
      <p>Drive on the: ${data.side_drive}</p>
      <p>Continent: ${data.continent}</p>
      <p>Gini Index (2018): ${data.gini['2018']}</p>
      <p>Area: ${data.area.toLocaleString()} km²</p>
    `;

    // Inserting tourist guide information
    document.getElementById('tourist-guide').innerHTML += `
    <div>
      <h3 class="h3-theme">Les Risques Politiques et Médicaux </h3>
      <p>${data.risks}</p>
    </div>
    <div>
      <h3 class="h3-theme">Votre Itinéraire </h3>
      <p style= "text-align: center;">${data.itinerary.replace(/\n/g, '<br>')}</p>
    </div>
    `;


    // Initialize the map
    initMap(data.lat, data.long);
  }

  function initMap(lat, long) {
    const map = L.map('map').setView([lat, long], 5); // Adjust the zoom level as needed
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

  }
});
