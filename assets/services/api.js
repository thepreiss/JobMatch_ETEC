import axios from "axios";
import PreferencesData from './preferences';

const api = axios.create({
  baseURL: PreferencesData.endpoint,
});

export default api;