import axios from 'axios';

import { SET_ALL_ARTICLES_BY_TAG } from '../constants/actionTypes';
import { store } from '../store';
import history from '../constants/history';
import { baseURL } from '../constants/baseURL';
export const toggleLikeArticle = (slug, favorited) => {
  let config = {
    headers: {
      Authorization: `Token ${store.getState().auth.currentUser.token}`,
    },
  };
  if (favorited) {
    return axios
      .delete(`${baseURL}/articles/${slug}/favorite`, config)
      .then(response => {
        return response.data.article;
      })
      .catch(error => {
        throw error;
      });
  }
  return axios
    .post(`${baseURL}/articles/${slug}/favorite`, {}, config)
    .then(response => {
      return response.data.article;
    })
    .catch(error => {
      throw error;
    });
};

export const createArticle = data => {
  const { title, description, body, tags } = data;
  let config = {
    headers: {
      Authorization: `Token ${store.getState().auth.currentUser.token}`,
    },
  };
  return axios
    .post(
      `${baseURL}/articles`,
      {
        article: {
          title: title,
          description: description,
          body: body,
          tagList: tags,
        },
      },
      config,
    )
    .then(response => {
      history.push(`/article/${response.data.article.slug}`);
      return response.data.article;
    })
    .catch(error => {
      throw error;
    });
};

export const getArticlesByAuthor = data => {
  const currentPage = 0;
  return axios
    .get(
      `${baseURL}/articles?author=${data}&limit=10&offset=${
        currentPage ? currentPage * 10 : 0
      }`,
    )
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    });
};

export const getUserFavoritedArticles = data => {
  const currentPage = 0;
  let config = {
    headers: {
      Authorization: `Token ${store.getState().auth.currentUser.token}`,
    },
  };
  return axios
    .get(
      `${baseURL}/articles/feed?limit=10&offset=${
        currentPage ? currentPage * 10 : 0
      }`,
      config,
    )
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    });
};

export const getAllArticles = (currentPage, currentUser) => {
  let config = currentUser
    ? {
        headers: {
          Authorization: `Token ${store.getState().auth.currentUser.token}`,
        },
      }
    : null;
  return axios
    .get(
      `${baseURL}/articles?limit=10&offset=${
        currentPage ? currentPage * 10 : 0
      }`,
      config,
    )
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    });
};

export const setAllArticlesByTags = data => {
  return {
    type: SET_ALL_ARTICLES_BY_TAG,
    data,
  };
};
export const getAllArticlesByTag = (tag, page) => {
  return dispatch => {
    return axios
      .get(
        `${baseURL}/articles?tag=${tag}&limit=10&offset=${
          page ? page * 10 : 0
        }`,
      )
      .then(response => {
        dispatch(setAllArticlesByTags(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};
export const getArticleByID = id => {
  return axios
    .get(`${baseURL}/articles/${id}`)
    .then(response => {
      return response.data.article;
    })
    .catch(error => {
      throw error;
    });
};
