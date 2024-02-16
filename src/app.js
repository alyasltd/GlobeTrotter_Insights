import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import {fetchCountryDescription } from './gpt_services/gpt_ask.js'; 


const APIKEY_OPENROUTER = process.env.APIKEY_OPENROUTER;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/', indexRoute);

app.get('/', (req, res) => {
    res.send('Welcome to GlobeTrotter Insights!');
  });
  

  app.get('/country/:language/:name', async (req, res) => {
    const { name, language } = req.params;

    // Mapping des codes de langue si nécessaire
    const languageMap = {
      fr: 'français',
      en: 'anglais',
      spa: 'espagnol'
      // Ajoutez d'autres correspondances de langues si nécessaire
    };

    const lang = languageMap[language] || 'anglais'; // Fallback à l'anglais si non trouvé


    try {
      // Fetch country information by name
      const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
      const countries = await response.json();
      // Assuming I want to find the first country that matches the requested name
      const country = countries.find(c => c.name.common.toLowerCase() === name.toLowerCase());


      // fetch general informations about a country 
      const description_mess = `Donne moi une description du pays ${country.name.common} en ${lang}`;
      const risques_mess = `Donne moi les risques géopolitiques, les vaccins à avoir à jour pour voyager dans le pays ${country.name.common} en ${lang}`;
      const iti_mess = `Donne moi un itinéraire de 1 semaine dans le pays ${country.name.common} en ${lang}`;

      // Créer un tableau de promesses
      const [description, risques, iti] = await Promise.all([
        fetchCountryDescription(description_mess),
        fetchCountryDescription(risques_mess),
        fetchCountryDescription(iti_mess)
        ]).then(results => results.map(result => result.choices[0].message.content))
        .catch(error => {
          throw new Error(`Erreur lors de la récupération des informations: ${error}`);
        });
      

      if (!country) {
        return res.status(404).send('Country not found.');
      }
  
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
        maps: country.maps.googleMaps, 
        description, 
        risques, 
        iti
      });


    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while fetching country information.');
    }
  });
  
export default app;
