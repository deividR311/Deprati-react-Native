import axios from 'axios';
import Config from '../../../application/common/dotEnv';

const apiHybris = axios.create({
  baseURL: Config.API_URL_HYBRIS,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 2000
});

export default apiHybris;
