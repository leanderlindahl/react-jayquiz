import {
  SET_CURRENT_ANSWER,
  SET_CURRENT_ANSWER_STATUS,
  SET_DISPLAY_ANSWER_RESPONSE,
  SET_SCORE
} from './actions';

const DEFAULT_STATE = {
  currentAnswer: '',
  currentAnswerStatus: '',
  displayAnswerResponse: false,
  score: 0
};

const setCurrentAnswer = (state, action) =>
  Object.assign({}, state, { currentAnswer: action.payload });

const setCurrentAnswerStatus = (state, action) =>
  Object.assign({}, state, { currentAnswerStatus: action.payload });

const setDisplayAnswerResponse = (state, action) =>
  Object.assign({}, state, { displayAnswerResponse: action.payload });

const setScore = (state, action) => Object.assign({}, state, { score: action.payload });

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_ANSWER:
      return setCurrentAnswer(state, action);
    case SET_CURRENT_ANSWER_STATUS:
      return setCurrentAnswerStatus(state, action);
    case SET_DISPLAY_ANSWER_RESPONSE:
      return setDisplayAnswerResponse(state, action);
    case SET_SCORE:
      return setScore(state, action);
    default:
      return state;
  }
};

export default rootReducer;
