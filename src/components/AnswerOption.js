import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Radio, Input } from 'antd';
import unescapeHTML from '../helpers/unescapeHTML';

const RadioGroup = Radio.Group;

class AnswerOption extends Component {
  handleRadioChange = () => {
    this.setState({ checked: true });
  };

  render() {
    const { option, onAnswerSelected, currentAnswerStatus, currentAnswer } = this.props;
    return (
      <li className={`answerOption ${currentAnswerStatus !== '' ? 'xgray' : null}`}>
        <Radio
          id={option}
          value={unescapeHTML(option)}
          onClick={onAnswerSelected}
          disabled={!currentAnswerStatus === ''}
          checked={currentAnswer === option}
          onChange={this.handleRadioChange}
        />
        <label htmlFor={option} className="radio-custom-label">
          {unescapeHTML(option)}
        </label>
      </li>
    );
  }
}

AnswerOption.propTypes = {
  currentAnswer: PropTypes.string,
  currentAnswerStatus: PropTypes.string.isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  option: PropTypes.string.isRequired
};

AnswerOption.defaultProps = {
  currentAnswer: ''
};

const mapStateToProps = state => ({
  currentAnswer: state.currentAnswer,
  currentAnswerStatus: state.currentAnswerStatus
});

export default connect(mapStateToProps)(AnswerOption);
