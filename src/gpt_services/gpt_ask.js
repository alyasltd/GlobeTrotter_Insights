// Fonction asynchrone pour interagir avec l'API OpenRouter AI et obtenir des complétions de conversation
export async function fetch_ai_gpt(mess) {
    // Envoi de la requête POST à l'API OpenRouter AI
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST", // Méthode HTTP POST pour envoyer les données
        headers: {
            "Authorization": `Bearer ${process.env.APIKEY_OPENROUTER}`, // Utilisation de la clé d'API dans l'en-tête Authorization
            "Content-Type": "application/json" // Spécification du type de contenu JSON
        },
        body: JSON.stringify({
            "model": "openai/gpt-3.5-turbo-0125", // Modèle GPT-3.5 utilisé pour la génération de texte
            "messages": [
                {"role": "user", "content": mess} // Message utilisateur à envoyer pour obtenir une réponse
            ]
        }) 
    });

    // Vérification si la réponse du serveur est ok
    if (!response.ok) {
        console.log(response)
        throw new Error('Network response was not ok'+response.status+response.statusText);
    }

    // Analyse de la réponse JSON
    const descriptionData = await response.json();

    // Retourne les données de description (ou la réponse entière selon les besoins)
    return descriptionData;
}
