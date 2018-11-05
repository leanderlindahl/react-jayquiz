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
  setScore
} from '../actionCreators';

const QuizResult = props => {
  const { score, wrongAnswers, handleStartOverClick } = props;

  return (
    <div>
      <Row>
        <Col span={24}>
          <h1>Results</h1>
          <h3>
            Your score was:
            {` ${score}`}
          </h3>
          <p>
            You had
            {` ${wrongAnswers.length} `}
            wrong answers.
          </p>
          <Button type="primary" onClick={handleStartOverClick}>
            Start Over
          </Button>
        </Col>
      </Row>
    </div>
  );
};

QuizResult.propTypes = {
  handleStartOverClick: PropTypes.func.isRequired,
  preparedQuestions: PropTypes.array,
  score: PropTypes.number,
  wrongAnswers: PropTypes.array
};

QuizResult.defaultProps = {
  preparedQuestions: [],
  score: 0,
  wrongAnswers: []
};

const mapStateToProps = state => ({
  score: state.score,
  preparedQuestions: state.preparedQuestions
});

const mapDispatchToProps = dispatch => ({
  handleStartOverClick() {
    dispatch(setCurrentQuestionIndex(0));
    dispatch(setGameOver(false));
    dispatch(setCurrentAnswerStatus(''));
    dispatch(fetchQuestions(18));
    dispatch(setDisplayAnswerResponse(false));
    dispatch(setOptionsDisabled(false));
    dispatch(setOutOfTime(false));
    dispatch(setScore(0));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizResult);
