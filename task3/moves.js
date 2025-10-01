const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBOS = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const popup = document.getElementById('winnerPopup');
let oTurn;

startGame();

function startGame() {
  oTurn = false;
  cells.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.textContent = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
  popup.classList.remove('show');
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = oTurn ? O_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false, currentClass);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  cell.textContent = currentClass.toUpperCase();
}

function swapTurns() {
  oTurn = !oTurn;
}

function checkWin(currentClass) {
  return WINNING_COMBOS.some(combo => {
    return combo.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}

function endGame(draw, winner) {
  if (draw) {
    popup.textContent = "It's a Draw!";
  } else {
    popup.textContent = `${winner.toUpperCase()} Wins!`;
  }
  popup.classList.add('show');
}

function resetGame() {
  startGame();
}
