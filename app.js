// gameboard module.
const gameboard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

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

    // board[cellIndex] = Player.getMarker();
  }

  return { board, playerClick };
})();

document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", gameboard.playerClick));

// player factory.
const Player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => (marker = "X");
  return { getName, getMarker };
};
