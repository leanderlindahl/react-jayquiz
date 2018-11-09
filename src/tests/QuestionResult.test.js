import React from 'react';
import './setUpTests';
import { shallow } from 'enzyme';
import { QuestionResult } from '../components/QuestionResult';

const mockHandleShowResult = jest.fn();
const mockProps = {
  currentAnswerStatus: 'right',
  correctAnswer: 'An Answer',
  handleShowResult: mockHandleShowResult,
  handleShowNext: jest.fn(),
  next: false,
  outOfTime: true
};

describe('QuestionResult Component', () => {
  let wrapper;
  let spyHandleClickNext;

  beforeEach(() => {
    spyHandleClickNext = jest.spyOn(QuestionResult.prototype, 'handleClickNext');
    wrapper = shallow(<QuestionResult {...mockProps} />);
  });

  it('Component renders.', () => {
    expect(wrapper.length).toBe(1);
  });

  it("Displays 'answer was right' when user gave correct answer", () => {
    expect(wrapper.text()).toContain(`Your answer is: ${mockProps.currentAnswerStatus}`);
  });

  it("Displays 'answer was wrong' when user gave incorrect answer", () => {
    wrapper.setProps({ currentAnswerStatus: 'wrong' });
    expect(wrapper.text()).toContain(`Your answer is: wrong`);
  });

  it('Displays the correct answer when user gave wrong answer', () => {
    wrapper.setProps({ currentAnswerStatus: 'wrong' });
    expect(wrapper.text()).toContain(`The right answer is: ${mockProps.correctAnswer}`);
  });

  it("Displays 'out of time' message when user is out of time", () => {
    wrapper.setProps({ currentAnswerStatus: '', outOfTime: true });
    expect(wrapper.text()).toContain("You're out of time!");
  });

  it('Display show result button', () => {
    expect(wrapper.find('#show-result-button').length).toBe(1);
  });

  it('Display next button', () => {
    wrapper.setProps({ next: true });
    expect(wrapper.find('#next-question-button').length).toBe(1);
  });

  it('Click next button triggers handleClickNext()', () => {
    wrapper.setProps({ next: true });
    wrapper
      .find('#next-question-button')
      .simulate('click', { preventDefault: () => {}, target: { value: 'some value' } });
    expect(spyHandleClickNext).toHaveBeenCalledTimes(1);
  });

  it('Click result button triggers handleShowResult()', () => {
    wrapper.find('#show-result-button').simulate('click');
    expect(mockHandleShowResult).toHaveBeenCalled();
  });
});
