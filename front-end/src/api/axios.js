import axios from 'axios';

import { constants } from '../constants';

export const axiosInstance = axios.create({
  baseURL: constants.API_URL,
  headers: {
    'content-type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  let authToken = localStorage.getItem('authToken')
    ? localStorage.getItem('authToken')
    : null;
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  async (error) => {
    throw error;
  }
);
