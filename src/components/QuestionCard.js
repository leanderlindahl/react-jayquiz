import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  setCurrentAnswer,
  setCurrentAnswerStatus,
  setCurrentQuestionIndex,
  setDisplayAnswerResponse,
  setGameOver,
  setScore
} from '../actionCreators';
import AnswerOption from './AnswerOption';
import unescapeHTML from '../helpers/unescapeHTML';
import shuffleArray from '../helpers/shuffleArray';

class QuestionCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: []
    };
  }

  componentDidMount() {
    this.prepareOptions();
  }

  componentDidUpdate(prevProps) {
    const { question } = this.props;
    if (question !== prevProps.question) {
      this.prepareOptions();
    }
  }

  handleSelectedAnswer = event => {
    const { handleAnswerState, score, question } = this.props;
    const answer = unescapeHTML(question.correct_answer);
    const selected = unescapeHTML(event.target.value);

    if (selected === answer) {
      handleAnswerState(score + 1, 'right', selected);
    } else {
      handleAnswerState(score, 'wrong', selected);
    }
  };

  handleClickNext = () => {
    const { currentQuestionIndex, handleShowNext } = this.props;
    handleShowNext(currentQuestionIndex);
  };

  prepareOptions() {
    const { question } = this.props;
    const options = shuffleArray(question.incorrect_answers.concat(question.correct_answer));
    this.setState({
      options
    });
  }

  render() {
    const {
      currentAnswerStatus,
      displayAnswerResponse,
      handleShowResult,
      next,
      score,
      question,
      questionNumber
    } = this.props;

    const { options } = this.state;

    return (
      <div className="question-wrapper">
        <h3 className="score">
          Question
          {` ${questionNumber} - `}
          Score:
          {` ${score}`}
        </h3>
        <div className="question">{unescapeHTML(question.question)}</div>
        <div className="answers">
          <ul className="options">
            {options.map(option => (
              <AnswerOption
                key={option}
                option={option}
                onAnswerSelected={this.handleSelectedAnswer}
              />
            ))}
          </ul>
        </div>
        ======================================================
        <div className="actions">
          {displayAnswerResponse ? (
            <>
              <div>
                The answer was:
                {` ${currentAnswerStatus}
                The correct answer is ${unescapeHTML(question.correct_answer)}`}
              </div>
              {next ? (
                <button type="button" onClick={this.handleClickNext}>
                  Next question
                </button>
              ) : (
                <button type="button" onClick={handleShowResult}>
                  Result
                </button>
              )}
            </>
          ) : null}
        </div>
      </div>
    );
  }
}

QuestionCard.propTypes = {
  currentAnswerStatus: PropTypes.string,
  currentQuestionIndex: PropTypes.number,
  displayAnswerResponse: PropTypes.bool,
  handleAnswerState: PropTypes.func.isRequired,
  handleShowNext: PropTypes.func.isRequired,
  handleShowResult: PropTypes.func.isRequired,
  next: PropTypes.bool,
  score: PropTypes.number,
  question: PropTypes.object.isRequired,
  questionNumber: PropTypes.number
};

QuestionCard.defaultProps = {
  currentAnswerStatus: '',
  currentQuestionIndex: 0,
  displayAnswerResponse: false,
  next: false,
  score: 0,
  questionNumber: 1
};

const mapStateToProps = state => ({
  currentAnswerStatus: state.currentAnswerStatus,
  currentQuestionIndex: state.currentQuestionIndex,
  displayAnswerResponse: state.displayAnswerResponse,
  score: state.score
});

const mapDispatchToProps = dispatch => ({
  handleAnswerState(score, answerStatus, selected) {
    dispatch(setScore(score));
    dispatch(setCurrentAnswerStatus(answerStatus));
    dispatch(setCurrentAnswer(selected));
    dispatch(setDisplayAnswerResponse(true));
  },
  handleShowNext(index) {
    dispatch(setCurrentAnswerStatus(''));
    dispatch(setDisplayAnswerResponse(false));
    dispatch(setCurrentQuestionIndex(index + 1));
  },
  handleShowResult() {
    dispatch(setGameOver(true));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionCard);
