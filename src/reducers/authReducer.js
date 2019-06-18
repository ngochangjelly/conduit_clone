import {
  SET_USER,
  SET_NEW_USER,
  SET_USER_UPDATE,
} from '../constants/actionTypes';
export default (state = {}, action) => {
  switch (action.type) {
    case SET_NEW_USER:
      return {
        ...state,
        currentUser: action.data ? action.data : undefined,
        token: action.data ? action.data.token : undefined,
      };
    case SET_USER:
      return {
        ...state,
        currentUser: action.data ? action.data : undefined,
        token: action.data ? action.data.token : undefined,
      };
    case SET_USER_UPDATE:
      return { ...state, currentUser: action.data ? action.data : undefined };
    default:
      return state;
  }
};
