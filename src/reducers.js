import { combineReducers } from 'redux';
import {
  SELECT_CATEGORY,
  INVALIDATE_CATEGORY,
  REQUEST_QUESTIONS,
  RECEIVE_QUESTIONS,
  SET_CURRENT_ANSWER,
  SET_CURRENT_ANSWER_STATUS,
  SET_CURRENT_QUESTION_INDEX,
  SET_DISPLAY_ANSWER_RESPONSE,
  SET_GAME_OVER,
  SET_SCORE
} from './actions';

const selectedCategory = (state = '18', action) => {
  // '18' is topic "Science: Computers"
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.category;
    default:
      return state;
  }
};

const questions = (state = { isFetching: false, didInvalidate: false, items: [] }, action) => {
  switch (action.type) {
    case INVALIDATE_CATEGORY:
      return Object.assign({}, state, { didInvaldiate: true });
    case REQUEST_QUESTIONS:
      return Object.assign({}, state, { isFetching: true, didInvalidate: false });
    case RECEIVE_QUESTIONS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.questions,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
};

// const questionsByCategory = (state = {}, action) => {
//   switch (action.type) {
//     case INVALIDATE_CATEGORY:
//     case RECEIVE_QUESTIONS:
//     case REQUEST_QUESTIONS:
//       return Object.assign({}, state, {
//         [action.category]: questions(state[action.category], action)
//       });
//     default:
//       return state;
//   }
// };

const currentAnswer = (state = '', action) => {
  if (action.type === SET_CURRENT_ANSWER) {
    return action.payload;
  }
  return state;
};
const currentAnswerStatus = (state = '', action) => {
  if (action.type === SET_CURRENT_ANSWER_STATUS) {
    return action.payload;
  }
  return state;
};
const currentQuestionIndex = (state = 0, action) => {
  if (action.type === SET_CURRENT_QUESTION_INDEX) {
    return action.payload;
  }
  return state;
};
const displayAnswerResponse = (state = false, action) => {
  if (action.type === SET_DISPLAY_ANSWER_RESPONSE) {
    return action.payload;
  }
  return state;
};
const gameOver = (state = false, action) => {
  if (action.type === SET_GAME_OVER) {
    return action.payload;
  }
  return state;
};
const score = (state = 0, action) => {
  if (action.type === SET_SCORE) {
    return action.payload;
  }
  return state;
};

const rootReducer = combineReducers({
  currentAnswer,
  currentAnswerStatus,
  currentQuestionIndex,
  displayAnswerResponse,
  gameOver,
  selectedCategory,
  score,
  questions
});

export default rootReducer;
