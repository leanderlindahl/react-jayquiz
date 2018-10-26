import fetch from 'cross-fetch';
import {
  SELECT_CATEGORY,
  INVALIDATE_CATEGORY,
  RECEIVE_QUESTIONS,
  REQUEST_QUESTIONS,
  SET_CURRENT_ANSWER,
  SET_CURRENT_ANSWER_STATUS,
  SET_CURRENT_QUESTION_INDEX,
  SET_DISPLAY_ANSWER_RESPONSE,
  SET_GAME_OVER,
  SET_SCORE
} from './actions';

export function invalidateCategory(category) {
  return { type: INVALIDATE_CATEGORY, category };
}
export function selectCategory(category) {
  return { type: SELECT_CATEGORY, category };
}
export function requestQuestions(category) {
  return { type: REQUEST_QUESTIONS, category };
}
export function receiveQuestions(category, json) {
  return {
    type: RECEIVE_QUESTIONS,
    category,
    questions: json.results,
    receivedAt: Date.now()
  };
}
export function fetchQuestions(category) {
  return dispatch => {
    dispatch(requestQuestions(category));
    return fetch(`https://opentdb.com/api.php?amount=5&category=${category}&difficulty=easy`)
      .then(
        response => response.json(),
        error => console.error('An error occured when fetching the questions.') // eslint-disable-line no-console
      )
      .then(json => dispatch(receiveQuestions(category, json)));
  };
}
export function setCurrentAnswer(currentAnswer) {
  return { type: SET_CURRENT_ANSWER, payload: currentAnswer };
}
export function setCurrentAnswerStatus(value) {
  return { type: SET_CURRENT_ANSWER_STATUS, payload: value };
}
export function setCurrentQuestionIndex(index) {
  return { type: SET_CURRENT_QUESTION_INDEX, payload: index };
}
export function setDisplayAnswerResponse(value) {
  return { type: SET_DISPLAY_ANSWER_RESPONSE, payload: value };
}
export function setGameOver(value) {
  return { type: SET_GAME_OVER, payload: value };
}
export function setScore(score) {
  return { type: SET_SCORE, payload: score };
}
