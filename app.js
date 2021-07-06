// player factory.
const createPlayer = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;
  return { getName, getMarker };
};

// modal module.
const modal = (() => {
  const modal = document.querySelector("#modal");
  const XplayerField = document.querySelector("#X-player");
  const OplayerField = document.querySelector("#O-player");

  function _formValidation() {
    if (XplayerField.value == "") {
      alert("Please enter player 1's name.");
      XplayerField.focus();
      return false;
    }
    if (OplayerField.value == "") {
      alert("Please enter player 2's name.");
      OplayerField.focus();
      return false;
    }
    return true;
  }

  function _submit() {
    if (_formValidation()) {
      const XPlayer = createPlayer(XplayerField.textContent, "X");
      const OPlayer = createPlayer(OplayerField.textContent, "O");
      modal.style.display = "none";
    }
  }

  return { _submit };
})();

// gameboard module.
const gameboard = (() => {
  const status = document.querySelector("#status");
  const _board = ["", "", "", "", "", "", "", "", ""];

  // TODO: Add validation, fields mustn't be empty
  const _XPlayer = createPlayer(prompt("Player 1, enter your name"), "X");
  const _OPlayer = createPlayer(prompt("Player 2, enter your name"), "O");

  // _activePlayer is undefined.
  let _activePlayer = modal._XPlayer;

  const _playerTurn = () => `It's ${_activePlayer.getName()}'s turn`;
  status.textContent = _playerTurn();
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

  const _removeCellEventListener = () => {
    document
      .querySelectorAll(".cell")
      .forEach((cell) => cell.removeEventListener("click", playerClick));
  };

  const _displayBoard = () => {
    for (let i = 0; i < _board.length; i++) {
      const cell = document.querySelector(`[data-i="${i}"]`);
      cell.textContent = _board[i];
    }
  };

  const _winCheck = () => {
    let winTurn = false;
    for (let _winCondition of _winConditions) {
      let val1 = _board[_winCondition[0]];
      let val2 = _board[_winCondition[1]];
      let val3 = _board[_winCondition[2]];

      if (val1 === "" || val2 === "" || val3 === "") {
        continue;
      }

      if (val1 === val2 && val2 === val3) {
        winTurn = true;
        break;
      }
    }

    if (winTurn) {
      status.textContent = _playerWin();
      _removeCellEventListener();
      return;
    }

    if (!_board.includes("")) {
      status.textContent = _playerDraw();
      _removeCellEventListener();
      return;
    }

    _activePlayer =
      _activePlayer === modal._XPlayer ? modal._OPlayer : modal._XPlayer;
    status.textContent = _playerTurn();
  };

  function restartGame() {
    for (let i = 0; i < _board.length; i++) {
      _board[i] = "";
    }
    _activePlayer = _XPlayer;
    status.textContent = _playerTurn();
    document
      .querySelectorAll(".cell")
      .forEach((cell) => (cell.textContent = ""));
  }

  function playerClick() {
    const cellIndex = parseInt(this.dataset.i);
    if (_board[cellIndex] !== "") {
      return;
    }

    _board[cellIndex] = _activePlayer.getMarker();
    this.textContent = _activePlayer.getMarker();
    _winCheck();
  }

  return { playerClick, restartGame };
})();

document.querySelector("#submit").addEventListener("click", modal._submit);

document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", gameboard.playerClick));

document
  .querySelector("#restart-btn")
  .addEventListener("click", gameboard.restartGame);
