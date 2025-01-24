const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartButton = document.getElementById('restart');
const scoreX = document.getElementById('score-x');
const scoreO = document.getElementById('score-o');
const clickSound = document.getElementById('click-sound');
const winSound = document.getElementById('win-sound');
const drawSound = document.getElementById('draw-sound');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scores = { X: 0, O: 0 };

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function updateStatus(message, winner = '') {
  statusText.textContent = message;
  if (winner === 'X') {
    statusText.classList.add('x-winner');
    statusText.classList.remove('o-winner', 'draw');
  } else if (winner === 'O') {
    statusText.classList.add('o-winner');
    statusText.classList.remove('x-winner', 'draw');
  } else {
    statusText.classList.add('draw');
    statusText.classList.remove('x-winner', 'o-winner');
  }
}

function checkGameStatus() {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      updateStatus(`Player ${currentPlayer} Wins!`, currentPlayer);
      highlightWinningCells(combination);
      winSound.play();
      scores[currentPlayer]++;
      updateScores();
      return;
    }
  }
  if (!board.includes('')) {
    gameActive = false;
    updateStatus("It's a Draw!", 'draw');
    drawSound.play();
  }
}

function highlightWinningCells(combination) {
  combination.forEach(index => {
    cells[index].style.backgroundColor = 'var(--win-color)';
  });
}

function handleCellClick(event) {
  const cell = event.target;
  const index = cell.getAttribute('data-index');
  if (board[index] || !gameActive) return;
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken');
  cell.classList.add(currentPlayer);
  clickSound.play();
  checkGameStatus();
  if (gameActive) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus(`Player ${currentPlayer}'s Turn`);
  }
}

function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  updateStatus(`Player X's Turn`);
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken', 'X', 'O');
    cell.style.backgroundColor = '';
  });
}

function updateScores() {
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
