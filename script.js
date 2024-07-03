const pokemonList = document.getElementById("pokemon-list");

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
        pokemonItem.innerHTML = `
        <h2 class="pokemon-info">${pokemonID} | ${pokemonName}</h2>
        <div class="pokemon-image">
            <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png"/>
        </div>
        <p class="pokemon-type">This is the type</p>
    `;
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
            showPokemons();
        })
        .catch((error) => {
            console.log(error);
        })
}

fetchPokemons();