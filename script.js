var player1Name = "Player 1", player2Name = "Player 2";

var images = [
    "img/apple.png",
    "img/avocado.png",
    "img/blueberry.png",
    "img/coconut.png",
    "img/grapes.png",
    "img/orange.png",
    "img/pomegranate.png",
    "img/raspberry.png",
    "img/strawberry.png",
    "img/pear.png",
    "img/apple.png",
    "img/avocado.png",
    "img/blueberry.png",
    "img/coconut.png",
    "img/grapes.png",
    "img/orange.png",
    "img/pomegranate.png",
    "img/raspberry.png",
    "img/strawberry.png",
    "img/pear.png"
];

var img = images;

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

var shuffledImages = shuffleArray(images);

var container = document.querySelector(".grid");

var player1Score = 0;
var player2Score = 0;

var flippedCards = [];

var currentPlayer = 1;

var matchedPairs = 0;

var additionalChance = 0;

for (var i = 0; i < 20; i++) {
    var div = document.createElement("div");
    div.className = "card";
    div.onclick = display;

    var image = document.createElement("img");
    image.src = shuffledImages[i];
    image.id = shuffledImages[i];

    div.appendChild(image);

    container.appendChild(div);
}

function display(event) {
    var clickedCard = event.target.closest('.card');
    var img = clickedCard.querySelector('img');

    if (flippedCards.includes(clickedCard)) {
        return;
    }

    if (clickedCard.classList.contains('matched') || flippedCards.length === 2) {
        return;
    }

    img.classList.toggle('flip');

    flippedCards.push(clickedCard);

    if (flippedCards.length === 2) {
        var firstCardImgId = flippedCards[0].querySelector('img').id;
        var secondCardImgId = flippedCards[1].querySelector('img').id;

        if (firstCardImgId === secondCardImgId) {
            flippedCards[0].classList.add('matched', 'player' + currentPlayer);
            flippedCards[1].classList.add('matched', 'player' + currentPlayer);

            if (currentPlayer === 1) {
                player1Score++;
            } else {
                player2Score++;
            }

            matchedPairs++;
            if (matchedPairs === images.length / 2) {
                displayWinner();
            }

            flippedCards = [];

            additionalChance = 1;
        } else {
            setTimeout(function () {
                flippedCards[0].querySelector('img').classList.remove('flip');
                flippedCards[1].querySelector('img').classList.remove('flip');
                flippedCards = [];

                if (!additionalChance) {
                    currentPlayer = currentPlayer === 1 ? 2 : 1;
                    updatePlayerMessage();
                } else {
                    additionalChance = false;
                }
            }, 600);
        }

        // Update and display scores
        updateScores();
    } else {
        // Update player's turn
        if (!flippedCards.includes(clickedCard)) {
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            updatePlayerMessage();
        }
    }
}

function updateScores() {
    document.getElementById('player1Score').textContent = player1Name+" : " + player1Score;
    document.getElementById('player2Score').textContent = player2Name+" : " + player2Score;
    additionalChance = 0;
}

function updatePlayerMessage() {
    var currentPlayerMessage = currentPlayer === 1 ? player1Name+"'s Turn" : player2Name+"'s Turn";
    document.getElementById('currentPlayer').textContent = currentPlayerMessage;

    // Add class to body to change background color based on player's turn
    document.body.classList.remove('player1-turn', 'player2-turn');
    if (currentPlayer === 1) {
        document.body.classList.add('player1-turn');
    } else {
        document.body.classList.add('player2-turn');
    }

    // Update message text color based on player's turn
    var messageElement = document.querySelector('.message');
    messageElement.classList.remove('player1-message', 'player2-message');
    if (currentPlayer === 1) {
        messageElement.classList.add('player1-message');
    } else {
        messageElement.classList.add('player2-message');
    }
}

function displayWinner() {
    var winnerMessage = player1Score > player2Score ? player1Name+" Wins!" : (player1Score < player2Score ? player2Name+" Wins!" : "It's a tie!");
    document.getElementById('currentPlayer').textContent = winnerMessage;
}


var images = document.querySelectorAll('.card img');
images.forEach(function (image) {
    image.addEventListener('contextmenu', function (event) {
        event.preventDefault();
    });
});

// Prevent dragging of images
images.forEach(function (image) {
    image.addEventListener('dragstart', function (event) {
        event.preventDefault();
    });
});


function startGame() {
    player1 = document.getElementById('player1Name').value;
    player2 = document.getElementById('player2Name').value;

    // Check if names are provided
    if (player1.trim() === '' || player2.trim() === '') {
        alert('Please enter names for both players.');
        return;
    }

    player1Name = player1;
    player2Name = player2;

    // Hide the start form
    document.querySelector('.start-form').style.display = 'none';

    // Show the game elements
    document.querySelector('.memory-game').style.display = 'block';

    // Update player names in the game
    document.getElementById('player1Score').textContent = player1Name + ": 0";
    document.getElementById('player2Score').textContent = player2Name + ": 0";
    document.getElementById('currentPlayer').textContent = player1Name + "'s Turn";
}

function closeStartForm() {
    document.querySelector('.start-form').style.display = 'none';
}

function restartGame() {
    // Remove 'matched' class from all cards
    var cards = document.querySelectorAll('.card');
    cards.forEach(function(card) {
        card.classList.remove('matched');
        card.classList.remove('player1');
        card.classList.remove('player2');
    });

    // Remove 'flip' class from all images
    var cardImages = document.querySelectorAll('.card img');
    cardImages.forEach(function(image) {
        image.classList.remove('flip');
    });

    // Reset scores, matched pairs, and current player variables
    player1Score = 0;
    player2Score = 0;
    matchedPairs = 0;
    currentPlayer = 1;
    flippedCards = [];
    additionalChance = 0;

    // Update and display scores
    updateScores();

    // Update player message
    updatePlayerMessage();

    // Delay before shuffling the images array
    setTimeout(function() {
        // Reshuffle the images array
        var shuffledImages = shuffleArray(img);

        // Update src attribute with shuffled image URLs
        var cardImages = document.querySelectorAll('.card img');
        cardImages.forEach(function(image, index) {
            // Update src attribute with shuffled image URL
            image.src = shuffledImages[index];
            image.id = shuffledImages[index];
        });
    }, 300);
}

var inputBox = document.getElementById("player2Name");

// Add event listener for keyup event
inputBox.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        startGame();
    }
});
