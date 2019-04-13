import { SELECT_CATEGORY } from '../actions';

const selectedCategory = (state = '18', action) => {
  // '18' is topic "Science: Computers"
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.category;
    default:
      return state;
  }
};

export default selectedCategory;
