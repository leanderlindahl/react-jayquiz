import { SET_USED_QUESTIONS } from '../actions';

const usedQuestions = (state = [], action) => {
  if (action.type === SET_USED_QUESTIONS) {
    return action.payload;
  }
  return state;
};

export default usedQuestions;
