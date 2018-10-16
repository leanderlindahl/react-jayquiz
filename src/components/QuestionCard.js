import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AnswerOption from './AnswerOption';

export default class QuestionCard extends Component {
  xonAnswerQuestion(chosenOption) {
    
  }

  render() {
    const { question, onAnswerQuestion } = this.props;
    return (
      <div className="question-wrapper">
        <div className="question">
          {question.question}
        </div>
        <div className="answers">
          <ul className="options">
            {question.options.map(o => (
              <AnswerOption option={o} onAnswerQuestion={onAnswerQuestion}/>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

QuestionCard.propTypes = {
  question: PropTypes.object,
  onAnswerQuestion: PropTypes.func
};

QuestionCard.defaultProptypes = {
  question: null,
};
