import { SET_OPTIONS_DISABLED } from '../actions';

const optionsDisabled = (state = false, action) => {
  if (action.type === SET_OPTIONS_DISABLED) {
    return action.payload;
  }
  return state;
};

export default optionsDisabled;
