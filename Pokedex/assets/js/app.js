const URL = 'https://pokeapi.co/api/v2/pokemon/';

const searchInput = document.getElementById('n');
const pokedexContainer = document.getElementById('pokedex');
const searchButton = document.getElementById('searchButton');

// Función para mostrar un mensaje de error
function showError(message) {
    pokedexContainer.innerHTML = `<p class="error">${message}</p>`;
}

// Función para buscar un Pokémon
async function searchPokemon() {
    // Obtener el valor del campo de búsqueda y convertirlo a minúsculas
    const searchedPokemon = searchInput.value.toLowerCase();

    try {
        // Realizar una petición a la API de PokeAPI con el nombre del Pokémon
        const response = await fetch(URL + searchedPokemon);
        if (!response.ok) {
            // Si la respuesta no es exitosa, mostrar un mensaje de error
            showError(`No se encontró ningún Pokémon llamado "${searchedPokemon}"`);
            return;
        }

        // Convertir la respuesta a JSON
        const data = await response.json();

        // Mostrar los datos del Pokémon en el contenedor de resultados
        pokedexContainer.innerHTML = `
            <h2>${data.name.toUpperCase()}</h2>
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <p>Número: ${data.id}</p>
            <p>Altura: ${data.height / 10}m</p>
            <p>Peso: ${data.weight / 10}kg</p>
        `;
    } catch (error) {
        // Si ocurre algún error durante la petición, mostrar un mensaje de error
        showError('Ha ocurrido un error al buscar el Pokémon');
        console.error(error);
    }
}

// Agregar un controlador de eventos al botón de búsqueda
searchButton.addEventListener('click', searchPokemon);
