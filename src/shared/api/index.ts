import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({ baseURL: 'http://localhost:3001/api', withCredentials: true });

api.interceptors.response.use((response) => response.data);

export { api, API_URL };
export * from './auth';
export * from './conversations';
export * from './friends';
export * from './groups';
export * from './users';
