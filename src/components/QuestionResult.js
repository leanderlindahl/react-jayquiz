import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Divider, Button } from 'antd';
import {
  setCurrentAnswerStatus,
  setCurrentQuestionIndex,
  setDisplayAnswerResponse,
  setGameOver,
  setOptionsDisabled,
  setOutOfTime,
  setQuestionNumber,
  setScore,
  setSelectedOption
} from '../actionCreators';
import unescapeHTML from '../helpers/unescapeHTML';

class QuestionResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      next: true
    };
  }

  handleClickNext = () => {
    const { currentQuestionIndex, handleShowNext, questionNumber } = this.props;
    this.setState({
      disabled: false,
      selected: 1
    });
    handleShowNext(currentQuestionIndex, false, '1', questionNumber);
  };

  render() {
    const { currentAnswerStatus, correctAnswer, handleShowResult, next, outOfTime } = this.props;

    return (
      <>
        <Divider />
        {outOfTime && currentAnswerStatus === '' ? (
          <div className="out-of-time">You're out of time!</div>
        ) : (
          <div className="answer-response">
            Your answer is:
            <b>{` ${currentAnswerStatus}. `}</b>
            {currentAnswerStatus !== 'right' ? (
              <div>
                {`The right answer is: `}
                <b>{unescapeHTML(correctAnswer)}</b>
              </div>
            ) : null}
          </div>
        )}
        <Divider />
        {next ? (
          <Button type="primary" onClick={this.handleClickNext}>
            Next question
          </Button>
        ) : (
          <Button type="primary" onClick={handleShowResult}>
            Result
          </Button>
        )}
      </>
    );
  }
}

QuestionResult.propTypes = {
  currentAnswerStatus: PropTypes.string,
  correctAnswer: PropTypes.string,
  handleShowResult: PropTypes.func.isRequired,
  next: PropTypes.bool,
  outOfTime: PropTypes.bool
};

QuestionResult.defaultProps = {
  currentAnswerStatus: '',
  correctAnswer: '',
  next: true,
  outOfTime: false
};

const mapStateToProps = state => ({
  currentAnswerStatus: state.currentAnswerStatus,
  currentQuestionIndex: state.currentQuestionIndex,
  outOfTime: state.outOfTime,
  questionNumber: state.questionNumber
});

const mapDispatchToProps = dispatch => ({
  // handleAnswerState(score, answerStatus, selected) {
  //   dispatch(setScore(score));
  //   dispatch(setCurrentAnswerStatus(answerStatus));
  //   dispatch(setSelectedOption(selected));
  //   dispatch(setDisplayAnswerResponse(true));
  // },
  handleShowNext(index, disabled, option, questionNumber) {
    dispatch(setCurrentAnswerStatus(''));
    dispatch(setOptionsDisabled(disabled));
    dispatch(setOutOfTime(false));
    dispatch(setSelectedOption(option));
    dispatch(setDisplayAnswerResponse(false));
    dispatch(setCurrentQuestionIndex(index + 1));
    dispatch(setQuestionNumber(questionNumber + 1));
  },
  handleShowResult() {
    dispatch(setGameOver(true));
  },
  handleQuestionNumber(number) {
    dispatch(setQuestionNumber(number));
  }
});
export const Unwrapped = QuestionResult;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionResult);
