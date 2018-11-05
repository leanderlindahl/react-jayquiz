import reducers from '../reducers';

test('SET_CURRENT_ANSWER_STATUS', () => {
  const state = reducers(
    {
      currentAnswer: '',
      currentAnswerStatus: '',
      currentQuestionIndex: 0,
      displayAnswerResponse: false,
      gameOver: false,
      selectedCategory: '18',
      score: 1,
      questions: {
        isFetching: false,
        didInvalidate: false,
        items: [
          {
            category: 'Science: Computers',
            type: 'multiple',
            difficulty: 'easy',
            question:
              'Which company was established on April 1st, 1976 by Steve Jobs, Steve Wozniak and Ronald Wayne?',
            correct_answer: 'Apple',
            incorrect_answers: ['Microsoft', 'Atari', 'Commodore']
          },
          {
            category: 'Science: Computers',
            type: 'boolean',
            difficulty: 'easy',
            question:
              'The programming language &quot;Python&quot; is based off a modified version of &quot;JavaScript&quot;.',
            correct_answer: 'False',
            incorrect_answers: ['True']
          },
          {
            category: 'Science: Computers',
            type: 'multiple',
            difficulty: 'easy',
            question: 'What is the code name for the mobile operating system Android 7.0?',
            correct_answer: 'Nougat',
            incorrect_answers: ['Ice Cream Sandwich', 'Jelly Bean', 'Marshmallow']
          },
          {
            category: 'Science: Computers',
            type: 'boolean',
            difficulty: 'easy',
            question: 'RAM stands for Random Access Memory.',
            correct_answer: 'True',
            incorrect_answers: ['False']
          },
          {
            category: 'Science: Computers',
            type: 'multiple',
            difficulty: 'easy',
            question: 'This mobile OS held the largest market share in 2012.',
            correct_answer: 'iOS',
            incorrect_answers: ['Android', 'BlackBerry', 'Symbian']
          }
        ],
        lastUpdated: 1540554760498
      }
    },
    { type: 'SET_CURRENT_ANSWER_STATUS', payload: 'right' }
  );
  expect(state).toEqual({
    currentAnswer: '',
    currentAnswerStatus: 'right',
    currentQuestionIndex: 0,
    displayAnswerResponse: false,
    gameOver: false,
    selectedCategory: '18',
    score: 1,
    questions: {
      isFetching: false,
      didInvalidate: false,
      items: [
        {
          category: 'Science: Computers',
          type: 'multiple',
          difficulty: 'easy',
          question:
            'Which company was established on April 1st, 1976 by Steve Jobs, Steve Wozniak and Ronald Wayne?',
          correct_answer: 'Apple',
          incorrect_answers: ['Microsoft', 'Atari', 'Commodore']
        },
        {
          category: 'Science: Computers',
          type: 'boolean',
          difficulty: 'easy',
          question:
            'The programming language &quot;Python&quot; is based off a modified version of &quot;JavaScript&quot;.',
          correct_answer: 'False',
          incorrect_answers: ['True']
        },
        {
          category: 'Science: Computers',
          type: 'multiple',
          difficulty: 'easy',
          question: 'What is the code name for the mobile operating system Android 7.0?',
          correct_answer: 'Nougat',
          incorrect_answers: ['Ice Cream Sandwich', 'Jelly Bean', 'Marshmallow']
        },
        {
          category: 'Science: Computers',
          type: 'boolean',
          difficulty: 'easy',
          question: 'RAM stands for Random Access Memory.',
          correct_answer: 'True',
          incorrect_answers: ['False']
        },
        {
          category: 'Science: Computers',
          type: 'multiple',
          difficulty: 'easy',
          question: 'This mobile OS held the largest market share in 2012.',
          correct_answer: 'iOS',
          incorrect_answers: ['Android', 'BlackBerry', 'Symbian']
        }
      ],
      lastUpdated: 1540554760498
    }
  });
});
