import { SET_USER_UPDATE } from '../constants/actionTypes';
export default (state = {}, action) => {
  switch (action.type) {
    case SET_USER_UPDATE:
      return {
        ...state,
        currentUser: action.data ? action.data : undefined,
      };
    default:
      return state;
  }
};
