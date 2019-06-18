import { SET_ARTICLES_COUNT } from '../constants/actionTypes';
export default (state = {}, action) => {
  switch (action.type) {
    case SET_ARTICLES_COUNT:
      return action.data ? action.data : 0;
    default:
      return state;
  }
};
