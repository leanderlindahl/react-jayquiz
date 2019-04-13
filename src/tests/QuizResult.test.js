import React from 'react';
import './setUpTests';
import { shallow } from 'enzyme';
import { QuizResult } from '../components/QuizResult';

const mockHandleStartOverClick = jest.fn();
const mockProps = {
  handleStartOverClick: mockHandleStartOverClick,
  score: 2,
  timedOutAnswers: 1,
  wrongAnswers: 1,
  store: {
    something: 'else'
  }
};

describe('QuizResult Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<QuizResult {...mockProps} />);
  });

  it('Component renders.', () => {
    expect(wrapper.length).toBe(1);
  });

  it('Click start over button triggers startOverClick()', () => {
    wrapper.find('#start-over-button').simulate('click');
    expect(mockHandleStartOverClick).toHaveBeenCalled();
  });

  it('shows number of wrong answers', () => {
    expect(wrapper.find('#wrong-answers').html()).toEqual(
      '<p id="wrong-answers">You had 1 wrong answers.</p>'
    );
  });

  it('shows number of timed out answers', () => {
    expect(wrapper.find('#timed-out-answers').html()).toEqual(
      '<p id="timed-out-answers">You had 1 timed out answers.</p>'
    );
  });
});
