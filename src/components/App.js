import React, { Component } from 'react';
import logo from '../logo.svg';
import '../styles/App.css';
import loadedQuestions from '../questions.json';
import QuestionCard from './QuestionCard';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: loadedQuestions.questions,
      currentQuestion: 0,
      wrongAnswers: [],
      displayAnswerResponse: false,
      score: 0,
      currentAnswerStatus: ''
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  componentDidMount() {
    // this.setState({
    //   questions: loadedQuestions.questions,
    // });
  }

  handleNextClick = () => {
    const { currentQuestion } = this.state;
    this.setState({
      currentQuestion: currentQuestion + 1,
      currentAnswerStatus: ''
    });
  };

  handleAnswerSelected(option) {
    const { questions, currentQuestion, wrongAnswers, score } = this.state;

    if (option === questions[currentQuestion].answer) {
      this.setState({
        score: score + 1,
        currentAnswerStatus: 'right'
      });
    } else {
      this.setState({
        wrongAnswers: [
          ...wrongAnswers,
          {
            question: questions[currentQuestion].question,
            yourAnswer: option,
            correctAnswer: questions[currentQuestion].answer
          }
        ],
        currentAnswerStatus: 'wrong'
      });
    }
    this.setState({
      displayAnswerResponse: true
    });
  }

  render() {
    const {
      questions,
      currentQuestion,
      displayAnswerResponse,
      currentAnswerStatus,
      score
    } = this.state;

    return (
      <div className="App">
        <header className="App-header">A Quiz in ReactJS</header>
        <div>
          <h3 className="score">Score: {score}</h3>
          <QuestionCard
            question={questions[currentQuestion]}
            handleAnswerSelected={this.handleAnswerSelected}
            currentAnswerStatus={currentAnswerStatus}
          />
          {displayAnswerResponse ? (
            <>
              <div>{currentAnswerStatus}</div>
              {currentQuestion < questions.length - 1 ? (
                <button type="button" onClick={this.handleNextClick}>
                  Next question
                </button>
              ) : (
                <button type="button">Result</button>
              )}
            </>
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;
