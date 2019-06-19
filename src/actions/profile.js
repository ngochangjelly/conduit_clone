import axios from 'axios';
import { baseUrl } from '../constants/baseUrl';

export const getProfile = data => {
  return axios
    .get(`${baseUrl}/profiles/${data}`)
    .then(res => {
      return res.data.profile;
    })
    .catch(error => {
      throw error;
    });
};
