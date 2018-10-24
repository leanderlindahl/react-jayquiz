import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import setUpTests from './setUpTests';
import QuestionCard from '../components/QuestionCard';
import AnswerOption from '../components/AnswerOption';

configure({ adapter: new Adapter() });

const currentAnswer = '';
const currentAnswerStatus = '';
const displayAswerResponse = false;
const formattedAnswer = '8';
const formattedQuestion = 'What amount of bits commonly equals one byte?';
const next = true;
const options = ['1', '2', '64', '8'];

const question = {
  category: 'Science: Computers',
  correct_answer: '8',
  difficulty: 'easy',
  incorrect_answers: ['1', '2', '64'],
  question: 'What amount of bits commonly equals one byte?',
  type: 'multiple'
};
const questionNumber = 1;
const score = 0;

const mockHandleAnswerSelected = jest.fn();
const mockHandleNextClick = jest.fn();
const mockHandleResultClick = jest.fn();

test('QuestionCard renders correctly', () => {
  const component = shallow(
    <QuestionCard
      handleAnswerSelected={mockHandleAnswerSelected}
      handleNextClick={mockHandleNextClick}
      handleResultClick={mockHandleResultClick}
    />
  );
  expect(component).toMatchSnapshot();
});

test('AnswerOptions should equal given amount of options', () => {
  const component = shallow(
    <QuestionCard
      handleAnswerSelected={mockHandleAnswerSelected}
      handleNextClick={mockHandleNextClick}
      handleResultClick={mockHandleResultClick}
      options={options}
    />
  );
  expect(component.find(AnswerOption).length).toEqual(options.length);
  // expect(component.find(ShowCard).length).toEqual(preload.shows.length);
});
