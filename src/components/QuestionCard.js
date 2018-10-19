import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AnswerOption from './AnswerOption';

class QuestionCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // options: [],
      // formattedQuestion: ''
    };
  }

  componentDidMount() {
    //this.modifyQuestion();
  }

  render() {
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
    } = this.props;

    return (
      <div className="question-wrapper">
        <h3 className="score">
          Question number:
          {` ${questionNumber} `}
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
      //
    );
  }
}

// QuestionCard.propTypes = {
//   question: PropTypes.object,
//   handleAnswerSelected: PropTypes.func.isRequired,
//   currentAnswerStatus: PropTypes.string,
//   score: PropTypes.number
// };

// QuestionCard.defaultProps = {
//   question: 0,
//   currentAnswerStatus: '',
//   score: 0
// };

export default QuestionCard;
