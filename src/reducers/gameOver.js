import { SET_GAME_OVER } from '../actions';

const gameOver = (state = false, action) => {
  if (action.type === SET_GAME_OVER) {
    return action.payload;
  }
  return state;
};

export default gameOver;
