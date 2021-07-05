// gameboard module.
const gameboard = (() => {
  const board = ["X", "O", "X", "O", "X", "O", "X", "O", "X"];

  return { board };
})();

// displayController module.
const displayController = (() => {
  const displayBoard = (board) => {
    for (let i = 0; i < board.length; i++) {
      const gridItem = document.querySelector(`[data-i="${i}"]`);
      gridItem.textContent = board[i];
    }
  };

  return { displayBoard };
})();

// player factory.
const Player = (name) => {
  const getName = () => name;
  return { getName };
};
