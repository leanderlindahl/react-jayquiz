import { SET_QUESTIONS_PER_ROUND } from '../actions';

const questionsPerRound = (
  state = parseInt(process.env.REACT_APP_QUESTIONS_PER_ROUND, 10),
  action
) => {
  if (action.type === SET_QUESTIONS_PER_ROUND) {
    return action.payload;
  }
  return state;
};

export default questionsPerRound;
