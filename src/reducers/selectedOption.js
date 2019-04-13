import { SET_SELECTED_OPTION } from '../actions';

const selectedOption = (state = '', action) => {
  if (action.type === SET_SELECTED_OPTION) {
    return action.payload;
  }
  return state;
};

export default selectedOption;
