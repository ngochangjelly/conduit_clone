import axios from 'axios';

export const getProfile = data => {
  return axios
    .get(`${process.env.REACT_APP_API}/profiles/${data}`)
    .then(res => {
      return res.data.profile;
    })
    .catch(error => {
      throw error;
    });
};
