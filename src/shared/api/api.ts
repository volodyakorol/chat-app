import axios, { AxiosError } from 'axios';

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

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

export { api, API_URL };
