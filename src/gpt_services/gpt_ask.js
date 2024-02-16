export async function fetchCountryDescription(mess) {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.APIKEY_OPENROUTER}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "model": "openai/gpt-3.5-turbo-0125", // Vous pouvez ajuster le modèle si nécessaire
            "messages": [
                {"role": "user", "content": mess}
            ]
        })
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const descriptionData = await response.json();
    return descriptionData; // Ici, vous pourriez aussi vouloir extraire juste la partie spécifique de la réponse contenant la description
}

