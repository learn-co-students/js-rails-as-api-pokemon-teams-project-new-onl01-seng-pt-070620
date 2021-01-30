const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const trainerMain = document.querySelector('main')

// fetch trainers and pokemon and add them to the DOM

fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(trainers => {
        trainers.forEach(renderTrainer);
    });
            
            
function renderTrainer(trainer){
    const trainerCard = `
        <div class="card" data-id=${trainer.id}><p>${trainer.name}</p>
            <button data-action="add" data-trainer-id=${trainer.id}>Add Pokemon</button>
            <ul data-trainer-ul-id=${trainer.id}>
            </ul>
        </div>`;

    trainerMain.insertAdjacentHTML("beforeend", trainerCard);
    
    const trainerList = document.querySelector(`[data-trainer-ul-id='${trainer.id}']`);
    trainer.pokemons.forEach(pokemon => renderPokemon(pokemon, trainerList));
};

function renderPokemon(pokemon, trainerList){
    const pokemonLi = `
        <li>${pokemon.nickname} (${pokemon.species})
            <button class="release" data-pokemon-id=${pokemon.id}>
                Release
            </button>
        </li>`; 

    trainerList.insertAdjacentHTML("beforeend", pokemonLi);
};

// event listeners (button clicks to add and remove pokemon)

trainerMain.addEventListener('click', (e) => {
    if(e.target.innerText === "Add Pokemon"){
        const trainerUl = e.target.parentNode.querySelector('ul');
        const trainerId = e.target.dataset.trainerId;

        if(trainerUl.children.length < 6) {
            fetch(POKEMONS_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accepts': 'application/json'
                },
                body: JSON.stringify({
                    "trainer_id": trainerId  
                })
            })
            .then(resp => resp.json())
            .then(pokemon => renderPokemon(pokemon, trainerUl))
        };
    };

    if(e.target.classList.contains("release")){
        const pokemonId = e.target.dataset.pokemonId;
        fetch(`${POKEMONS_URL}/${pokemonId}`, {
            method: 'DELETE'
        })
        .then(resp => resp.json())
        .then(pokemon => e.target.parentElement.remove());
    };
});