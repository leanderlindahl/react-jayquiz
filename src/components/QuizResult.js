import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Row, Col } from 'antd';
import {
  fetchQuestions,
  setCurrentAnswerStatus,
  setCurrentQuestionIndex,
  setDisplayAnswerResponse,
  setGameOver,
  setOptionsDisabled,
  setOutOfTime,
  setQuestionNumber,
  setScore,
  setTimedOutAnswers,
  setWrongAnswers
} from '../actionCreators';

export const QuizResult = props => {
  const { handleStartOverClick, score, timedOutAnswers, wrongAnswers } = props;

  return (
    <div>
      <Row>
        <Col span={24}>
          <h1>Results</h1>
          <h3>
            Your score was:
            {` ${score}`}
          </h3>
          <p id="wrong-answers">
            You had
            {` ${wrongAnswers} `}
            wrong answers.
          </p>
          <p id="timed-out-answers">
            You had
            {` ${timedOutAnswers} `}
            timed out answers.
          </p>
          <Button type="primary" onClick={handleStartOverClick} id="start-over-button">
            Start Over
          </Button>
        </Col>
      </Row>
    </div>
  );
};

QuizResult.propTypes = {
  handleStartOverClick: PropTypes.func.isRequired,
  score: PropTypes.number,
  timedOutAnswers: PropTypes.number,
  wrongAnswers: PropTypes.number
};

QuizResult.defaultProps = {
  score: 0,
  timedOutAnswers: 0,
  wrongAnswers: 0
};

const mapStateToProps = state => ({
  preparedQuestions: state.preparedQuestions,
  score: state.score,
  timedOutAnswers: state.timedOutAnswers,
  wrongAnswers: state.wrongAnswers
});

const mapDispatchToProps = dispatch => ({
  handleStartOverClick() {
    dispatch(setCurrentQuestionIndex(0));
    dispatch(setQuestionNumber(1));
    dispatch(setGameOver(false));
    dispatch(setCurrentAnswerStatus(''));
    dispatch(fetchQuestions(18));
    dispatch(setDisplayAnswerResponse(false));
    dispatch(setOptionsDisabled(false));
    dispatch(setOutOfTime(false));
    dispatch(setScore(0));
    dispatch(setTimedOutAnswers(0));
    dispatch(setWrongAnswers(0));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizResult);
