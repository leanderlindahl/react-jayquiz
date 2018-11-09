import {
  fetchQuestions,
  receiveQuestions,
  requestQuestions,
  setCurrentAnswerStatus,
  setCurrentQuestionIndex,
  setDisplayAnswerResponse,
  setGameOver,
  setSelectedOption,
  setScore
} from '../actionCreators';

test('setGameOver', () => {
  expect(setGameOver('false')).toMatchSnapshot();
});

test('setSelectedOption', () => {
  expect(setSelectedOption('8')).toMatchSnapshot();
});
