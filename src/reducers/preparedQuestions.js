import { SET_PREPARED_QUESTIONS } from '../actions';

const preparedQuestions = (state = [], action) => {
  if (action.type === SET_PREPARED_QUESTIONS) {
    return action.payload;
  }
  return state;
};

export default preparedQuestions;
