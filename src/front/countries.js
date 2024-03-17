document.addEventListener('DOMContentLoaded', () => {
    let countries = [];

    fetch('https://ominous-trout-gv7jx7r467rfv477-3000.app.github.dev/api/countries')
        .then(response => response.json())
        .then(data => {
            countries = data.sort(); // Trie les pays par ordre alphabétique
            displayCountries(countries);
        })
        .catch(error => console.error('Could not load countries', error));

    const alphabetIndexElement = document.querySelector('.alphabet-index');
    alphabetIndexElement.innerHTML = ''; // Empêche la duplication

    // Crée le lien "All" avec le même aspect que les lettres
    const allButton = document.createElement('a');
    allButton.href = '#';
    allButton.textContent = 'All';
    allButton.style.cursor = 'pointer'; // Assure que le curseur indique un élément cliquable
    allButton.addEventListener('click', (e) => {
        e.preventDefault(); // Empêche le navigateur de suivre le lien
        displayCountries(countries);
    });
    alphabetIndexElement.insertBefore(allButton, alphabetIndexElement.firstChild); // Ajoute le bouton "All" avant les lettres


    // Génération de la liste alphabétique
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    alphabet.forEach(letter => {
        const letterElement = document.createElement('a');
        letterElement.href = `#${letter}`;
        letterElement.textContent = letter;
        letterElement.addEventListener('click', (e) => {
            e.preventDefault();
            filterCountriesByLetter(letter);
        });
        alphabetIndexElement.appendChild(letterElement);
    });

    // Fonction pour afficher les pays
    function displayCountries(countries) {
        const listElement = document.querySelector('.country-list');
        listElement.innerHTML = ''; // Vide la liste actuelle
        countries.forEach(country => {
            const listItem = document.createElement('li');
            listItem.textContent = country; // Mettez le nom commun du pays ici
            listItem.style.cursor = 'pointer'; // Change le curseur pour indiquer que c'est cliquable
            listItem.addEventListener('click', () => {
                const language = 'fr'; // Or dynamically set the language
                // This redirects to the country.html page with the country name as a query parameter
                window.location.href = `country.html?name=${country}&lang=${language}`;
            });
            listElement.appendChild(listItem);
        });
    }
    

    // Fonction pour filtrer les pays par lettre
    function filterCountriesByLetter(letter) {
        const filteredCountries = countries.filter(country => country.startsWith(letter));
        displayCountries(filteredCountries.sort());
    }
});
