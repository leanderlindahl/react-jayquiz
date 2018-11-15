import { SET_TIMED_OUT_ANSWERS } from '../actions';

const timedOutAnswers = (state = 0, action) => {
  if (action.type === SET_TIMED_OUT_ANSWERS) {
    return action.payload;
  }
  return state;
};

export default timedOutAnswers;
