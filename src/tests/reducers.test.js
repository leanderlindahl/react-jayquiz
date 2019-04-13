import reducers from '../reducers';

test('SET_CURRENT_ANSWER_STATUS', () => {
  const state = reducers(
    {
      currentAnswerStatus: '',
      currentQuestionIndex: 0,
      displayAnswerResponse: false,
      gameOver: false,
      optionsDisabled: false,
      outOfTime: false,
      preparedQuestions: [
        {
          category: 'Science: Computers',
          type: 'multiple',
          difficulty: 'easy',
          question:
            'The programming language &#039;Swift&#039; was created to replace what other programming language?',
          correct_answer: 'Objective-C',
          incorrect_answers: ['C#', 'Ruby', 'C++']
        },
        {
          category: 'Science: Computers',
          type: 'boolean',
          difficulty: 'easy',
          question:
            'The NVidia GTX 1080 gets its name because it can only render at a 1920x1080 screen resolution.',
          correct_answer: 'False',
          incorrect_answers: ['True']
        },
        {
          category: 'Science: Computers',
          type: 'boolean',
          difficulty: 'easy',
          question: 'Ada Lovelace is often considered the first computer programmer.',
          correct_answer: 'True',
          incorrect_answers: ['False']
        },
        {
          category: 'Science: Computers',
          type: 'boolean',
          difficulty: 'easy',
          question: 'The Windows ME operating system was released in the year 2000.',
          correct_answer: 'True',
          incorrect_answers: ['False']
        },
        {
          category: 'Science: Computers',
          type: 'multiple',
          difficulty: 'easy',
          question: 'HTML is what type of language?',
          correct_answer: 'Markup Language',
          incorrect_answers: ['Macro Language', 'Programming Language', 'Scripting Language']
        },
        {
          category: 'Science: Computers',
          type: 'multiple',
          difficulty: 'easy',
          question: 'Which programming language shares its name with an island in Indonesia?',
          correct_answer: 'Java',
          incorrect_answers: ['Python', 'C', 'Jakarta']
        },
        {
          category: 'Science: Computers',
          type: 'boolean',
          difficulty: 'easy',
          question: 'Time on Computers is measured via the EPOX System.',
          correct_answer: 'False',
          incorrect_answers: ['True']
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
          question: 'What does CPU stand for?',
          correct_answer: 'Central Processing Unit',
          incorrect_answers: [
            'Central Process Unit',
            'Computer Personal Unit',
            'Central Processor Unit'
          ]
        }
      ],
      selectedCategory: '18',
      score: 1,
      selectedOption: 'Objective-C',
      timedOutAnswers: 0,
      questions: {
        isFetching: false,
        didInvalidate: false,
        items: [
          {
            category: 'Science: Computers',
            type: 'multiple',
            difficulty: 'easy',
            question:
              'The programming language &#039;Swift&#039; was created to replace what other programming language?',
            correct_answer: 'Objective-C',
            incorrect_answers: ['C#', 'Ruby', 'C++']
          },
          {
            category: 'Science: Computers',
            type: 'boolean',
            difficulty: 'easy',
            question:
              'The NVidia GTX 1080 gets its name because it can only render at a 1920x1080 screen resolution.',
            correct_answer: 'False',
            incorrect_answers: ['True']
          },
          {
            category: 'Science: Computers',
            type: 'boolean',
            difficulty: 'easy',
            question: 'Ada Lovelace is often considered the first computer programmer.',
            correct_answer: 'True',
            incorrect_answers: ['False']
          },
          {
            category: 'Science: Computers',
            type: 'boolean',
            difficulty: 'easy',
            question: 'The Windows ME operating system was released in the year 2000.',
            correct_answer: 'True',
            incorrect_answers: ['False']
          },
          {
            category: 'Science: Computers',
            type: 'multiple',
            difficulty: 'easy',
            question: 'HTML is what type of language?',
            correct_answer: 'Markup Language',
            incorrect_answers: ['Macro Language', 'Programming Language', 'Scripting Language']
          },
          {
            category: 'Science: Computers',
            type: 'multiple',
            difficulty: 'easy',
            question: 'Which programming language shares its name with an island in Indonesia?',
            correct_answer: 'Java',
            incorrect_answers: ['Python', 'C', 'Jakarta']
          },
          {
            category: 'Science: Computers',
            type: 'boolean',
            difficulty: 'easy',
            question: 'Time on Computers is measured via the EPOX System.',
            correct_answer: 'False',
            incorrect_answers: ['True']
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
            question: 'What does CPU stand for?',
            correct_answer: 'Central Processing Unit',
            incorrect_answers: [
              'Central Process Unit',
              'Computer Personal Unit',
              'Central Processor Unit'
            ]
          }
        ],
        lastUpdated: 1541760648843
      },
      questionNumber: 1,
      questionsPerRound: 5,
      usedQuestions: [],
      wrongAnswers: 0
    },
    { type: 'SET_CURRENT_ANSWER_STATUS', payload: 'right' }
  );
  expect(state).toEqual({
    currentAnswerStatus: 'right',
    currentQuestionIndex: 0,
    displayAnswerResponse: false,
    gameOver: false,
    optionsDisabled: false,
    outOfTime: false,
    preparedQuestions: [
      {
        category: 'Science: Computers',
        type: 'multiple',
        difficulty: 'easy',
        question:
          'The programming language &#039;Swift&#039; was created to replace what other programming language?',
        correct_answer: 'Objective-C',
        incorrect_answers: ['C#', 'Ruby', 'C++']
      },
      {
        category: 'Science: Computers',
        type: 'boolean',
        difficulty: 'easy',
        question:
          'The NVidia GTX 1080 gets its name because it can only render at a 1920x1080 screen resolution.',
        correct_answer: 'False',
        incorrect_answers: ['True']
      },
      {
        category: 'Science: Computers',
        type: 'boolean',
        difficulty: 'easy',
        question: 'Ada Lovelace is often considered the first computer programmer.',
        correct_answer: 'True',
        incorrect_answers: ['False']
      },
      {
        category: 'Science: Computers',
        type: 'boolean',
        difficulty: 'easy',
        question: 'The Windows ME operating system was released in the year 2000.',
        correct_answer: 'True',
        incorrect_answers: ['False']
      },
      {
        category: 'Science: Computers',
        type: 'multiple',
        difficulty: 'easy',
        question: 'HTML is what type of language?',
        correct_answer: 'Markup Language',
        incorrect_answers: ['Macro Language', 'Programming Language', 'Scripting Language']
      },
      {
        category: 'Science: Computers',
        type: 'multiple',
        difficulty: 'easy',
        question: 'Which programming language shares its name with an island in Indonesia?',
        correct_answer: 'Java',
        incorrect_answers: ['Python', 'C', 'Jakarta']
      },
      {
        category: 'Science: Computers',
        type: 'boolean',
        difficulty: 'easy',
        question: 'Time on Computers is measured via the EPOX System.',
        correct_answer: 'False',
        incorrect_answers: ['True']
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
        question: 'What does CPU stand for?',
        correct_answer: 'Central Processing Unit',
        incorrect_answers: [
          'Central Process Unit',
          'Computer Personal Unit',
          'Central Processor Unit'
        ]
      }
    ],
    selectedCategory: '18',
    score: 1,
    selectedOption: 'Objective-C',
    timedOutAnswers: 0,
    questions: {
      isFetching: false,
      didInvalidate: false,
      items: [
        {
          category: 'Science: Computers',
          type: 'multiple',
          difficulty: 'easy',
          question:
            'The programming language &#039;Swift&#039; was created to replace what other programming language?',
          correct_answer: 'Objective-C',
          incorrect_answers: ['C#', 'Ruby', 'C++']
        },
        {
          category: 'Science: Computers',
          type: 'boolean',
          difficulty: 'easy',
          question:
            'The NVidia GTX 1080 gets its name because it can only render at a 1920x1080 screen resolution.',
          correct_answer: 'False',
          incorrect_answers: ['True']
        },
        {
          category: 'Science: Computers',
          type: 'boolean',
          difficulty: 'easy',
          question: 'Ada Lovelace is often considered the first computer programmer.',
          correct_answer: 'True',
          incorrect_answers: ['False']
        },
        {
          category: 'Science: Computers',
          type: 'boolean',
          difficulty: 'easy',
          question: 'The Windows ME operating system was released in the year 2000.',
          correct_answer: 'True',
          incorrect_answers: ['False']
        },
        {
          category: 'Science: Computers',
          type: 'multiple',
          difficulty: 'easy',
          question: 'HTML is what type of language?',
          correct_answer: 'Markup Language',
          incorrect_answers: ['Macro Language', 'Programming Language', 'Scripting Language']
        },
        {
          category: 'Science: Computers',
          type: 'multiple',
          difficulty: 'easy',
          question: 'Which programming language shares its name with an island in Indonesia?',
          correct_answer: 'Java',
          incorrect_answers: ['Python', 'C', 'Jakarta']
        },
        {
          category: 'Science: Computers',
          type: 'boolean',
          difficulty: 'easy',
          question: 'Time on Computers is measured via the EPOX System.',
          correct_answer: 'False',
          incorrect_answers: ['True']
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
          question: 'What does CPU stand for?',
          correct_answer: 'Central Processing Unit',
          incorrect_answers: [
            'Central Process Unit',
            'Computer Personal Unit',
            'Central Processor Unit'
          ]
        }
      ],
      lastUpdated: 1541760648843
    },
    questionNumber: 1,
    questionsPerRound: 5,
    usedQuestions: [],
    wrongAnswers: 0
  });
});

test('REQUEST_QUESTIONS', () => {
  const state = reducers(
    {
      currentAnswerStatus: '',
      currentQuestionIndex: 0,
      displayAnswerResponse: false,
      gameOver: false,
      optionsDisabled: false,
      outOfTime: false,
      preparedQuestions: [],
      selectedCategory: '18',
      score: 0,
      selectedOption: '',
      timedOutAnswers: 0,
      questions: { isFetching: false, didInvalidate: false, items: [] },
      questionNumber: 1,
      questionsPerRound: 5,
      usedQuestions: [],
      wrongAnswers: 0
    },
    { type: 'REQUEST_QUESTIONS', category: 18 }
  );
  expect(state).toEqual({
    currentAnswerStatus: '',
    currentQuestionIndex: 0,
    displayAnswerResponse: false,
    gameOver: false,
    optionsDisabled: false,
    outOfTime: false,
    preparedQuestions: [],
    selectedCategory: '18',
    score: 0,
    selectedOption: '',
    timedOutAnswers: 0,
    questions: { isFetching: true, didInvalidate: false, items: [] },
    questionNumber: 1,
    questionsPerRound: 5,
    usedQuestions: [],
    wrongAnswers: 0
  });
});

test('RECEIVE_QUESTIONS', () => {
  const state = reducers(
    {
      currentAnswerStatus: '',
      currentQuestionIndex: 0,
      displayAnswerResponse: false,
      gameOver: false,
      optionsDisabled: false,
      outOfTime: false,
      preparedQuestions: [],
      selectedCategory: '18',
      score: 0,
      selectedOption: '',
      timedOutAnswers: 0,
      questions: { isFetching: true, didInvalidate: false, items: [] },
      questionNumber: 1,
      questionsPerRound: 5,
      usedQuestions: [],
      wrongAnswers: 0
    },
    {
      type: 'RECEIVE_QUESTIONS',
      category: 18,
      questions: [
        {
          category: 'Science: Computers',
          type: 'multiple',
          difficulty: 'easy',
          question:
            'In any programming language, what is the most common way to iterate through an array?',
          correct_answer: '&#039;For&#039; loops',
          incorrect_answers: [
            '&#039;If&#039; Statements',
            '&#039;Do-while&#039; loops',
            '&#039;While&#039; loops'
          ]
        },
        {
          category: 'Science: Computers',
          type: 'multiple',
          difficulty: 'easy',
          question:
            'The programming language &#039;Swift&#039; was created to replace what other programming language?',
          correct_answer: 'Objective-C',
          incorrect_answers: ['C#', 'Ruby', 'C++']
        },
        {
          category: 'Science: Computers',
          type: 'multiple',
          difficulty: 'easy',
          question: 'What amount of bits commonly equals one byte?',
          correct_answer: '8',
          incorrect_answers: ['1', '2', '64']
        },
        {
          category: 'Science: Computers',
          type: 'boolean',
          difficulty: 'easy',
          question: 'The logo for Snapchat is a Bell.',
          correct_answer: 'False',
          incorrect_answers: ['True']
        },
        {
          category: 'Science: Computers',
          type: 'multiple',
          difficulty: 'easy',
          question: 'In web design, what does CSS stand for?',
          correct_answer: 'Cascading Style Sheet',
          incorrect_answers: [
            'Counter Strike: Source',
            'Corrective Style Sheet',
            'Computer Style Sheet'
          ]
        },
        {
          category: 'Science: Computers',
          type: 'multiple',
          difficulty: 'easy',
          question: 'What is the domain name for the country Tuvalu?',
          correct_answer: '.tv',
          incorrect_answers: ['.tu', '.tt', '.tl']
        },
        {
          category: 'Science: Computers',
          type: 'boolean',
          difficulty: 'easy',
          question: 'The Windows ME operating system was released in the year 2000.',
          correct_answer: 'True',
          incorrect_answers: ['False']
        },
        {
          category: 'Science: Computers',
          type: 'boolean',
          difficulty: 'easy',
          question:
            'The NVidia GTX 1080 gets its name because it can only render at a 1920x1080 screen resolution.',
          correct_answer: 'False',
          incorrect_answers: ['True']
        },
        {
          category: 'Science: Computers',
          type: 'multiple',
          difficulty: 'easy',
          question: 'The numbering system with a radix of 16 is more commonly referred to as ',
          correct_answer: 'Hexidecimal',
          incorrect_answers: ['Binary', 'Duodecimal', 'Octal']
        },
        {
          category: 'Science: Computers',
          type: 'multiple',
          difficulty: 'easy',
          question: 'Which programming language shares its name with an island in Indonesia?',
          correct_answer: 'Java',
          incorrect_answers: ['Python', 'C', 'Jakarta']
        }
      ],
      receivedAt: 1541760860680
    }
  );
  expect(state).toEqual({
    currentAnswerStatus: '',
    currentQuestionIndex: 0,
    displayAnswerResponse: false,
    gameOver: false,
    optionsDisabled: false,
    outOfTime: false,
    preparedQuestions: [],
    selectedCategory: '18',
    score: 0,
    selectedOption: '',
    timedOutAnswers: 0,
    questions: {
      isFetching: false,
      didInvalidate: false,
      items: [
        {
          category: 'Science: Computers',
          type: 'multiple',
          difficulty: 'easy',
          question:
            'In any programming language, what is the most common way to iterate through an array?',
          correct_answer: '&#039;For&#039; loops',
          incorrect_answers: [
            '&#039;If&#039; Statements',
            '&#039;Do-while&#039; loops',
            '&#039;While&#039; loops'
          ]
        },
        {
          category: 'Science: Computers',
          type: 'multiple',
          difficulty: 'easy',
          question:
            'The programming language &#039;Swift&#039; was created to replace what other programming language?',
          correct_answer: 'Objective-C',
          incorrect_answers: ['C#', 'Ruby', 'C++']
        },
        {
          category: 'Science: Computers',
          type: 'multiple',
          difficulty: 'easy',
          question: 'What amount of bits commonly equals one byte?',
          correct_answer: '8',
          incorrect_answers: ['1', '2', '64']
        },
        {
          category: 'Science: Computers',
          type: 'boolean',
          difficulty: 'easy',
          question: 'The logo for Snapchat is a Bell.',
          correct_answer: 'False',
          incorrect_answers: ['True']
        },
        {
          category: 'Science: Computers',
          type: 'multiple',
          difficulty: 'easy',
          question: 'In web design, what does CSS stand for?',
          correct_answer: 'Cascading Style Sheet',
          incorrect_answers: [
            'Counter Strike: Source',
            'Corrective Style Sheet',
            'Computer Style Sheet'
          ]
        },
        {
          category: 'Science: Computers',
          type: 'multiple',
          difficulty: 'easy',
          question: 'What is the domain name for the country Tuvalu?',
          correct_answer: '.tv',
          incorrect_answers: ['.tu', '.tt', '.tl']
        },
        {
          category: 'Science: Computers',
          type: 'boolean',
          difficulty: 'easy',
          question: 'The Windows ME operating system was released in the year 2000.',
          correct_answer: 'True',
          incorrect_answers: ['False']
        },
        {
          category: 'Science: Computers',
          type: 'boolean',
          difficulty: 'easy',
          question:
            'The NVidia GTX 1080 gets its name because it can only render at a 1920x1080 screen resolution.',
          correct_answer: 'False',
          incorrect_answers: ['True']
        },
        {
          category: 'Science: Computers',
          type: 'multiple',
          difficulty: 'easy',
          question: 'The numbering system with a radix of 16 is more commonly referred to as ',
          correct_answer: 'Hexidecimal',
          incorrect_answers: ['Binary', 'Duodecimal', 'Octal']
        },
        {
          category: 'Science: Computers',
          type: 'multiple',
          difficulty: 'easy',
          question: 'Which programming language shares its name with an island in Indonesia?',
          correct_answer: 'Java',
          incorrect_answers: ['Python', 'C', 'Jakarta']
        }
      ],
      lastUpdated: 1541760860680
    },
    questionNumber: 1,
    questionsPerRound: 5,
    usedQuestions: [],
    wrongAnswers: 0
  });
});
