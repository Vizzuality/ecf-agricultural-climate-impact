import axios from 'axios';

export const WRIAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WRI_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

export default {
  WRIAPI,
};
