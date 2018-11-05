import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Layout, Col, Row } from 'antd';
import shuffleArray from '../helpers/shuffleArray';
import { fetchQuestions } from '../actionCreators';
import Quiz from './Quiz';
import ResultCard from './ResultCard';
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
      options: [],
      wrongAnswers: []
    };
  }

  componentDidMount() {
    const { handleFetchQuestions } = this.props;
    handleFetchQuestions();
  }

  componentDidUpdate(prevProps) {
    const { currentQuestionIndex, questions } = this.props;

    if (questions.length > 0 && prevProps.questions.length <= 0) {
      this.prepareOptions();
    }
    if (currentQuestionIndex !== prevProps.currentQuestionIndex) {
      this.prepareOptions();
    }
  }

  prepareOptions() {
    const { questions, currentQuestionIndex } = this.props;
    const question = questions[currentQuestionIndex];
    if (question !== undefined) {
      const options = shuffleArray(question.incorrect_answers.concat(question.correct_answer));
      this.setState({
        options
      });
    }
  }

  render() {
    const { options, wrongAnswers } = this.state;
    const { questions, currentQuestionIndex, gameOver, score } = this.props;
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
              {questions.length > 0 ? (
                <>
                  {!gameOver ? (
                    <Quiz
                      next={currentQuestionIndex < questions.length - 1}
                      options={options}
                      question={questions[currentQuestionIndex]}
                      questionNumber={currentQuestionIndex + 1}
                      totalNumberOfQuestions={questions.length}
                    />
                  ) : (
                    <ResultCard wrongAnswers={wrongAnswers} />
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

export const Unwrapped = App;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
