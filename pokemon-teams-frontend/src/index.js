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
                btn.addEventListener("click", (event))

                let ul = document.createElement('ul')
                let pokemons = trainer.pokemons
                pokemons.forEach(renderPokemons);
                function renderPokemons(nickname, species) {
                    let li = document.createElement('li');
                    li.innerText = pokemons.nickname + pokemons.species

                    let releaseBtn = document.createElement('button')
                    releaseBtn.setAttribute('class', "release")
                    releaseBtn.setAttribute("data-pokemon-id", pokemons.id)
                    releaseBtn.innerText = "Release"
                    releaseBtn.addEventListener("click", (event))

                    ul.appendChild(li, releaseBtn)
                }

                div.append(p, btn, ul)

                trainerContainer.appendChild(div);
            })
        })
}

