import {fetch_ai_gpt } from '../gpt_services/gpt_ask.js'; 
import {fetchCountryDetails} from '../countries_services/countries_ask.js'; 


export const fetch_list_countries = async (req, res) => {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all');
            const countries = await response.json();
            const countryNames = countries.map(country => country.name.common);
            res.json(countryNames);
        } catch (error) {
            console.error('Error fetching countries:', error);
            res.status(500).send('Error fetching country list');
        }
    }

