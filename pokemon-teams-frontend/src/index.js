const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


let main = document.querySelector('main')

function getTrainers() {
    fetch(TRAINERS_URL)
      .then(res => res.json()) 
      .then(data => renderTrainers(data))
}

  //fetch the data and parse
  
 // getTrainers().then(
  //    renderTrainers
  //  )

  function renderTrainers(trainers) {
      trainers.forEach(trainer => {
        let pokeString = ""
        trainer.pokemons.forEach(pokemon => {
            pokeString += `<li>${pokemon.nickname}(${pokemon.species})
            <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
        })
      main.innerHTML += `<div class="card" data-id="${trainer.id}">
      <p>${trainer.name}</p>
      <button class="add" data-trainer-id="${trainer.id}">Add Pokemon</button>
      <ul>${pokeString}</ul>
      </div>`
    })
      };

 //iterate through trainers, then their pokemons
 //create pokeString as an empty string
 //create li to hold pokemon data and button we want displayed
 //back at the trainer level, create div with p for trainer name and an add button
 //implement pokeString onto the dom in ul (needs to be at the end, order above important or it's undefined)
 //make sure ids are there and unique for stuff to be used later, use word data for proper assignment

      main.addEventListener('click', e => {
        if (e.target.dataset.trainerId !== undefined)
        fetch(POKEMONS_URL, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            trainer_id: e.target.dataset.trainerId
          })
    
        })
          .then(res => res.json())
          .then(addPokemon)
      
      if (e.target.dataset.pokemonId !== undefined)
        e.target.parentElement.remove()
        fetch(POKEMONS_URL + '/' + e.target.dataset.pokemonID, {method : 'DELETE'})
      })

  function addPokemon(pokemon){
    main.children[pokemon.trainer_id-1].lastElementChild.innerHTML +=
    `<li>${pokemon.nickname}(${pokemon.species})
    <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
  }