import axios from 'axios';

import { baseURL } from '../constants/baseURL';
import { REMOVE_COMMENT } from '../constants/actionTypes';
import { store } from '../store';
export const dispatchRemoveComment = data => {
  return {
    type: REMOVE_COMMENT,
    data,
  };
};

export const removeComment = (articleID, commentID) => {
  let config = {
    headers: {
      Authorization: `Token ${store.getState().auth.currentUser.token}`,
    },
  };
  return axios
    .delete(`${baseURL}/articles/${articleID}/comments/${commentID}`, config)
    .then(res => {
      return commentID;
    })
    .catch(error => {
      throw error;
    });
};
export const getCommentsByArticle = data => {
  return axios
    .get(`${baseURL}/articles/${data}/comments`)
    .then(response => {
      return response.data.comments;
    })
    .catch(error => {
      throw error;
    });
};
export const postComment = (id, data) => {
  let config = {
    headers: {
      Authorization: `Token ${store.getState().auth.currentUser.token}`,
    },
  };
  return axios
    .post(
      `${baseURL}/articles/${id}/comments`,
      { comment: { body: data } },
      config,
    )
    .then(res => {
      return res.data.comment;
    })
    .catch(error => {
      throw error;
    });
};
