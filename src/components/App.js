import React, { Component } from 'react';
import '../styles/App.css';
import loadedQuestions from '../questions.json';
import QuestionCard from './QuestionCard';
import ResultCard from './ResultCard';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      currentQuestionIndex: 0,
      wrongAnswers: [],
      displayAnswerResponse: false,
      score: 0,
      currentAnswerStatus: '',
      finished: false,
      currentAnswer: '',
      options: [],
      formattedQuestion: '',
      formattedAnswer: 'bu'
    };
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
    this.setState(
      {
        currentQuestionIndex: currentQuestionIndex + 1,
        currentAnswerStatus: '',
        displayAnswerResponse: false
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
    const { questions, currentQuestionIndex, wrongAnswers, score } = this.state;
    const correctAnswer = this.unescapeHtml(questions[currentQuestionIndex].correct_answer);
    if (option === correctAnswer) {
      this.setState({
        score: score + 1,
        currentAnswerStatus: 'right'
      });
    } else {
      this.setState({
        wrongAnswers: [
          ...wrongAnswers,
          {
            question: questions[currentQuestionIndex].question,
            yourAnswer: option,
            correctAnswer: questions[currentQuestionIndex].answer
          }
        ],
        currentAnswerStatus: 'wrong'
      });
    }
    this.setState({
      displayAnswerResponse: true,
      currentAnswer: option
    });
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
      finished,
      questions,
      currentQuestionIndex,
      displayAnswerResponse,
      currentAnswerStatus,
      score,
      wrongAnswers,
      currentAnswer,
      options,
      formattedQuestion,
      formattedAnswer
    } = this.state;

    return (
      <div className="App">
        <header className="App-header">A Quiz in ReactJS</header>
        <div>
          {questions.length > 0 ? (
            <>
              {!finished ? (
                <QuestionCard
                  question={questions[currentQuestionIndex]}
                  handleAnswerSelected={this.handleAnswerSelected}
                  currentAnswerStatus={currentAnswerStatus}
                  score={score}
                  displayAnswerResponse={displayAnswerResponse}
                  next={currentQuestionIndex < questions.length - 1}
                  handleNextClick={this.handleNextClick}
                  handleResultClick={this.handleResultClick}
                  currentAnswer={currentAnswer}
                  options={options}
                  formattedQuestion={formattedQuestion}
                  formattedAnswer={formattedAnswer}
                  questionNumber={currentQuestionIndex + 1}
                />
              ) : (
                <ResultCard score={score} wrongAnswers={wrongAnswers} />
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

export default App;
