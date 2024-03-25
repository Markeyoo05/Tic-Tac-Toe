let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));
let playerScoreDisplay = document.getElementById('playerScore');
let computerScoreDisplay = document.getElementById('computerScore');

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');

const O_TEXT = "O";
const X_TEXT = "X";
const AI_PLAYER = O_TEXT;
const PLAYER = X_TEXT;

let currentPlayer = PLAYER; 
let spaces = Array(9).fill(null);
let playerScore = 0;
let computerScore = 0;

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked));
};

function boxClicked(e) {
    if (currentPlayer === PLAYER) {
        const id = e.target.id;

        if (!spaces[id]) {
            spaces[id] = currentPlayer;
            e.target.innerText = currentPlayer;

            if (playerHasWon(currentPlayer)) {
                playerText.innerHTML = `${currentPlayer} has won!`;
                highlightWinningBlocks(playerHasWon(currentPlayer));
                updateScore(currentPlayer);
                return;
            }

            if (isDraw()) {
                playerText.innerHTML = 'Draw!';
                return;
            }

            currentPlayer = AI_PLAYER; 
            setTimeout(computerMove, 500); 
        }
    }
}

function computerMove() {
    
    const emptyIndexes = spaces.map((value, index) => value === null ? index : null).filter(value => value !== null);
    const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
    if (randomIndex !== undefined) {
        const box = document.getElementById(String(randomIndex));
        box.innerText = AI_PLAYER;
        spaces[randomIndex] = AI_PLAYER;

        if (playerHasWon(AI_PLAYER)) {
            playerText.innerHTML = `${AI_PLAYER} has won!`;
            highlightWinningBlocks(playerHasWon(AI_PLAYER));
            updateScore(AI_PLAYER);
        } else if (isDraw()) {
            playerText.innerHTML = 'Draw!';
        } else {
            currentPlayer = PLAYER;
        }
    }
}

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function playerHasWon(player) {
    for (const condition of winningCombos) {
        let [a, b, c] = condition;

        if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c] && spaces[a] === player) {
            return condition;
        }
    }
    return false;
}

function highlightWinningBlocks(winningBlocks) {
    winningBlocks.forEach(index => {
        boxes[index].style.backgroundColor = winnerIndicator;
    });
}

function isDraw() {
    return spaces.every(cell => cell !== null);
}

function updateScore(winner) {
    if (winner === PLAYER) {
        playerScore++;
        playerScoreDisplay.innerText = `Player(X): ${playerScore}`;
    } else if (winner === AI_PLAYER) {
        computerScore++;
        computerScoreDisplay.innerText = `Computer(O): ${computerScore}`;
    }

    if (playerScore === 5) {
        playerText.innerHTML = 'You Win the Game!';
        disableGame();
    } else if (computerScore === 5) {
        playerText.innerHTML = 'Computer Win the Game!';
        disableGame();
    } else if (winner === PLAYER) {
        playerText.innerHTML = 'You won!';
        setTimeout(() => {
            restart();
        }, 2000);
    } else if (winner === AI_PLAYER) {
        playerText.innerHTML = 'You Lose!';
        setTimeout(() => {
            restart();
        }, 2000);
    } else if (isDraw()) {
        playerText.innerHTML = 'Draw!';
        setTimeout(() => {
            restart();
        }, 2000);
    }
}


function disableGame() {
    boxes.forEach(box => box.removeEventListener('click', boxClicked));
}

restartBtn.addEventListener('click', restart);

function restart() {
    spaces.fill(null);

    boxes.forEach(box => {
        box.innerText = '';
        box.style.backgroundColor = '';
    });

    playerText.innerHTML = 'Tic Tac Toe';
    currentPlayer = PLAYER;

   
    if (this.id === 'restartBtn') {
        playerScore = 0; 
        computerScore = 0; 
        playerScoreDisplay.innerText = `Player(X): ${playerScore}`; 
        computerScoreDisplay.innerText = `Computer(O): ${computerScore}`; 
    }

    startGame(); 
}



startGame();
