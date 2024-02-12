import express from 'express';
import indexRoute from './routes/index.js';
//export default app;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/', indexRoute);

app.get('/', (req, res) => {
    res.send('Welcome to GlobeTrotter Insights!');
  });
  

  app.get('/country/:language/:name', async (req, res) => {
    const { name, language } = req.params;
    try {
      // Fetch country information by name
      const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
      const countries = await response.json();
  
      // Assuming you want to find the first country that matches the requested name
      const country = countries.find(c => c.name.common.toLowerCase() === name.toLowerCase());

      fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${APIKEY_OPENROUTER}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "mistralai/mistral-7b-instruct:free", // Optional (user controls the default),
        "messages": [
          {"role": "user", "content": `Donne moi une description du pays {country}`},
        ]
      })
      });

      if (!country) {
        return res.status(404).send('Country not found.');
      }
      //const description = ; 
  
      // Preparing response based on language
      let translations, currencyInfo;
      if (language === "fr") {
        translations = {
          common_name: country.translations.fra.common,
          official_name: country.translations.fra.official,
        };
      } else if (language === "spa") { // Use else if to ensure mutual exclusivity
        translations = {
          common_name: country.translations.spa.common,
          official_name: country.translations.spa.official,
        };
      } else if (language === "en") { 
        translations = {
          common_name: country.name.common,
          official_name: country.name.official,
        };
      } else {
        return res.status(404).send('Language not found.');
      }

  
      // Handling currencies - taking the first currency as an example
      const currencyCode = Object.keys(country.currencies)[0];
      const currency = country.currencies[currencyCode];
      currencyInfo = {
        name: currency.name,
        symbol: currency.symbol
      };
  
      res.json({
        ...translations,
        capital: country.capital ? country.capital[0] : 'N/A',
        population: country.population,
        flag: country.flags.svg,
        flag_description: country.flags.alt || 'N/A',
        fifa_acronym: country.fifa,
        currency: currencyInfo,
        gini: country.gini || 'N/A',
        area: country.area,
        side_drive: country.car.side,
        continent: country.continents[0], // Assuming single continent
        maps: country.maps.googleMaps, 
        description : 
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while fetching country information.');
    }
  });
  

export default app;
