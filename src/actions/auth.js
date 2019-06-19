import axios from 'axios';

import { baseUrl } from '../constants/baseUrl';

import { store } from '../store';
import { SET_USER, SET_USER_UPDATE } from '../constants/actionTypes';
import history from '../constants/history';
export const dispatchSignupData = data => {
  return {
    type: SET_USER,
    data,
  };
};
export const register = data => {
  const { username, email, password } = data;
  return dispatch => {
    return axios
      .post(`${baseUrl}/users`, {
        user: {
          username: username,
          email: email,
          password: password,
        },
      })
      .then(response => {
        localStorage.setItem('jwt', response.data.user.token);
        dispatch(dispatchSignupData(response.data.user));
        history.push('/');
      })
      .catch(() => {});
  };
};
export const dispatchLoginInfo = data => {
  return {
    type: SET_USER,
    data,
  };
};
export const login = data => {
  const { username, password } = data;
  return dispatch => {
    return axios
      .post(`${baseUrl}/users/login`, {
        user: {
          email: username,
          password: password,
        },
      })
      .then(response => {
        localStorage.setItem('jwt', response.data.user.token);
        dispatch(dispatchLoginInfo(response.data.user));
        history.push('/');
      })
      .catch(err => {
        throw err;
      });
  };
};
export const logout = data => {
  window.localStorage.removeItem('jwt');
  window.localStorage.removeItem('persist:root');
  history.push('/');
};
export const setUserUpdate = data => {
  return {
    type: SET_USER_UPDATE,
    data,
  };
};
export const updateUser = data => {
  let user = Object.assign({}, data);
  return dispatch => {
    let config = {
      headers: {
        Authorization: `Token ${store.getState().auth.currentUser.token}`,
      },
    };
    return axios
      .put(
        `${baseUrl}/user`,
        {
          user,
        },
        config,
      )
      .then(res => {
        dispatch(setUserUpdate(res.data.user));
        user.hasOwnProperty('password') ? logout() : history.push('/');
      })
      .catch(err => {
        throw err;
      });
  };
};
