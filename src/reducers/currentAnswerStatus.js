import { SET_CURRENT_ANSWER_STATUS } from '../actions';

const currentAnswerStatus = (state = '', action) => {
  if (action.type === SET_CURRENT_ANSWER_STATUS) {
    return action.payload;
  }
  return state;
};

export default currentAnswerStatus;
