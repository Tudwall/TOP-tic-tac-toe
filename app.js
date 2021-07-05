// player factory.
const createPlayer = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;
  return { getName, getMarker };
};

// gameboard module.
const gameboard = (() => {
  const status = document.querySelector("#status");
  const board = ["", "", "", "", "", "", "", "", ""];

  // TODO: Add validation, fields mustn't be empty
  const _XPlayer = createPlayer(prompt("Player 1, enter your name"), "X");
  const _OPlayer = createPlayer(prompt("Player 2, enter your name"), "O");

  let _activePlayer = _XPlayer;

  const _playerTurn = () => `It's ${_activePlayer.getName()}'s turn`;
  const _playerDraw = () => "It's a draw!";
  const _playerWin = () => `${_activePlayer.getName()} wins!`;

  const _winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const _displayBoard = () => {
    for (let i = 0; i < board.length; i++) {
      const cell = document.querySelector(`[data-i="${i}"]`);
      cell.textContent = board[i];
    }
  };

  function playerClick() {
    const cellIndex = parseInt(this.dataset.i);
    if (board[cellIndex] !== "") {
      return;
    }

    board[cellIndex] = _activePlayer.getMarker();
    this.textContent = _activePlayer.getMarker();
    _activePlayer = _activePlayer === _XPlayer ? _OPlayer : _XPlayer;
  }

  return { board, playerClick };
})();

document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", gameboard.playerClick));
