// gameboard module.
const gameboard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  return {};
})();

// player factory.
const player = (name) => {
  const getName = () => name;
  return { getName };
};
