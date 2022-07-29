import { create } from 'apisauce';
import { BASE_URL } from '../helpers/constants';

export const api = create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});