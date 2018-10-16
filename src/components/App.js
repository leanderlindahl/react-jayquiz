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
      score: 0,
    };

    this.onAnswerQuestion = this.onAnswerQuestion.bind(this);
  }

  componentDidMount() {
    // this.setState({
    //   questions: loadedQuestions.questions,
    // });
  }

  onAnswerQuestion(option) {
    const {
      questions,
      currentQuestion,
      wrongAnswers,
      score,
    } = this.state;

    if (option === questions[currentQuestion].answer) {
      this.setState({
        score: score + 1,
      });
    } else {
      this.setState({
        wrongAnswers: [
          ...wrongAnswers,
          {
            question: questions[currentQuestion].question,
            yourAnswer: option,
            correctAnswer: questions[currentQuestion].answer,
          },
        ],
      });
    }
  }

  render() {
    const { questions, currentQuestion } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          Sigge och Zelda är bäst
        </header>
        <div>
          <h2>En Quiz</h2>
          <QuestionCard 
            question={questions[currentQuestion]}
            onAnswerQuestion={this.onAnswerQuestion}
          />
        </div>
      </div>
    );
  }
}

export default App;
