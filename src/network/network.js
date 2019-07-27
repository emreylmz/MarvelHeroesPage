import axios from 'axios';
import { BASE_URL, PUBLIC_API_KEY } from '../utils';

export const axiosGlobal = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: PUBLIC_API_KEY
  }
});