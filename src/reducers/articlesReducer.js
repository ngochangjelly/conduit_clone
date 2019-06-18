import {
  SET_ALL_ARTICLES,
  SET_ALL_ARTICLES_BY_TAG,
  SET_ARTICLES_BY_AUTHOR,
  SET_ARTICLES_BY_USER,
  SET_NEW_ARTICLE,
} from '../constants/actionTypes';
export default (state = {}, action) => {
  switch (action.type) {
    case SET_ALL_ARTICLES:
      return action.data ? action.data.articles : [];
    case SET_ALL_ARTICLES_BY_TAG:
      return action.data ? action.data.articles : [];
    case SET_ARTICLES_BY_AUTHOR:
      return action.data ? action.data.articles : [];
    case SET_ARTICLES_BY_USER:
      return action.data ? action.data : [];
    case SET_NEW_ARTICLE:
      return state.articles ? state.articles.unshift(action.data) : [];
    default:
      return state;
  }
};
