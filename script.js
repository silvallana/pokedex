const pokemonList = document.getElementById("#pokemonList");

let currentPokemons = [];

const limit = 10;
let offset = 0;
const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;



function fetchPokemons() {
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        offset += limit;
        currentPokemons = currentPokemons.concat(data.results);
        displayPokemons(currentPokemons);
    })
    .catch((error) => {
        console.log(error);
    })
}

function displayPokemons() {
    console.log(currentPokemons);
}

fetchPokemons();