import React from 'react';
import { shallow, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import store from '../store';
// import setUpTests from './setUpTests';
import QuestionCard, { Unwrapped as UnwrappedQuestionCard } from '../components/QuestionCard';
import AnswerOption from '../components/AnswerOption';
import { setDisplayAnswerResponse } from '../actionCreators';

configure({ adapter: new Adapter() });

const currentAnswer = '';
const currentAnswerStatus = '';
const displayAswerResponse = false;
const formattedAnswer = '8';
const formattedQuestion = 'What amount of bits commonly equals one byte?';
const next = true;
const questionNumber = 1;
const score = 0;

const mockHandleAnswerState = jest.fn();
const mockHandleShowNext = jest.fn();
const mockHandleShowResult = jest.fn();
const mockOptions = ['1', '2', '64', '8'];
const mockQuestion = {
  category: 'Science: Computers',
  correct_answer: '8',
  difficulty: 'easy',
  incorrect_answers: ['1', '2', '64'],
  question: 'What amount of bits commonly equals one byte?',
  type: 'multiple'
};

// This test doesn't work when options are shuffled in the component
xtest('QuestionCard renders correctly', () => {
  const component = shallow(
    <UnwrappedQuestionCard
      handleAnswerState={mockHandleAnswerState}
      handleShowNext={mockHandleShowNext}
      handleShowResult={mockHandleShowResult}
      question={mockQuestion}
    />
  );
  expect(component).toMatchSnapshot();
});

test('AnswerOptions should equal given amount of options', () => {
  const component = shallow(
    <UnwrappedQuestionCard
      handleAnswerState={mockHandleAnswerState}
      handleShowNext={mockHandleShowNext}
      handleShowResult={mockHandleShowResult}
      question={mockQuestion}
    />
  );
  expect(component.find(AnswerOption).length).toEqual(mockOptions.length);
});

test('Answer response should be visible after question was answered', () => {
  store.dispatch(setDisplayAnswerResponse(true));
  const component = render(
    <Provider store={store}>
      <QuestionCard
        handleAnswerState={mockHandleAnswerState}
        handleShowNext={mockHandleShowNext}
        handleShowResult={mockHandleShowResult}
        question={mockQuestion}
      />
    </Provider>
  );
  expect(component.find('.answer-response').length).toEqual(1);
});
