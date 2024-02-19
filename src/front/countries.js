document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/countries')
        .then(response => response.json())
        .then(countries => {
            const listElement = document.querySelector('.country-list');
            countries.forEach(country => {
                const listItem = document.createElement('li');
                listItem.textContent = country;
                listElement.appendChild(listItem);
            });
        })
        .catch(error => console.error('Could not load countries', error));
});
