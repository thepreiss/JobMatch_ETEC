import axios from "axios";
import PreferencesData from './preferences';

const api = axios.create({
  baseURL: PreferencesData.endpoint,
  timeout: 15000,
});

export default api;