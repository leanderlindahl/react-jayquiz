import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Layout, Col, Row } from 'antd';
import shuffleArray from '../helpers/shuffleArray';
import {
  fetchQuestions,
  setCurrentQuestionIndex,
  setPreparedQuestions,
  setUsedQuestions
} from '../actionCreators';
import Quiz from './Quiz';
import QuizResult from './QuizResult';
import '../styles/App.css';

const LogoDiv = styled.div`
  width: 120px;
  height: 31px;
  line-height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
`;
const ScoreDiv = styled.div`
  width: 120px;
  height: 31px;
  line-height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: right;
  color: white;
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: []
    };
  }

  componentDidMount() {
    const { handleFetchQuestions } = this.props;
    handleFetchQuestions();
  }

  componentDidUpdate(prevProps) {
    const { currentQuestionIndex, questions, preparedQuestions } = this.props;

    if (questions.length > 0 && prevProps.questions.length <= 0) {
      this.prepareQuestions();
    }
    if (preparedQuestions.length > 0 && prevProps.preparedQuestions.length <= 0) {
      this.prepareSingleQuestion();
    }
    if (currentQuestionIndex !== prevProps.currentQuestionIndex) {
      this.prepareSingleQuestion();
    }
  }

  prepareQuestions() {
    const { handlePreparedQuestions, questions } = this.props;
    handlePreparedQuestions(shuffleArray(questions));
    this.prepareSingleQuestion();
  }

  prepareSingleQuestion() {
    const {
      currentQuestionIndex,
      increaseQuestionIndex,
      preparedQuestions,
      resetUsedQuestions,
      shuffleQuestions,
      usedQuestions
    } = this.props;
    if (preparedQuestions.length === usedQuestions.length) {
      if (usedQuestions.length > 0) {
        shuffleQuestions(shuffleArray(preparedQuestions));
      }
      resetUsedQuestions();
    }

    const question = preparedQuestions[currentQuestionIndex];

    if (question !== undefined) {
      if (usedQuestions.indexOf(question.question) > -1) {
        increaseQuestionIndex(currentQuestionIndex + 1);
      }
      const options = shuffleArray(question.incorrect_answers.concat(question.correct_answer));
      this.setState({
        options
      });
    }
  }

  render() {
    const { options } = this.state;
    const {
      currentQuestionIndex,
      gameOver,
      preparedQuestions,
      score,
      questionNumber,
      questionsPerRound
    } = this.props;
    const { Content, Header, Footer } = Layout;
    return (
      <div className="App">
        <Layout className="layout">
          <Header>
            <Row>
              <Col span={12}>
                <LogoDiv className="logo">JayQuiz</LogoDiv>
              </Col>
              <Col span={12}>
                <ScoreDiv>{`Score: ${score}`}</ScoreDiv>
              </Col>
            </Row>
          </Header>
          <Content style={{ padding: '0 24px', minHeight: 280, marginTop: '20px' }}>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
              {preparedQuestions.length > 0 ? (
                <>
                  {!gameOver ? (
                    <Quiz
                      next={questionNumber < questionsPerRound}
                      options={options}
                      question={preparedQuestions[currentQuestionIndex]}
                      questionNumber={questionNumber}
                      totalNumberOfQuestions={questionsPerRound}
                    />
                  ) : (
                    <QuizResult />
                  )}
                </>
              ) : (
                <span>Loading...</span>
              )}
            </div>
          </Content>
          <Footer>{`JayQuiz ${new Date().getFullYear()}`}</Footer>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentQuestionIndex: state.currentQuestionIndex,
  gameOver: state.gameOver,
  preparedQuestions: state.preparedQuestions,
  score: state.score,
  questions: state.questions.items,
  questionNumber: state.questionNumber,
  questionsPerRound: state.questionsPerRound,
  usedQuestions: state.usedQuestions
});

const mapDispatchToProps = dispatch => ({
  handleFetchQuestions() {
    dispatch(fetchQuestions(18)); // 18 = "Science: Computers"
  },
  handlePreparedQuestions(preparedQuestions) {
    dispatch(setPreparedQuestions(preparedQuestions));
  },
  increaseQuestionIndex(index) {
    dispatch(setCurrentQuestionIndex(index));
  },
  resetUsedQuestions() {
    dispatch(setUsedQuestions([]));
  },
  shuffleQuestions(questions) {
    dispatch(setPreparedQuestions(questions));
  }
});

App.propTypes = {
  currentQuestionIndex: PropTypes.number,
  gameOver: PropTypes.bool,
  handleFetchQuestions: PropTypes.func.isRequired,
  handlePreparedQuestions: PropTypes.func.isRequired,
  increaseQuestionIndex: PropTypes.func.isRequired,
  preparedQuestions: PropTypes.array,
  questions: PropTypes.array,
  questionNumber: PropTypes.number,
  questionsPerRound: PropTypes.number,
  usedQuestions: PropTypes.array
};

App.defaultProps = {
  currentQuestionIndex: 0,
  gameOver: false,
  preparedQuestions: [],
  questions: [],
  questionNumber: 1,
  questionsPerRound: 10,
  usedQuestions: []
};

export const Unwrapped = App;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
