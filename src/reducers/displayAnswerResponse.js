import { SET_DISPLAY_ANSWER_RESPONSE } from '../actions';

const displayAnswerResponse = (state = false, action) => {
  if (action.type === SET_DISPLAY_ANSWER_RESPONSE) {
    return action.payload;
  }
  return state;
};

export default displayAnswerResponse;
