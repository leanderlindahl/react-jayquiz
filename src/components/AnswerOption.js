import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AnswerOption extends Component {

  aFunction() {
    this.something = '';
  }

  render() {
    const { option, onAnswerQuestion } = this.props;

    return (
      <li className="answerOption">
        <input
          type="radio"
          className="radio-custom-button"
          name="radio-group"
          id={option}
          value={option}
          onClick={evt => (onAnswerQuestion(evt.target.value))}
        />
        <label htmlFor={option} className="radio-custom-label">{option}</label>
      </li>
    );
  }
}

AnswerOption.propTypes = {

};

export default AnswerOption;
