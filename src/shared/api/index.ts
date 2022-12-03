import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({ baseURL: API_URL, withCredentials: true });

export * from './auth';
export * from './conversation';
export * from './friend';
export * from './group';
export * from './user';
export { api, API_URL };
