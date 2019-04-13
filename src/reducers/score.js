import { SET_SCORE } from '../actions';

const score = (state = 0, action) => {
  if (action.type === SET_SCORE) {
    return action.payload;
  }
  return state;
};

export default score;
