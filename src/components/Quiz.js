import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Col, Divider, Radio, Row } from 'antd';
import Timer from './Timer';
import QuestionResult from './QuestionResult';
import {
  setCurrentAnswerStatus,
  setDisplayAnswerResponse,
  setGameOver,
  setOptionsDisabled,
  setOutOfTime,
  setScore,
  setSelectedOption
} from '../actionCreators';
import unescapeHTML from '../helpers/unescapeHTML';

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clickedTen: false,
      disabled: false,
      selected: 1,
      addSecondsAmount: 0,
      addSecondsEnabled: false
    };

    this.handlePlusTen = this.handlePlusTen.bind(this);
  }

  componentDidUpdate(prevState) {
    const { addSecondsEnabled, clickedTen } = this.state;

    if (clickedTen && addSecondsEnabled) {
      this.setState({
        addSecondsEnabled: false,
        addSecondsAmount: 0
      });
    }
  }

  handleSelectedAnswer = event => {
    const { handleAnswerState, score, question } = this.props;
    const answer = unescapeHTML(question.correct_answer);
    const selectedOption = unescapeHTML(event.target.value);

    this.setState({
      disabled: true
    });

    if (selectedOption === answer) {
      handleAnswerState(score + 1, 'right', selectedOption, true);
    } else {
      handleAnswerState(score, 'wrong', selectedOption, true);
    }
  };

  handlePlusTen(event) {
    event.target.disabled = true;
    this.setState({
      clickedTen: true,
      addSecondsAmount: 10,
      addSecondsEnabled: true
    });
  }

  render() {
    const {
      currentQuestionIndex,
      displayAnswerResponse,
      handleOutOfTime,
      next,
      options,
      optionsDisabled,
      outOfTime,
      question,
      questionNumber,
      selectedOption,
      totalNumberOfQuestions
    } = this.props;

    const { addSecondsAmount, clickedTen } = this.state;

    const RadioGroup = Radio.Group;

    const radioStyle = {
      display: 'block',
      height: '40px',
      lineHeight: '40px'
    };

    return (
      <div className="question-wrapper">
        <Row>
          <Col span={12}>
            <Timer
              addSecondsAmount={addSecondsAmount}
              onComplete={handleOutOfTime}
              reset={currentQuestionIndex.toString()}
              running={!optionsDisabled}
            />
          </Col>
          <Col span={12}>
            <Button type="primary" onClick={this.handlePlusTen} disabled={outOfTime && !clickedTen}>
              +10
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Divider orientation="left">
              {`Question ${questionNumber}/${totalNumberOfQuestions}`}
            </Divider>
            <div className="question">{unescapeHTML(question.question)}</div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div className="answers">
              <RadioGroup
                onChange={this.handleSelectedAnswer}
                size="large"
                value={selectedOption}
                buttonStyle="solid"
                disabled={optionsDisabled}
              >
                {options.map(option => (
                  <Radio value={option} style={radioStyle} key={option}>
                    {unescapeHTML(option)}
                  </Radio>
                ))}
              </RadioGroup>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div className="actions">
              {displayAnswerResponse ? (
                <QuestionResult correctAnswer={question.correct_answer} next={next} />
              ) : null}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

Quiz.propTypes = {
  currentAnswerStatus: PropTypes.string,
  currentQuestionIndex: PropTypes.number,
  displayAnswerResponse: PropTypes.bool,
  handleAnswerState: PropTypes.func.isRequired,
  handleOutOfTime: PropTypes.func.isRequired,
  handleShowResult: PropTypes.func.isRequired,
  next: PropTypes.bool,
  options: PropTypes.array,
  score: PropTypes.number,
  question: PropTypes.object.isRequired,
  questionNumber: PropTypes.number
};

Quiz.defaultProps = {
  currentAnswerStatus: '',
  currentQuestionIndex: 0,
  displayAnswerResponse: false,
  score: 0,
  questionNumber: 1
};

const mapStateToProps = state => ({
  currentAnswerStatus: state.currentAnswerStatus,
  currentQuestionIndex: state.currentQuestionIndex,
  displayAnswerResponse: state.displayAnswerResponse,
  optionsDisabled: state.optionsDisabled,
  outOfTime: state.outOfTime,
  score: state.score,
  selectedOption: state.selectedOption
});

const mapDispatchToProps = dispatch => ({
  handleAnswerState(score, answerStatus, selectedOption, optionsDisabled) {
    dispatch(setSelectedOption(selectedOption));
    dispatch(setScore(score));
    dispatch(setCurrentAnswerStatus(answerStatus));
    dispatch(setDisplayAnswerResponse(true));
    dispatch(setOptionsDisabled(optionsDisabled));
    dispatch(setOutOfTime(true));
  },
  handleShowResult() {
    dispatch(setGameOver(true));
  },
  handleOutOfTime() {
    dispatch(setOutOfTime(true));
    dispatch(setOptionsDisabled(true));
    dispatch(setDisplayAnswerResponse(true));
  }
});
export const Unwrapped = Quiz;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz);
