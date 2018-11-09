import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '../components/App';

const mockProps = {
  handleFetchQuestions: jest.fn(),
  handlePreparedQuestions: jest.fn(),
  increaseQuestionIndex: jest.fn()
};

describe('App component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App {...mockProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
