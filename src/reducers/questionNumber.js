import { SET_QUESTION_NUMBER } from '../actions';

const questionNumber = (state = 1, action) => {
  if (action.type === SET_QUESTION_NUMBER) {
    return action.payload;
  }
  return state;
};

export default questionNumber;
