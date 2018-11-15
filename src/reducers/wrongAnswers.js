import { SET_WRONG_ANSWERS } from '../actions';

const wrongAnswers = (state = 0, action) => {
  if (action.type === SET_WRONG_ANSWERS) {
    return action.payload;
  }
  return state;
};

export default wrongAnswers;
