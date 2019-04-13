import { INVALIDATE_CATEGORY, RECEIVE_QUESTIONS, REQUEST_QUESTIONS } from '../actions';

const questions = (state = { isFetching: false, didInvalidate: false, items: [] }, action) => {
  switch (action.type) {
    case INVALIDATE_CATEGORY:
      return Object.assign({}, state, { didInvalidate: true });
    case REQUEST_QUESTIONS:
      return Object.assign({}, state, { isFetching: true, didInvalidate: false });
    case RECEIVE_QUESTIONS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.questions,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
};

export default questions;
