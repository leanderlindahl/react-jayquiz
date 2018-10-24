import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AnswerOption from './AnswerOption';

const QuestionCard = props => {
  const {
    score,
    handleAnswerSelected,
    currentAnswerStatus,
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
              formattedAnswer={formattedAnswer}
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
  displayAnswerResponse: false,
  next: false,
  score: 0,
  options: [],
  formattedQuestion: '',
  formattedAnswer: '',
  questionNumber: 1
};

const mapStateToProps = state => ({
  answerResponse: state.displayAnswerResponse,
  currentAnswerStatus: state.currentAnswerStatus,
  displayAnswerResponse: state.displayAnswerResponse,
  score: state.score
});

export default connect(mapStateToProps)(QuestionCard);
