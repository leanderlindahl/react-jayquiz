import { combineReducers } from 'redux';

import currentAnswerStatus from './currentAnswerStatus';
import currentQuestionIndex from './currentQuestionIndex';
import displayAnswerResponse from './displayAnswerResponse';
import gameOver from './gameOver';
import outOfTime from './outOfTime';
import optionsDisabled from './optionsDisabled';
import preparedQuestions from './preparedQuestions';
import questions from './questions';
import questionNumber from './questionNumber';
import questionsPerRound from './questionsPerRound';
import score from './score';
import selectedCategory from './selectedCategory';
import selectedOption from './selectedOption';
import timedOutAnswers from './timedOutAnswers';
import usedQuestions from './usedQuestions';
import wrongAnswers from './wrongAnswers';

const rootReducer = combineReducers({
  currentAnswerStatus,
  currentQuestionIndex,
  displayAnswerResponse,
  gameOver,
  optionsDisabled,
  outOfTime,
  preparedQuestions,
  questions,
  questionNumber,
  questionsPerRound,
  score,
  selectedCategory,
  selectedOption,
  timedOutAnswers,
  usedQuestions,
  wrongAnswers
});

export default rootReducer;
