import { Map, getIn, hasIn } from 'immutable';

const board = Map();

export default function reducer(
  state = { winner: '', board: board, turn: 'X' },
  action
) {
  switch (action.type) {
    case 'MOVE':
      const newBoard = state.board.setIn(action.position, action.player);
      const newWinner = winner(newBoard);
      return {
        board: newBoard,
        turn: state.turn === 'X' ? 'O' : 'X',
        winner: newWinner
      };
    // return { ...state, position: action.position, player: action.player };
    default:
      return state;
  }
}

//Action Creator
const move = (turn, position) => {
  console.log('turn =', turn);
  return {
    type: 'MOVE',
    position: position,
    player: turn
  };
};

//Winner function returns 'X' or 'O' if winner,
//null if game is ongoing,
// 'draw' if the game is a draw

const winner = board => {
  const coordsArr = [
    { a: [0, 0], b: [0, 1], c: [0, 2] },
    { a: [1, 0], b: [1, 1], c: [1, 2] },
    { a: [2, 0], b: [2, 1], c: [2, 2] },
    { a: [0, 0], b: [1, 0], c: [2, 0] },
    { a: [0, 1], b: [1, 1], c: [2, 1] },
    { a: [0, 2], b: [1, 2], c: [2, 2] },
    { a: [0, 0], b: [1, 1], c: [2, 2] },
    { a: [0, 2], b: [1, 1], c: [2, 0] }
  ];

  let result = '';
  for (let i = 0; i < coordsArr.length; i++) {
    result = streak(board, coordsArr[i]);
    if (result === 'X' || result === 'O') {
      return result;
    }
  }

  for (let j = 0; j < coordsArr.length; j++) {
    for (let coords in coordsArr[i]) {
      if (!hasIn(board, coords)) return undefined;
    }
  }
  return 'draw';
};
// If all the specified coordinates are (1) defined, and (2) have the same value, then streak returns that value.

// Otherwise, it returns undefined.

const streak = (board, coordsObj) => {
  let tally = { x: 0, o: 0 };
  for (let coords in coordsObj) {
    if (getIn(board, coords) === 'X') {
      tally.x++;
    } else if (getIn(board, coords) === 'O') {
      tally.o++;
    }
  }
  if (tally.x === 3) {
    return 'X';
  } else if (tally.o === 3) {
    return 'O';
  } else {
    return undefined;
  }
};

export { move };
