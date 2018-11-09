import React from 'react';
import ReactDOM from 'react-dom';
import './setUpTests';
import { shallow } from 'enzyme';
import { Quiz } from '../components/Quiz';

const mockProps = {
  currentQuestionIndex: 1,
  handleAnswerState: jest.fn(),
  next: false,
  options: ['Static', 'Final', 'Private', 'Public'],
  question: {
    category: 'Science: Computers',
    correct_answer: 'Final',
    difficulty: 'easy',
    incorrect_answers: ['Static', 'Private', 'Public'],
    question:
      'In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?',
    type: 'multiple'
  },
  questionNumber: 2,
  totalNumberOfQuestions: 3,
  usedQuestions: ['A question...', 'Another question']
};

describe('Quiz', () => {
  let wrapper;
  let spyHandlePlusTen;
  let spyHandleFiftyFifty;

  beforeEach(() => {
    spyHandlePlusTen = jest.spyOn(Quiz.prototype, 'handlePlusTen');
    spyHandleFiftyFifty = jest.spyOn(Quiz.prototype, 'handleFiftyFifty');
    wrapper = shallow(<Quiz {...mockProps} />);
  });

  it('Plus ten button should be rendered', () => {
    const buttonWrapper = wrapper.find('#plus-ten-button');
    expect(buttonWrapper.length).toBe(1);
  });

  it('Plus ten button should be clickable', () => {
    wrapper
      .find('#plus-ten-button')
      .simulate('click', { preventDefault: () => {}, target: { value: 'some value' } });

    expect(spyHandlePlusTen).toHaveBeenCalledTimes(1);
  });

  it('50/50 button should be rendered', () => {
    const buttonWrapper = wrapper.find('#fifty-fifty-button');
    expect(buttonWrapper.length).toBe(1);
  });

  it('50/50 button should be clickable', () => {
    wrapper
      .find('#fifty-fifty-button')
      .simulate('click', { preventDefault: () => {}, target: { value: 'some value' } });

    expect(spyHandleFiftyFifty).toHaveBeenCalledTimes(1);
  });

  it('Timer component should be rendered', () => {
    const timerWrapper = wrapper.find('#timer-component');
    expect(timerWrapper.length).toBe(1);
  });

  it('Should contain 1 question and the answer options', () => {
    const container = document.createElement('div');
    ReactDOM.render(<Quiz {...mockProps} />, container);
    expect(container.textContent).toMatch(
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?"
    );
    expect(container.innerHTML).toContain(
      '<input type="radio" class="ant-radio-input" value="Final">'
    );
    expect(container.innerHTML).toContain(
      '<input type="radio" class="ant-radio-input" value="Static">'
    );
    expect(container.innerHTML).toContain(
      '<input type="radio" class="ant-radio-input" value="Public">'
    );
    expect(container.innerHTML).toContain(
      '<input type="radio" class="ant-radio-input" value="Private">'
    );
  });

  it('Should be able to conditionally display the answer component', () => {
    const component = shallow(<Quiz {...mockProps} displayAnswerResponse />);
    expect(component.find('Connect(QuestionResult)')).toHaveLength(1);
  });
});
