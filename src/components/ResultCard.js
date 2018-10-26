import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setCurrentQuestionIndex, setFinished } from '../actionCreators';

const ResultCard = props => {
  const { score, wrongAnswers, handleStartOverClick } = props;

  return (
    <div>
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
      <button type="button" onClick={handleStartOverClick}>
        Start Over
      </button>
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
    dispatch(setFinished(false));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultCard);
