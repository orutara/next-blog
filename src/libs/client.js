import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'logtara',
  apiKey: process.env.API_KEY,
});