const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
    loadPokemons()
});

const trainerContainer = document.querySelector(".card")

async function loadPokemons() {
    fetch(TRAINERS_URL)
        .then(function(response) {
            return response.json()
        }) 
        .then(function(trainers) {
            trainers.forEach(function(trainer) {
                let div = document.createElement('div');
                div.innerHTML = trainer.name;
                trainerContainer.appendChild(div);
            })
        })
}

