import dotenv from 'dotenv';
dotenv.config();

const swaggerDocument = {
      "openapi": "3.0.0",
      "info": {
        "title": "GlobeTrotter Insights API",
        "version": "1.0.0",
        "description": "GlobeTrotter Insights is a web application providing information on countries around the world, leveraging REST Countries API and OpenRouter IA GPT 3.5. It offers cultural, historical, and geographical data, perfect for travelers and the curious."
      },
      "servers": [
        {
          "url": "https://ominous-trout-gv7jx7r467rfv477-3000.app.github.dev/"
        }
      ],
      "paths": {
        "/country/{language}/{name}": {
          "get": {
            "summary": "Fetch Single Country Details",
            "description": "Retrieves detailed information for a specific country, including a description, geopolitical risks, recommended vaccines, and a detailed one-week itinerary. The content is generated in the selected language (English, French, or Spanish) and includes cultural, historical, and geographical data.",
            "parameters": [
              {
                "name": "language",
                "in": "path",
                "required": true,
                "description": "Language code for the response data (en for English, fr for French, spa for Spanish).",
                "schema": {
                  "type": "string",
                  "enum": ["en", "fr", "spa"],
                  "example": "en"
                }
              },
              {
                "name": "name",
                "in": "path",
                "required": true,
                "description": "Name of the country to retrieve details for.",
                "schema": {
                  "type": "string",
                  "example": "France"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "Detailed information of the selected country in the specified language.",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/CountryDetail"
                    }
                  }
                }
              },
              "404": {
                "description": "Country or language not found."
              },
              "500": {
                "description": "Server error occurred while fetching country information."
              }
            }
          }
        },
        "/countries": {
          "get": {
            "summary": "List All Countries",
            "description": "Provides a list of all countries. This endpoint fetches the complete list of countries from the REST Countries API and returns an array of their common names.",
            "responses": {
              "200": {
                "description": "A list of all country names.",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "example": "Albania, France, Brazil etc. "
                      }
                    }
                  }
                }
              },
              "500": {
                "description": "Error fetching the country list."
              }
            }
          }
        }
      },
      "components": {
        "schemas": {
          "CountryDetail": {
            "type": "object",
            "properties": {
              "common_name": {
                "type": "string",
                "description": "Common name of the country in the specified language."
              },
              "official_name": {
                "type": "string",
                "description": "Official name of the country in the specified language."
              },
              "capital": {
                "type": "string",
                "description": "Capital city of the country."
              },
              "population": {
                "type": "integer",
                "description": "Population of the country."
              },
              "flag": {
                "type": "string",
                "description": "URL to the country's flag image."
              },
              "flag_description": {
                "type": "string",
                "description": "Description of the flag (if available)."
              },
              "fifa_acronym": {
                "type": "string",
                "description": "FIFA country code."
              },
              "currency": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "Currency name."
                  },
                  "symbol": {
                    "type": "string",
                    "description": "Currency symbol."
                  }
                }
              },
              "gini": {
                "type": "string",
                "description": "Gini coefficient (if available)."
              },
              "area": {
              "type": "integer",
              "description": "Area of the country in square kilometers."
              },
              "side_drive": {
              "type": "string",
              "description": "Side of the road for driving."
              },
              "continent": {
              "type": "string",
              "description": "Continent where the country is located."
              },
              "maps": {
              "type": "string",
              "description": "OpenStreetMaps URL for the country."
              },
              "lat": {
              "type": "number",
              "description": "Latitude coordinate of the country."
              },
              "long": {
              "type": "number",
              "description": "Longitude coordinate of the country."
              },
              "description": {
              "type": "string",
              "description": "AI-generated description of the country."
              },
              "risks": {
              "type": "string",
              "description": "AI-generated information on geopolitical risks and required vaccines."
              },
              "itinerary": {
              "type": "string",
              "description": "AI-generated detailed one-week travel itinerary."
              }
              }
              }
              }
              }
            }
    

// Export the swaggerDocument object as a module
export default swaggerDocument;
