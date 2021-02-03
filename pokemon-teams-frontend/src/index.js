const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


function renderTrainers() {
    return fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(trainers => {
        trainers.forEach(trainer => trainersCard(trainer))
    })
};

function trainersCard(trainer) {
    let main = document.querySelector('main')
    let tCard = document.createElement("div")
    let pokemonList = document.createElement('ul')
    tCard.setAttribute('class', 'card')
    tCard.dataset.id = trainer.id

    let p = document.createElement("p")
    p.innerText = trainer.name

    let btn = document.createElement('button')
    btn.dataset.trainerId = trainer.id
    btn.innerText = "Add Pokemon"
    btn.addEventListener('click', createPokemon)



    tCard.append(p, btn, pokemonList)
    main.append(tCard)

    trainer.pokemons.forEach(pokemon => {
        renderPokemon(pokemon, pokemonList)
    })

};

function renderPokemon(pokemon, pokemonList, event) {
    if(pokemon.message){
        alert(pokemon.message)
    } 
    else {

        let li = document.createElement('li')

        li.innerText = `${pokemon.nickname} (${pokemon.species})`
        let deleteBtn = document.createElement('button')
        deleteBtn.innerText = "Release"
        deleteBtn.setAttribute('class', 'release')
        deleteBtn.dataset.pokemonId = pokemon.id
        deleteBtn.addEventListener('click', function(event) {
            deletePokemon(event)
            event.target.parentNode.remove()
        })
        li.append(deleteBtn)

        if (!pokemonList) {
            pokemonList = event.target.parentElement.lastElementChild
        }

        pokemonList.append(li)
    }
}

function createPokemon(event) {

    fetch(POKEMONS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          trainer_id: event.target.dataset.trainerId
        })
    })
    .then(response => response.json())
    .then(pokemon => renderPokemon(pokemon, undefined, event))
}

function deletePokemon(event) {
    fetch(POKEMONS_URL+`/${event.target.dataset.pokemonId}`, {
        method: "DELETE"
    })
    .then(response => response.json())
}

renderTrainers()