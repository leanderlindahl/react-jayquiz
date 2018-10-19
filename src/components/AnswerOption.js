import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AnswerOption extends Component {
  handleRadioChange = () => {
    this.setState({ checked: true });
  };

  render() {
    const { option, handleAnswerSelected, currentAnswerStatus, currentAnswer } = this.props;
    return (
      <li className={`answerOption ${currentAnswerStatus !== '' ? 'gray' : null}`}>
        <input
          type="radio"
          className="radio-custom-button"
          name="radio-group"
          id={option}
          value={option}
          onClick={evt => handleAnswerSelected(evt.target.value)}
          disabled={currentAnswerStatus}
          checked={currentAnswer === option}
          onChange={this.handleRadioChange}
        />
        <label htmlFor={option} className="radio-custom-label">
          {option}
        </label>
      </li>
    );
  }
}

AnswerOption.propTypes = {
  currentAnswerStatus: PropTypes.string.isRequired,
  handleAnswerSelected: PropTypes.func.isRequired,
  option: PropTypes.string.isRequired
};

export default AnswerOption;
