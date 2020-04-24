const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.getElementsByTagName("main")[0]

function buildTrainerCard(trainer) {
    let div = document.createElement('div')
    let addPokemonBtn = document.createElement('button')
    let ul = document.createElement('ul')
    let pTrainer = document.createElement('p')

    div.class = "card"
    div.id = `trainer_card_${trainer.id}`
    ul.id = `trainer_list_${trainer.id}`
    pTrainer.innerText = trainer.name
    addPokemonBtn.id = `trainer_addition_${trainer.id}`
    addPokemonBtn.innerText = 'Add Pokemon'


    main.appendChild(div)
    div.appendChild(pTrainer)
    div.appendChild(addPokemonBtn)
    div.appendChild(ul)
}

function insertPokemon(pokemon) {
    let li = document.createElement('li')
    let btn = document.createElement('button')
    let ul = document.getElementById(`trainer_list_${pokemon.trainer_id}`)
    li.innerText = `${pokemon.nickname} (${pokemon.species})`
    btn.innerText = 'release'
    btn.id = pokemon.id

    btn.addEventListener('click', deleteHandler)

    li.appendChild(btn)
    ul.appendChild(li)
    
}

function fetchOneTrainer(id) {
    return fetch(TRAINERS_URL+"/"+id)
        .then(res => res.json())
}

function fetchAllTrainers() {
    fetch(TRAINERS_URL)
        .then(res => res.json())
        .then(json => {
            json.forEach(trainer => buildTrainerCard(trainer))
        })
}

function fetchAllPokemons() {
    fetch(POKEMONS_URL)
        .then(res => res.json())
        .then(json => {
            json.forEach(pokemon => insertPokemon(pokemon))
        })
}
function deletePokemon(id) {
    fetch(POKEMONS_URL+"/"+id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

function deleteHandler(e) {
    let thisPokemonId = e.target.id
    deletePokemon(thisPokemonId)
    e.target.parentNode.remove()
}

fetchAllTrainers()
fetchAllPokemons()