import React from 'react';
import PropTypes from 'prop-types';

const ResultCard = props => {
  const { score, wrongAnswers } = props;

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
      <button>Start Over</button>
    </div>
  );
};

ResultCard.propTypes = {
  score: PropTypes.number,
  wrongAnswers: PropTypes.array
};

ResultCard.defaultProps = {
  score: 0,
  wrongAnswers: []
};

export default ResultCard;
