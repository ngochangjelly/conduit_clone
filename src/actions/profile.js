import axios from 'axios';

import { baseURL } from '../constants/baseURL';
export const getProfile = data => {
  return axios
    .get(`${baseURL}/profiles/${data}`)
    .then(res => {
      return res.data.profile;
    })
    .catch(error => {
      throw error;
    });
};
