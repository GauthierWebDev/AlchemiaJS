import { settings } from '$/config';
import Axios from 'axios';

export let baseURL = `${settings.PROTOCOL}://${settings.DOMAIN}`;
if (settings.DOMAIN === 'localhost') baseURL += `:${settings.PORT}`;
baseURL += '/api';

const axios = Axios.create({
  baseURL,
  withCredentials: true,
});

export default axios;
