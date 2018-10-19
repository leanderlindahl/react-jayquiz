import React from 'react';
import PropTypes from 'prop-types';
import AnswerOption from './AnswerOption';

const QuestionCard = props => {
  const {
    score,
    handleAnswerSelected,
    currentAnswerStatus,
    currentAnswer,
    displayAnswerResponse,
    next,
    handleNextClick,
    handleResultClick,
    options,
    formattedQuestion,
    formattedAnswer,
    questionNumber
  } = props;

  return (
    <div className="question-wrapper">
      <h3 className="score">
        Question
        {` ${questionNumber} - `}
        Score:
        {` ${score}`}
      </h3>
      <div className="question">{formattedQuestion}</div>
      <div className="answers">
        <ul className="options">
          {options.map(option => (
            <AnswerOption
              key={option}
              option={option}
              handleAnswerSelected={handleAnswerSelected}
              currentAnswerStatus={currentAnswerStatus}
              currentAnswer={currentAnswer}
            />
          ))}
        </ul>
      </div>
      <div className="actions">
        {displayAnswerResponse ? (
          <>
            <div>
              The answer was:
              {` ${currentAnswerStatus}
                The correct answer is ${formattedAnswer}`}
            </div>
            {next ? (
              <button type="button" onClick={handleNextClick}>
                Next question
              </button>
            ) : (
              <button type="button" onClick={handleResultClick}>
                Result
              </button>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

QuestionCard.propTypes = {
  handleAnswerSelected: PropTypes.func.isRequired,
  currentAnswerStatus: PropTypes.string,
  score: PropTypes.number,
  currentAnswer: PropTypes.string,
  displayAnswerResponse: PropTypes.bool,
  next: PropTypes.bool,
  handleNextClick: PropTypes.func.isRequired,
  handleResultClick: PropTypes.func.isRequired,
  options: PropTypes.array,
  formattedQuestion: PropTypes.string,
  formattedAnswer: PropTypes.string,
  questionNumber: PropTypes.number
};

QuestionCard.defaultProps = {
  currentAnswerStatus: '',
  currentAnswer: '',
  displayAnswerResponse: false,
  next: false,
  score: 0,
  options: [],
  formattedQuestion: '',
  formattedAnswer: '',
  questionNumber: 1
};

export default QuestionCard;
