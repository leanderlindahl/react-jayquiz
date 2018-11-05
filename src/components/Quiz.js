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
  setSelectedOption,
  setUsedQuestions
} from '../actionCreators';
import unescapeHTML from '../helpers/unescapeHTML';

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addSecondsAmount: 0,
      addSecondsEnabled: false,
      clickedTen: false,
      disabledOptions: [],
      fiftyFifty: false
    };

    this.handleFiftyFifty = this.handleFiftyFifty.bind(this);
    this.handlePlusTen = this.handlePlusTen.bind(this);
    this.handleOutOfTime = this.handleOutOfTime.bind(this);
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
    const { handleAnswerState, score, question, usedQuestions } = this.props;
    const answer = unescapeHTML(question.correct_answer);
    const selectedOption = unescapeHTML(event.target.value);
    const addUsedQuestions = [...usedQuestions, question.question];

    if (selectedOption === answer) {
      handleAnswerState(score + 1, 'right', selectedOption, true, addUsedQuestions);
    } else {
      handleAnswerState(score, 'wrong', selectedOption, true, addUsedQuestions);
    }
  };

  handleFiftyFifty(event) {
    event.preventDefault();
    const { options, outOfTime, question } = this.props;
    if (!outOfTime) {
      event.target.disabled = true;
      let { disabledOptions } = this.state;

      const numOptions = options.length;
      const numOptionsToRemove = (numOptions / 2) % numOptions;
      const wrongAnswers = question.incorrect_answers;

      for (let i = 0; i < numOptionsToRemove; i++) {
        disabledOptions = [...disabledOptions, wrongAnswers[i]];
      }
      this.setState({
        disabledOptions,
        fiftyFifty: true
      });
    }
  }

  handlePlusTen(event) {
    event.preventDefault();
    const { outOfTime } = this.props;
    if (!outOfTime) {
      event.target.disabled = true;
      this.setState({
        clickedTen: true,
        addSecondsAmount: 10,
        addSecondsEnabled: true
      });
    }
  }

  handleOutOfTime() {
    const { question, usedQuestions, submitOutOfTime } = this.props;
    const addUsedQuestions = [...usedQuestions, question.question];
    submitOutOfTime(addUsedQuestions);
  }

  render() {
    const {
      currentQuestionIndex,
      displayAnswerResponse,
      next,
      options,
      optionsDisabled,
      question,
      questionNumber,
      selectedOption,
      totalNumberOfQuestions
    } = this.props;

    const { addSecondsAmount, clickedTen, disabledOptions, fiftyFifty } = this.state;

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
              onComplete={this.handleOutOfTime}
              reset={currentQuestionIndex.toString()}
              running={!optionsDisabled}
            />
          </Col>
          <Col span={6}>
            <Button type="primary" onClick={this.handlePlusTen} disabled={clickedTen}>
              +10
            </Button>
          </Col>
          <Col span={6}>
            <Button type="primary" onClick={this.handleFiftyFifty} disabled={fiftyFifty}>
              50/50
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
                  <Radio
                    value={option}
                    style={radioStyle}
                    key={option}
                    disabled={disabledOptions.indexOf(option) > -1}
                  >
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
  handleShowResult: PropTypes.func.isRequired,
  next: PropTypes.bool,
  options: PropTypes.array,
  outOfTime: PropTypes.bool,
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
  selectedOption: state.selectedOption,
  usedQuestions: state.usedQuestions
});

const mapDispatchToProps = dispatch => ({
  handleAnswerState(score, answerStatus, selectedOption, optionsDisabled, usedQuestions) {
    dispatch(setSelectedOption(selectedOption));
    dispatch(setScore(score));
    dispatch(setCurrentAnswerStatus(answerStatus));
    dispatch(setDisplayAnswerResponse(true));
    dispatch(setOptionsDisabled(optionsDisabled));
    dispatch(setOutOfTime(true));
    dispatch(setUsedQuestions(usedQuestions));
  },
  handleShowResult() {
    dispatch(setGameOver(true));
  },
  submitOutOfTime(usedQuestions) {
    dispatch(setOutOfTime(true));
    dispatch(setOptionsDisabled(true));
    dispatch(setDisplayAnswerResponse(true));
    dispatch(setUsedQuestions(usedQuestions));
  }
});
export const Unwrapped = Quiz;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz);
