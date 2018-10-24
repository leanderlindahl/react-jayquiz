import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import {
  setCurrentAnswer,
  setCurrentAnswerStatus,
  setDisplayAnswerResponse,
  setScore
} from '../actionCreators';
import QuestionCard from './QuestionCard';
import ResultCard from './ResultCard';
import loadedQuestions from '../questions.json';
import '../styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentQuestionIndex: 0,
      finished: false,
      formattedQuestion: '',
      formattedAnswer: '',
      options: [],
      questions: [],
      wrongAnswers: []
    };
    this.store = store;
  }

  componentDidMount() {
    fetch('https://opentdb.com/api.php?amount=5&category=18&difficulty=easy')
      .then(response => response.json())
      .then(data => this.setState({ questions: data.results }, this.modifyQuestion));
  }

  unescapeHtml = safe => {
    return safe
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");
  };

  loadQuestionsFromDisk = () => {
    this.setState({ questions: loadedQuestions.results });
  };

  handleNextClick = () => {
    const { currentQuestionIndex } = this.state;
    this.store.dispatch(setCurrentAnswerStatus(''), setDisplayAnswerResponse(false));
    this.setState(
      {
        currentQuestionIndex: currentQuestionIndex + 1
      },
      this.modifyQuestion
    );
  };

  handleResultClick = () => {
    this.setState({
      finished: true
    });
  };

  handleAnswerSelected = option => {
    const { questions, currentQuestionIndex, wrongAnswers } = this.state;
    const { score } = this.store.getState();
    const correctAnswer = this.unescapeHtml(questions[currentQuestionIndex].correct_answer);
    if (option === correctAnswer) {
      this.store.dispatch(setScore(score + 1));
      this.store.dispatch(setCurrentAnswerStatus('right'));
    } else {
      this.setState({
        wrongAnswers: [
          ...wrongAnswers,
          {
            question: questions[currentQuestionIndex].question,
            yourAnswer: option,
            correctAnswer: questions[currentQuestionIndex].answer
          }
        ]
      });
      this.store.dispatch(setCurrentAnswerStatus('wrong'));
    }
    this.store.dispatch(setDisplayAnswerResponse(true), setCurrentAnswer(option));
  };

  modifyQuestion() {
    const { questions, currentQuestionIndex } = this.state;
    const question = questions[currentQuestionIndex];
    const newQuestion = this.unescapeHtml(question.question);
    const newOptions = question.incorrect_answers.concat(question.correct_answer);
    const newAnswer = this.unescapeHtml(questions[currentQuestionIndex].correct_answer);
    for (let i = 0; i < newOptions.length; i += 1) {
      newOptions[i] = this.unescapeHtml(newOptions[i]);
    }
    this.setState({
      options: newOptions,
      formattedQuestion: newQuestion,
      formattedAnswer: newAnswer
    });
  }

  render() {
    const {
      currentQuestionIndex,
      finished,
      formattedAnswer,
      formattedQuestion,
      options,
      questions,
      wrongAnswers
    } = this.state;

    return (
      <Provider store={this.store}>
        <div className="App">
          <header className="App-header">A Quiz in ReactJS</header>
          <div>
            {questions.length > 0 ? (
              <>
                {!finished ? (
                  <QuestionCard
                    question={questions[currentQuestionIndex]}
                    handleAnswerSelected={this.handleAnswerSelected}
                    next={currentQuestionIndex < questions.length - 1}
                    handleNextClick={this.handleNextClick}
                    handleResultClick={this.handleResultClick}
                    options={options}
                    formattedQuestion={formattedQuestion}
                    formattedAnswer={formattedAnswer}
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
      </Provider>
    );
  }
}

export default App;
