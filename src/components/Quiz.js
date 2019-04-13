import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Col, Divider, Radio, Row } from 'antd';
import Timer from './Timer';
import QuestionResult from './QuestionResult';
import {
  setCurrentAnswerStatus,
  setDisplayAnswerResponse,
  setOptionsDisabled,
  setOutOfTime,
  setScore,
  setSelectedOption,
  setTimedOutAnswers,
  setUsedQuestions,
  setWrongAnswers
} from '../actionCreators';
import unescapeHTML from '../helpers/unescapeHTML';

export class Quiz extends Component {
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
    const { handleAnswerState, score, question, usedQuestions, wrongAnswers } = this.props;
    const answer = unescapeHTML(question.correct_answer);
    const selectedOption = unescapeHTML(event.target.value);
    const addUsedQuestions = [...usedQuestions, question.question];

    if (selectedOption === answer) {
      return handleAnswerState(
        score + 1,
        'right',
        selectedOption,
        true,
        addUsedQuestions,
        wrongAnswers
      );
    }
    return handleAnswerState(
      score,
      'wrong',
      selectedOption,
      true,
      addUsedQuestions,
      wrongAnswers + 1
    );
  };

  handleFiftyFifty(event) {
    event.preventDefault();
    const { options, outOfTime, question } = this.props;
    if (!outOfTime && options.length > 3) {
      const { disabledOptions } = this.state;

      const numOptionsToRemove = (options.length / 2) % options.length;
      const wrongAnswers = question.incorrect_answers;

      let numOptionsRemoved = 0;
      wrongAnswers.forEach(item => {
        if (numOptionsRemoved < numOptionsToRemove) {
          if (!disabledOptions.includes(item)) {
            disabledOptions.push(item);
            numOptionsRemoved += 1;
          }
        }
      });

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
    const { question, usedQuestions, submitOutOfTime, timedOutAnswers } = this.props;
    const addUsedQuestions = [...usedQuestions, question.question];
    submitOutOfTime(addUsedQuestions, timedOutAnswers + 1);
  }

  render() {
    const {
      currentQuestionIndex,
      displayAnswerResponse,
      options,
      optionsDisabled,
      question,
      questionNumber,
      questionsPerRound,
      selectedOption
    } = this.props;

    const next = questionNumber < questionsPerRound;

    const { addSecondsAmount, clickedTen, disabledOptions, fiftyFifty } = this.state;

    const RadioGroup = Radio.Group;

    const questionWrapperStyle = {
      padding: '20px'
    };

    const radioStyle = {
      display: 'block',
      height: '40px',
      lineHeight: '40px'
    };

    return (
      <div className="question-wrapper" style={questionWrapperStyle}>
        <Row type="flex" align="middle">
          <Col span={12}>
            <Timer
              addSecondsAmount={addSecondsAmount}
              onComplete={this.handleOutOfTime}
              reset={currentQuestionIndex.toString()}
              running={!optionsDisabled}
              id="timer-component"
            />
          </Col>
          <Col span={12} className="lifelines">
            <Button
              type="primary"
              onClick={this.handlePlusTen}
              disabled={clickedTen}
              ghost
              className="lifeline-button"
              id="plus-ten-button"
            >
              +10 seconds
            </Button>
            <Button
              type="primary"
              onClick={this.handleFiftyFifty}
              disabled={fiftyFifty}
              ghost
              className="lifeline-button"
              id="fifty-fifty-button"
            >
              50/50
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Divider orientation="left">
              {`Question ${questionNumber}/${questionsPerRound}`}
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
  currentQuestionIndex: PropTypes.number,
  displayAnswerResponse: PropTypes.bool,
  handleAnswerState: PropTypes.func.isRequired,
  options: PropTypes.array,
  optionsDisabled: PropTypes.bool,
  outOfTime: PropTypes.bool,
  score: PropTypes.number,
  selectedOption: PropTypes.string,
  question: PropTypes.object.isRequired,
  questionNumber: PropTypes.number,
  questionsPerRound: PropTypes.number
};

Quiz.defaultProps = {
  currentQuestionIndex: 0,
  displayAnswerResponse: false,
  options: [],
  optionsDisabled: false,
  outOfTime: false,
  score: 0,
  selectedOption: '',
  questionNumber: 1,
  questionsPerRound: 10
};

const mapStateToProps = state => ({
  currentQuestionIndex: state.currentQuestionIndex,
  displayAnswerResponse: state.displayAnswerResponse,
  optionsDisabled: state.optionsDisabled,
  outOfTime: state.outOfTime,
  questionNumber: state.questionNumber,
  questionsPerRound: state.questionsPerRound,
  score: state.score,
  selectedOption: state.selectedOption,
  timedOutAnswers: state.timedOutAnswers,
  usedQuestions: state.usedQuestions,
  wrongAnswers: state.wrongAnswers
});

const mapDispatchToProps = dispatch => ({
  handleAnswerState(
    score,
    answerStatus,
    selectedOption,
    optionsDisabled,
    usedQuestions,
    wrongAnswers
  ) {
    dispatch(setSelectedOption(selectedOption));
    dispatch(setScore(score));
    dispatch(setWrongAnswers(wrongAnswers));
    dispatch(setCurrentAnswerStatus(answerStatus));
    dispatch(setDisplayAnswerResponse(true));
    dispatch(setOptionsDisabled(optionsDisabled));
    dispatch(setOutOfTime(true));
    dispatch(setUsedQuestions(usedQuestions));
  },
  submitOutOfTime(usedQuestions, timedOutAnswers) {
    dispatch(setOutOfTime(true));
    dispatch(setOptionsDisabled(true));
    dispatch(setDisplayAnswerResponse(true));
    dispatch(setUsedQuestions(usedQuestions));
    dispatch(setTimedOutAnswers(timedOutAnswers));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz);
