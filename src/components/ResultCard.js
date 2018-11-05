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
  setOutOfTime
} from '../actionCreators';

const ResultCard = props => {
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

ResultCard.propTypes = {
  handleStartOverClick: PropTypes.func.isRequired,
  score: PropTypes.number,
  wrongAnswers: PropTypes.array
};

ResultCard.defaultProps = {
  score: 0,
  wrongAnswers: []
};

const mapStateToProps = state => ({ score: state.score });
const mapDispatchToProps = dispatch => ({
  handleStartOverClick() {
    dispatch(setCurrentQuestionIndex(0));
    dispatch(setGameOver(false));
    dispatch(setCurrentAnswerStatus(''));
    dispatch(fetchQuestions(18));
    dispatch(setDisplayAnswerResponse(false));
    dispatch(setOutOfTime(false));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultCard);
