// player factory.
const createPlayer = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;
  return { getMarker };
};

// gameboard module.
const gameboard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

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

  const _XPlayer = createPlayer("Player 1", "X");
  const _OPlayer = createPlayer("Player 2", "O");

  function playerClick() {
    const cellIndex = parseInt(this.dataset.i);
    if (board[cellIndex] !== "") {
      return;
    }

    board[cellIndex] = _XPlayer.getMarker();
    this.textContent = _XPlayer.getMarker();
  }

  return { board, playerClick };
})();

document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", gameboard.playerClick));
