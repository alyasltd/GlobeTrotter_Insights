document.addEventListener('DOMContentLoaded', () => {
    // Initialise une variable pour stocker la liste des pays
    let countries = [];

    // Récupère la liste des pays depuis l'API
    fetch('/api/countries')
        .then(response => response.json())
        .then(data => {
            countries = data.sort(); // Trie les pays par ordre alphabétique
            displayCountries(countries); // Affiche les pays une fois qu'ils sont chargés
        })
        .catch(error => console.error('Could not load countries', error));

    // Sélectionne l'élément HTML pour afficher l'index alphabétique des pays
    const alphabetIndexElement = document.querySelector('.alphabet-index');
    alphabetIndexElement.innerHTML = ''; // Vide l'élément pour éviter la duplication

    // Crée un lien "All" pour afficher tous les pays
    const allButton = document.createElement('a');
    allButton.href = '#';
    allButton.textContent = 'All';
    allButton.style.cursor = 'pointer'; // Indique que c'est un élément cliquable
    allButton.addEventListener('click', (e) => {
        e.preventDefault(); // Empêche le navigateur de suivre le lien
        displayCountries(countries); // Affiche tous les pays
    });
    alphabetIndexElement.insertBefore(allButton, alphabetIndexElement.firstChild); // Insère le bouton "All" au début de la liste alphabétique

    // Génération de la liste alphabétique des liens pour filtrer les pays par lettre
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    alphabet.forEach(letter => {
        const letterElement = document.createElement('a');
        letterElement.href = `#${letter}`;
        letterElement.textContent = letter;
        letterElement.addEventListener('click', (e) => {
            e.preventDefault(); // Empêche le navigateur de suivre le lien
            filterCountriesByLetter(letter); // Filtrer les pays par lettre
        });
        alphabetIndexElement.appendChild(letterElement); // Ajoute chaque lettre à l'index alphabétique
    });

    // Fonction pour afficher les pays
    function displayCountries(countries) {
        const listElement = document.querySelector('.country-list');
        listElement.innerHTML = ''; // Vide la liste actuelle des pays
        countries.forEach(country => {
            const listItem = document.createElement('li');
            listItem.textContent = country; // Affiche le nom commun du pays
            listItem.style.cursor = 'pointer'; // Indique que c'est un élément cliquable
            listItem.addEventListener('click', () => {
                const language = 'fr'; // Définir la langue (français dans cet exemple)
                // Redirige vers la page country.html avec le nom du pays comme paramètre de requête
                window.location.href = `country.html?name=${country}&lang=${language}`;
            });
            listElement.appendChild(listItem); // Ajoute chaque pays à la liste
        });
    }
    
    // Fonction pour filtrer les pays par lettre
    function filterCountriesByLetter(letter) {
        const filteredCountries = countries.filter(country => country.startsWith(letter));
        displayCountries(filteredCountries.sort()); // Affiche les pays filtrés par lettre
    }
});
