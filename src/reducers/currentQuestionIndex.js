import { SET_CURRENT_QUESTION_INDEX } from '../actions';

const currentQuestionIndex = (state = 0, action) => {
  if (action.type === SET_CURRENT_QUESTION_INDEX) {
    return action.payload;
  }
  return state;
};

export default currentQuestionIndex;
