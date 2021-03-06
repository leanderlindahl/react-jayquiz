import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import styled from 'react-emotion';
import shuffleArray from '../../helpers/shuffleArray';
import {
  fetchQuestions,
  setCurrentQuestionIndex,
  setPreparedQuestions,
  setUsedQuestions,
  setOptions
} from '../../actionCreators';
import HeaderComponent from '../HeaderComponent';
import Quiz from '../Quiz';
import QuizResult from '../QuizResult';

const AppContainer = styled('div')`
  text-align: center;

  .content-container {
    padding: 0 24px;
    min-height: 280;
    margin-top: 20px;
  }
  .content-container-inner-wrapper {
    background: #fff;
    padding: 24;
    min-height: 280;
  }
  .lifelines {
    text-align: right;
  }
  .lifeline-button {
    margin-left: 5px;
  }
`;

export class App extends PureComponent {
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
      handleSetOptions,
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

    if (!question) {
      return;
    }

    if (usedQuestions.indexOf(question.question) > -1) {
      increaseQuestionIndex(currentQuestionIndex + 1);
    }

    const options = shuffleArray(question.incorrect_answers.concat(question.correct_answer));
    handleSetOptions(options);
  }

  render() {
    const { currentQuestionIndex, gameOver, options, preparedQuestions } = this.props;
    const { Content, Footer } = Layout;
    return (
      <AppContainer className="App">
        <Layout className="layout">
          <HeaderComponent />
          <Content className="content-container">
            <div className="content-container-inner-wrapper">
              {preparedQuestions.length > 0 ? (
                <>
                  {!gameOver ? (
                    <Quiz options={options} question={preparedQuestions[currentQuestionIndex]} />
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
      </AppContainer>
    );
  }
}

const mapStateToProps = state => ({
  currentQuestionIndex: state.currentQuestionIndex,
  gameOver: state.gameOver,
  options: state.options,
  preparedQuestions: state.preparedQuestions,
  questions: state.questions.items,
  usedQuestions: state.usedQuestions
});

const mapDispatchToProps = dispatch => ({
  handleSetOptions(options) {
    dispatch(setOptions(options));
  },
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
  handleSetOptions: PropTypes.func.isRequired,
  handlePreparedQuestions: PropTypes.func.isRequired,
  increaseQuestionIndex: PropTypes.func.isRequired,
  options: PropTypes.array,
  preparedQuestions: PropTypes.array,
  resetUsedQuestions: PropTypes.func.isRequired,
  questions: PropTypes.array,
  shuffleQuestions: PropTypes.func.isRequired,
  usedQuestions: PropTypes.array
};

App.defaultProps = {
  currentQuestionIndex: 0,
  gameOver: false,
  options: [],
  preparedQuestions: [],
  questions: [],
  usedQuestions: []
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
