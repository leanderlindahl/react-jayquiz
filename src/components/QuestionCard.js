import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AnswerOption from './AnswerOption';

export default class QuestionCard extends Component {
  xonAnswerQuestion(chosenOption) {}

  render() {
    const { question, handleAnswerSelected, currentAnswerStatus } = this.props;
    return (
      <div className="question-wrapper">
        <div className="question">{question.question}</div>
        <div className="answers">
          <ul className="options">
            {question.options.map(option => (
              <AnswerOption
                option={option}
                handleAnswerSelected={handleAnswerSelected}
                currentAnswerStatus={currentAnswerStatus}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

QuestionCard.propTypes = {
  question: PropTypes.object,
  handleAnswerSelected: PropTypes.func
};

QuestionCard.defaultProptypes = {
  question: null
};
