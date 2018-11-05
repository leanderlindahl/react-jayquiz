import {
  invalidateCategory,
  selectCategory,
  receiveQuestions,
  requestQuestions,
  fetchQuestions,
  setCurrentAnswer,
  setCurrentAnswerStatus,
  setCurrentQuestionIndex,
  setDisplayAnswerResponse,
  setGameOver,
  setScore
} from '../actionCreators';

test('setCurrentAnswer', () => {
  expect(setCurrentAnswer('8')).toMatchSnapshot();
});
