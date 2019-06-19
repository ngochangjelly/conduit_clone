import axios from 'axios';
import { baseURL } from '../constants/baseURL';
import { SET_ALL_TAGS } from '../constants/actionTypes';
export const fetchAllTags = data => {
  return {
    type: SET_ALL_TAGS,
    data,
  };
};

export const getAllTags = () => {
  return dispatch => {
    return axios
      .get(`${baseURL}/tags`)
      .then(response => {
        return dispatch(fetchAllTags(response.data.tags));
      })
      .catch(error => {
        return error;
      });
  };
};
