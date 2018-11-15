import { SET_OUT_OF_TIME } from '../actions';

const outOfTime = (state = false, action) => {
  if (action.type === SET_OUT_OF_TIME) {
    return action.payload;
  }
  return state;
};

export default outOfTime;
