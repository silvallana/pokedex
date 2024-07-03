const pokemonList = document.getElementById("pokemon-list");
const searchInput = document.getElementById("search-input");
const numberFilter = document.getElementById("number");
const nameFilter = document.getElementById("name");
const notFoundMessage = document.getElementById("not-found-message");


let currentPokemons = [];

const limit = 10;
let offset = 0;
const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

function showPokemons() {
    pokemonList.innerHTML = "";
    currentPokemons.forEach((pokemon) => {
        const pokemonID = pokemon.url.split("/")[6];
        const pokemonName = pokemon.name;

        const pokemonItem = document.createElement("div");
        pokemonItem.className = "pokemon-item";
        if (pokemonID < 10) {
            pokemonItem.innerHTML = `
        <h2 class="pokemon-info">${pokemonID} | ${pokemonName}</h2>
        <div class="pokemon-image">
            <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${pokemonID}.png"/>
        </div>
        <p class="pokemon-type">This is the type</p>
    `;
        } else if ((pokemonID > 10) || (pokemonID < 100)) {
            pokemonItem.innerHTML = `
        <h2 class="pokemon-info">${pokemonID} | ${pokemonName}</h2>
        <div class="pokemon-image">
            <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${pokemonID}.png"/>
        </div>
        <p class="pokemon-type">This is the type</p>
    `;
        } else {
            pokemonItem.innerHTML = `
        <h2 class="pokemon-info">${pokemonID} | ${pokemonName}</h2>
        <div class="pokemon-image">
            <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonID}.png"/>
        </div>
        <p class="pokemon-type">This is the type</p>
    `;
        }
        pokemonList.appendChild(pokemonItem);
    });
}

function fetchPokemons() {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            offset += limit;
            currentPokemons = currentPokemons.concat(data.results);
            console.log(currentPokemons);
            showPokemons(currentPokemons);
        })
        .catch((error) => {
            console.log(error);
        })
}

function searchPokemon() {
    const searchInput = searchInput.value.toLowerCase();
    let filteredPokemons;

    if (numberFilter.checked) {
        filteredPokemons = currentPokemons.filter((pokemon) => {
            const pokemonID = pokemon.url.split("/")[6];
            return pokemonID.startsWith(searchInput);
        });
    } else if (nameFilter.checked) {
        filteredPokemons = currentPokemons.filter((pokemon) =>
            pokemon.name.toLowerCase().startsWith(searchInput)
        );
    } else {
        filteredPokemons = currentPokemons;
    }

    showPokemons(filteredPokemons);

    if (filteredPokemons.length === 0) {
        notFoundMessage.style.display = "block";
    } else {
        notFoundMessage.style.display = "none";
    }
}

fetchPokemons(currentPokemons);