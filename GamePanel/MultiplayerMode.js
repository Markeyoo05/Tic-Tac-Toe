let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));
let playerScoreDisplay = document.getElementById('playerScore');
let player2ScoreDisplay = document.getElementById('player2Score');

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);

let player1Score = 0;
let player2Score = 0;
const WINNING_SCORE = 5;

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked));
};

function boxClicked(e) {
    const id = e.target.id;

    // Check if the game is disabled due to reaching the winning score
    if (player1Score === WINNING_SCORE || player2Score === WINNING_SCORE) {
        return;
    }

    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if (playerHasWon()) {
            playerText.innerHTML = `${currentPlayer} has won!`;
            let winning_blocks = playerHasWon();
            winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator);

            if (currentPlayer === X_TEXT) {
                player1Score++;
                playerScoreDisplay.innerText = `Player1(X): ${player1Score}`;
            } else {
                player2Score++;
                player2ScoreDisplay.innerText = `Player2(O): ${player2Score}`;
            }

            if (player1Score === WINNING_SCORE || player2Score === WINNING_SCORE) {
                playerText.innerHTML = `${currentPlayer} Wins the Game!`;
                setTimeout(() => {
                    restart();
                }, 2000);
            } else {
                setTimeout(() => {
                    restart();
                }, 2000);
            }
        } else if (isDraw()) {
            playerText.innerHTML = 'Draw!';
            setTimeout(() => {
                restart();
            }, 2000);
        } else {
            currentPlayer = currentPlayer === X_TEXT ? O_TEXT : X_TEXT;
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

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition;

        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return condition;
        }
    }
    return false;
}

function isDraw() {
    return spaces.every(cell => cell !== null);
}

restartBtn.addEventListener('click', restart);

function restart() {
    spaces.fill(null);

    boxes.forEach(box => {
        box.innerText = '';
        box.style.backgroundColor = '';
    });

    playerText.innerHTML = 'Tic Tac Toe';
    currentPlayer = X_TEXT;

    if (this.id === 'restartBtn') {
    player1Score = 0;
    player2Score = 0;
    playerScoreDisplay.innerText = `Player1(X): 0`;
    player2ScoreDisplay.innerText = `Player2(O): 0`;
}

startGame(); 
}
startGame();
