import { SET_OPTIONS } from '../actions';

const options = (state = [], action) => {
  if (action.type === SET_OPTIONS) {
    return action.payload;
  }
  return state;
};

export default options;
