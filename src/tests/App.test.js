import React from 'react';
import './setUpTests';
import { shallow } from 'enzyme';
import { App } from '../components/App';

const mockIncreaseQuestionIndex = jest.fn();
const mockQuestions = [];
const mockPreparedQuestions = [
  {
    category: 'Science: Computers',
    type: 'multiple',
    difficulty: 'easy',
    question: 'Which computer language would you associate Django framework with?',
    correct_answer: 'Python',
    incorrect_answers: ['C#', 'C++', 'Java']
  },
  {
    category: 'Science: Computers',
    type: 'multiple',
    difficulty: 'easy',
    question: 'On Twitter, what is the character limit for a Tweet?',
    correct_answer: '140',
    incorrect_answers: ['120', '160', '100']
  },
  {
    category: 'Science: Computers',
    type: 'multiple',
    difficulty: 'easy',
    question: 'RAM stands for Random Access Memory.',
    correct_answer: 'True',
    incorrect_answers: ['False']
  }
];

const mockProps = {
  handleFetchQuestions: jest.fn(),
  handlePreparedQuestions: jest.fn(),
  increaseQuestionIndex: mockIncreaseQuestionIndex,
  currentQuestionIndex: 1,
  preparedQuestions: mockPreparedQuestions,
  questions: mockQuestions,
  resetUsedQuestions: jest.fn(),
  shuffleQuestions: jest.fn(),
  usedQuestions: ['Alfa', 'Beta', 'Gamma'],
  store: { something: 'else' }
};

describe('App component', () => {
  let wrapper;
  let spyPrepareQuestions;
  let spyPrepareSingleQuestion;

  beforeEach(() => {
    spyPrepareQuestions = jest.spyOn(App.prototype, 'prepareQuestions');
    spyPrepareSingleQuestion = jest.spyOn(App.prototype, 'prepareSingleQuestion');
    wrapper = shallow(<App {...mockProps} />);
  });

  it('App component renders.', () => {
    expect(wrapper.length).toBe(1);
  });
  it('prepareQuestions was called', () => {
    wrapper.setProps({ questions: mockPreparedQuestions });
    expect(spyPrepareQuestions).toHaveBeenCalled();
  });
  it('prepareSingleQuestion was called', () => {
    wrapper.setProps({ questions: mockPreparedQuestions });
    expect(spyPrepareSingleQuestion).toHaveBeenCalled();
  });
  it('Component state contains answer options', () => {
    wrapper.setProps({ questions: mockPreparedQuestions });
    expect(wrapper.state('options').length).toBeGreaterThanOrEqual(2);
  });
  it('If question has been asked, move on to next question', () => {
    wrapper.setProps({
      questions: mockPreparedQuestions,
      increaseQuestionIndex: mockIncreaseQuestionIndex,
      usedQuestions: [
        'On Twitter, what is the character limit for a Tweet?',
        'Which computer language would you associate Django framework with?',
        'RAM stands for Random Access Memory.'
      ]
    });
    wrapper.update();
    expect(mockIncreaseQuestionIndex).toHaveBeenCalled();
  });
});
