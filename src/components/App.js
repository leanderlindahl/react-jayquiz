import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestions } from '../actionCreators';
import QuestionCard from './QuestionCard';
import ResultCard from './ResultCard';
import '../styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      wrongAnswers: []
    };
  }

  componentDidMount() {
    const { handleFetchQuestions } = this.props;
    handleFetchQuestions();
  }

  render() {
    const { wrongAnswers } = this.state;
    const { questions, currentQuestionIndex, gameOver } = this.props;
    return (
      <div className="App">
        <header className="App-header">A Quiz in ReactJS</header>
        <div>
          {questions.length > 0 ? (
            <>
              {!gameOver ? (
                <QuestionCard
                  next={currentQuestionIndex < questions.length - 1}
                  question={questions[currentQuestionIndex]}
                  questionNumber={currentQuestionIndex + 1}
                />
              ) : (
                <ResultCard wrongAnswers={wrongAnswers} />
              )}
            </>
          ) : (
            <span>Loading...</span>
          )}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  currentQuestionIndex: PropTypes.number,
  gameOver: PropTypes.bool,
  handleFetchQuestions: PropTypes.func.isRequired,
  questions: PropTypes.array
};

App.defaultProps = {
  currentQuestionIndex: 0,
  gameOver: false,
  questions: []
};

const mapDispatchToProps = dispatch => ({
  handleFetchQuestions() {
    dispatch(fetchQuestions(18)); // 18 = "Science: Computers"
  }
});
const mapStateToProps = state => ({
  currentQuestionIndex: state.currentQuestionIndex,
  gameOver: state.gameOver,
  score: state.score,
  questions: state.questions.items
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
