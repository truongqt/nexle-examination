import { create, DEFAULT_HEADERS } from 'apisauce';
import { BASE_URL } from '../helpers/constants';

export const api = create({
  baseURL: BASE_URL,
  headers: DEFAULT_HEADERS,
  timeout: 30000,
});