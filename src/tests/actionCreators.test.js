import {
  fetchQuestions,
  receiveQuestions,
  requestQuestions,
  setCurrentAnswerStatus,
  setCurrentQuestionIndex,
  setDisplayAnswerResponse,
  setGameOver,
  setOptionsDisabled,
  setOutOfTime,
  setQuestionNumber,
  setQuestionsPerRound,
  setSelectedOption,
  setScore,
  setTimedOutAnswers,
  setWrongAnswers,
  setUsedQuestions
} from '../actionCreators';
import { RECEIVE_QUESTIONS } from '../actions';

const jsonQuestionObject = {
  type: RECEIVE_QUESTIONS,
  category: 18,
  results: [
    {
      category: 'Politics',
      type: 'multiple',
      difficulty: 'easy',
      question: 'Whose 2016 presidential campaign slogan was &quot;Make America Great Again&quot;?',
      correct_answer: 'Donald Trump',
      incorrect_answers: ['Ted Cruz', 'Marco Rubio', 'Bernie Sanders']
    },
    {
      category: 'Entertainment: Music',
      type: 'multiple',
      difficulty: 'medium',
      question:
        'Which French duo had UK hits in 1998 with the songs &#039;Sexy Boy&#039;, &#039;Kelly Watch The Stars&#039; &amp; &#039;All I Need&#039;?',
      correct_answer: 'Air',
      incorrect_answers: ['Fire', 'Earth', 'Water']
    }
  ],
  receivedAt: 1541764671426
};

const jsonQuestionResponse = {
  type: 'RECEIVE_QUESTIONS',
  category: 18,
  questions: [
    {
      category: 'Politics',
      type: 'multiple',
      difficulty: 'easy',
      question: 'Whose 2016 presidential campaign slogan was &quot;Make America Great Again&quot;?',
      correct_answer: 'Donald Trump',
      incorrect_answers: ['Ted Cruz', 'Marco Rubio', 'Bernie Sanders']
    },
    {
      category: 'Entertainment: Music',
      type: 'multiple',
      difficulty: 'medium',
      question:
        'Which French duo had UK hits in 1998 with the songs &#039;Sexy Boy&#039;, &#039;Kelly Watch The Stars&#039; &amp; &#039;All I Need&#039;?',
      correct_answer: 'Air',
      incorrect_answers: ['Fire', 'Earth', 'Water']
    }
  ],
  receivedAt: 1530518207007
};

describe('actionCreators', () => {
  const literallyJustDateNow = () => Date.now();

  it('fetchQuestions', () => {
    expect(fetchQuestions(jsonQuestionObject.questions)).toMatchSnapshot();
  });

  it('requestQuestions', () => {
    expect(requestQuestions(18)).toMatchSnapshot();
  });

  it('receiveQuestions', () => {
    // https://codewithhugo.com/mocking-the-current-date-in-jest-tests/
    const realDateNow = Date.now.bind(global.Date);
    const dateNowStub = jest.fn(() => 1530518207007);
    global.Date.now = dateNowStub;
    expect(receiveQuestions(18, jsonQuestionObject)).toEqual(jsonQuestionResponse);
    global.Date.now = realDateNow;
  });

  it('setCurrentAnswerStatus', () => {
    expect(setCurrentAnswerStatus('right')).toMatchSnapshot();
  });

  it('setCurrentQuestionIndex', () => {
    expect(setCurrentQuestionIndex(2)).toMatchSnapshot();
  });

  it('setDisplayAnswerResponse', () => {
    expect(setDisplayAnswerResponse('true')).toMatchSnapshot();
  });

  it('setGameOver', () => {
    expect(setGameOver('false')).toMatchSnapshot();
  });

  it('setOptionsDisabled', () => {
    expect(setOptionsDisabled('true')).toMatchSnapshot();
  });

  it('setOutOfTime', () => {
    expect(setOutOfTime(true)).toMatchSnapshot();
  });

  it('setQuestionNumber', () => {
    expect(setQuestionNumber(2)).toMatchSnapshot();
  });

  it('setQuestionsPerRound', () => {
    expect(setQuestionsPerRound(10)).toMatchSnapshot();
  });

  it('setSelectedOption', () => {
    expect(setSelectedOption('8')).toMatchSnapshot();
  });

  it('setScore', () => {
    expect(setScore(2)).toMatchSnapshot();
  });

  it('setTimedOutAnswers', () => {
    expect(setTimedOutAnswers(2)).toMatchSnapshot();
  });

  it('setWrongAnswers', () => {
    expect(setWrongAnswers(2)).toMatchSnapshot();
  });

  it('setUsedQuestions', () => {
    expect(setUsedQuestions(['questions alfa', 'question beta'])).toMatchSnapshot();
  });
});
