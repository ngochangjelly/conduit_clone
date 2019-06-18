import { combineReducers } from 'redux';
import articles from './articlesReducer';
import tags from './tagsReducers';
import auth from './authReducer';
import articlesCount from './articlesCountReducer';
export default combineReducers({
  articles,
  tags,
  auth,
  articlesCount,
});
