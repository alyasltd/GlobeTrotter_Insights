import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import {fetch_ai_gpt } from './gpt_services/gpt_ask.js'; 
import { fetchCountryDetails } from './countries_services/countries_ask.js'; 
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const APIKEY_OPENROUTER = process.env.APIKEY_OPENROUTER;


app.use(express.static('./front')); // Sert les fichiers statiques depuis le dossier 'front'

app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'; font-src 'https://fonts.gstatic.com'; style-src 'https://fonts.googleapis.com';");

  res.setHeader(`Access-Control-Allow-Origin`, `*`);
  res.setHeader(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  res.setHeader(`Access-Control-Allow-Headers`, `Content-Type`);
  
  next();
});


  app.get('/api', (req, res) => {
      res.send('Welcome to GlobeTrotter Insights!');
    });
  

  app.get('/api/country/:language/:name', async (req, res) => {
    const { name, language } = req.params;

    const languageMap = {
      fr: 'français',
      en: 'anglais',
      spa: 'espagnol'
    };

    const lang = languageMap[language] || 'anglais'; // Fallback à l'anglais si non trouvé

    try {
      // Fetch country information by name
      const country = await fetchCountryDetails(name, language);

      if (!country) {
        return res.status(404).send('Country not found.');
      }

      // fetch general, risk and how to visit informations about a country 
      const description_mess = `Donne moi une description du pays ${country.name.common} en ${lang} comme si on était dans un site web de voyage`;
      const risques_mess = `Donne moi les risques géopolitiques, les vaccins à avoir à jour pour voyager dans le pays ${country.name.common} en ${lang}`;
      const iti_mess = `Donne moi un itinéraire de 1 semaine assez développé et sous forme de tirets comme si c'était écrit dans un site web de 
      voyage dans le pays ${country.name.common} en ${lang}, fourni moi directement l'itinéraire en commençant par Jour 1
      pour que je puisse l'afficher dans mon site web`;

      const [description, risks, itinerary] = await Promise.all([
        fetch_ai_gpt(description_mess),
        fetch_ai_gpt(risques_mess),
        fetch_ai_gpt(iti_mess)
        ]).then(results => results.map(result => result.choices[0].message.content))
        .catch(error => {
          throw new Error(`Error when trying to fetch files : ${error}`);
        });
      
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
      } 
      else {
        return res.status(404).send('Language not found.');
      }

      // Handling currencies 
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
        maps: country.maps.openStreetMaps, 
        lat:country.latlng[0],
        long:country.latlng[1],
        description, 
        risks, 
        itinerary
      });

    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while fetching country information.');
    }
  });


app.get('/api/countries', async (req, res) => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countries = await response.json();
        const countryNames = countries.map(country => country.name.common);
        res.json(countryNames);
    } catch (error) {
        console.error('Error fetching countries:', error);
        res.status(500).send('Error fetching country list');
    }
});
  
export default app;
