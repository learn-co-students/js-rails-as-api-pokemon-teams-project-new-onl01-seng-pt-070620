const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const docMain = document.querySelector('main')
// const fetchTrainers = () => {
//     fetch(TRAINERS_URL)
//     .then(response => response.json())
//     .then(obj => {
//         return obj
//     })
// }

const fetchTrainers = async () => {
    const res = await fetch(TRAINERS_URL)
    const obj = await res.json()
    return obj
}

const deletePokemon = async (e,id) => {
    await fetch(`${POKEMONS_URL}/${id}`,{
        method: 'DELETE'
    })
    e.target.parentElement.remove()
}
const addPokemon = async (e, id) => {
    const res = await fetch(`${POKEMONS_URL}`, {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json',
            Accept:'application/json'
        },
        body: JSON.stringify({trainer_id: id})
    })
    const obj = await res.json()
    const pokeList = e.target.parentElement.getElementsByTagName('ul')[0]
    renderPokemon(obj, pokeList)
}

const renderPokemon = (pokemon, pokeList) => {
    const pokeInfo = document.createElement('li')
    const deleteBtn = document.createElement('button')
    deleteBtn.innerHTML = ('Release')
    deleteBtn.setAttribute('data-pokemon-id', (pokemon.id))
    deleteBtn.classList.add('release')
    deleteBtn.addEventListener('click', e => {
        deletePokemon(e, pokemon.id)
    })
    pokeInfo .innerHTML = (`${pokemon.nickname} (${pokemon.species})`)
    pokeInfo.appendChild(deleteBtn)
    pokeList.appendChild(pokeInfo)
}

const renderTrainers = async (func) => {
    let trainers = await func();
    for(trainer of trainers){
        const card = document.createElement('div')
        card.classList.add('card')
        card.setAttribute('data-id', (trainer.id))
        const trainerName = document.createElement('p')
        trainerName.innerHTML = (trainer.name)
        card.appendChild(trainerName)
        const addBtn = document.createElement('button')
        addBtn.innerHTML = ('Add Pokemon')
        addBtn.setAttribute('data-trainer-id', (trainer.id))
        addBtn.addEventListener('click', e => {
            addPokemon(e, e.target.getAttribute('data-trainer-id'))
        })
        const pokeList = document.createElement('ul')
        for(pokemon of trainer.pokemon){
            console.log(pokemon)
            renderPokemon(pokemon, pokeList)
            }
        card.appendChild(addBtn)
        card.appendChild(pokeList)
        docMain.appendChild(card)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderTrainers(fetchTrainers)  
})