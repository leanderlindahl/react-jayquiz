import React from 'react';
import ReactDOM from 'react-dom';
import App, { Unwrapped as UnwrappedApp } from '../components/App';

const mockHandleFetchQuestions = jest.fn();

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UnwrappedApp handleFetchQuestions={mockHandleFetchQuestions} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
