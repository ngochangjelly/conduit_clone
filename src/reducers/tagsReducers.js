import { SET_ALL_TAGS } from '../constants/actionTypes';
export default (state = {}, action) => {
  switch (action.type) {
    case SET_ALL_TAGS:
      return { ...state, ...action.data };
    default:
      return state;
  }
};
