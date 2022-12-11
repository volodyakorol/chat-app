import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({ baseURL: API_URL, withCredentials: true });

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message: Array<string>; statusCode: number }>) => {
    return Promise.reject({
      name: error.name,
      message: error?.response?.data?.message ?? 'some wrong',
      statusCode: error?.response?.data?.statusCode,
    });
  },
);

export * from './auth';
export * from './conversation';
export * from './friend';
export * from './group';
export * from './user';
export { api, API_URL };
