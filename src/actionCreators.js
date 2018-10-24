import {
  SET_CURRENT_ANSWER,
  SET_CURRENT_ANSWER_STATUS,
  SET_DISPLAY_ANSWER_RESPONSE,
  SET_SCORE
} from './actions';

export function setCurrentAnswer(currentAnswer) {
  return { type: SET_CURRENT_ANSWER, payload: currentAnswer };
}

export function setCurrentAnswerStatus(value) {
  return { type: SET_CURRENT_ANSWER_STATUS, payload: value };
}

export function setDisplayAnswerResponse(value) {
  return { type: SET_DISPLAY_ANSWER_RESPONSE, payload: value };
}

export function setScore(score) {
  return { type: SET_SCORE, payload: score };
}
