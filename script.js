let resultEl = document.getElementById("message-el")
let sumText = document.getElementById("sum-text")
let cardText = document.getElementById("card-text")
let playerEl = document.getElementById("player-el")
let allPlayersEl = document.getElementById("all-players-el")

let cards = []
let sum = 0
let hasblackjack = false
let isAlive = false

// Initial player
let player = {
    name: "Shiv",
    chips: 145
}

// List of all players
let players = [player]

// Display the initial player
playerEl.textContent = player.name + " : " + player.chips
updatePlayerList()

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1
    if (randomNumber >= 11) return 10
    else if (randomNumber === 1) return 11
    return randomNumber
}

function startGame() {
    isAlive = true
    let firstcard = getRandomCard()
    let secondcard = getRandomCard()
    cards = [firstcard, secondcard]
    sum = firstcard + secondcard
    renderGame()
}

function renderGame() {
    cardText.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardText.textContent += cards[i] + " "
    }

    sumText.textContent = "Sum: " + sum

    if (sum < 21) {
        resultEl.textContent = "Draw another card"
    } else if (sum === 21) {
        resultEl.textContent = "You got Blackjack!!"
        hasblackjack = true
    } else {
        resultEl.textContent = "You lose!"
        isAlive = false
    }
}

function newCard() {
    if (isAlive === true && hasblackjack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()
    }
}

function newPlayer() {
    // Reset game state
    cards = []
    sum = 0
    hasblackjack = false
    isAlive = false

    // Clear UI text
    resultEl.textContent = "Want to play a round?"
    cardText.textContent = "Cards: "
    sumText.textContent = "Sum: "

    // Prompt for new player info
    let newName = prompt("Enter player's name:")
    let newChips = prompt("Enter starting chips:")

    if (newName && newChips && !isNaN(newChips)) {
        player = {
            name: newName,
            chips: parseInt(newChips)
        }
    } else {
        player = {
            name: "Player",
            chips: 100
        }
    }

    // Update current player and list
    players.push(player)
    playerEl.textContent = player.name + " : " + player.chips
    updatePlayerList()
}

function addPlayer() {
    let newName = prompt("Enter new player's name:")
    let newChips = prompt("Enter starting chips:")

    if (newName && newChips && !isNaN(newChips)) {
        let newPlayer = {
            name: newName,
            chips: parseInt(newChips)
        }
        players.push(newPlayer)
        alert("Player added: " + newPlayer.name + " with " + newPlayer.chips + " chips.")
        updatePlayerList()
    } else {
        alert("Invalid input. Player not added.")
    }
}

function updatePlayerList() {
    allPlayersEl.innerHTML = "<strong>All Players:</strong><br>"
    players.forEach((p, index) => {
        allPlayersEl.innerHTML += (index + 1) + ". " + p.name + " : " + p.chips + "<br>"
    })
}
