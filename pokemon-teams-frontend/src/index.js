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
                div.setAttribute('class', 'card');
                div.setAttribute('data-id', trainer.id)
                
                let p = document.createElement('p');
                p.innerText = trainer.name

                let btn = document.createElement('button')
                btn.setAttribute("data-trainer-id", trainer.id)
                btn.innerText = "Add Pokemon"
                btn.addEventListener("click", addPokemon(event))

                let ul = document.createElement('ul')
                let pokemons = trainer.pokemons
                pokemons.forEach(pokemon => renderPokemons(pokemon));
                function renderPokemons(pokemon) {
                    let li = document.createElement('li');
                    li.innerText = pokemon.species + "->" + pokemon.nickname

                    let releaseBtn = document.createElement('button')
                    releaseBtn.setAttribute('class', "release")
                    releaseBtn.setAttribute("data-pokemon-id", pokemon.id)
                    releaseBtn.innerText = "Release"
                    releaseBtn.addEventListener("click", (event))
                    li.appendChild(releaseBtn)

                    ul.appendChild(li)
                }
                div.append(p, btn, ul)

                trainerContainer.appendChild(div);
            })
        })
}

async function addPokemon(event) {
    const postPokemon = await fetch('http://localhost:3000/trainers/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( {"trainer_id": trainer.id} )
    });
    const content = await postPokemon.json();

    console.log(content);
}

