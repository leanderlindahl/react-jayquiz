import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { fetchQuestions } from '../actionCreators';
import QuestionCard from './QuestionCard';
import ResultCard from './ResultCard';
import loadedQuestions from '../questions.json';
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

  // loadQuestionsFromDisk = () => {
  //   this.setState({ questions: loadedQuestions.results });
  // };

  // loadQuestionsFromAPI = () => {
  //   fetch('https://opentdb.com/api.php?amount=5&category=18&difficulty=easy')
  //     .then(response => {
  //       if (response.status !== 200) {
  //         // load from disk
  //         this.loadQuestionsFromDisk();
  //       } else {
  //         return response;
  //       }
  //     })
  //     .then(response => response.json())
  //     .then(data => this.setState({ questions: data.results }));
  // };

  render() {
    const { wrongAnswers } = this.state;
    const { questions, currentQuestionIndex, finished } = this.props;
    return (
      <div className="App">
        <header className="App-header">A Quiz in ReactJS</header>
        <div>
          {questions.length > 0 ? (
            <>
              {!finished ? (
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
  finished: PropTypes.bool,
  handleFetchQuestions: PropTypes.func.isRequired,
  questions: PropTypes.array
};

App.defaultProps = {
  currentQuestionIndex: 0,
  finished: false,
  questions: []
};

const mapDispatchToProps = dispatch => ({
  handleFetchQuestions() {
    dispatch(fetchQuestions(18));
  }
});
const mapStateToProps = state => ({
  currentQuestionIndex: state.currentQuestionIndex,
  finished: state.finished,
  score: state.score,
  questions: state.questions.items
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
