import axios from 'axios';
import { apiBaseURL } from '../config/urls.js';

axios.defaults.validateStatus = null;

/**
 * Makes a POST Authentication request to the Protecht API
 * @param {object} data The JSON payload
 * @param {AxiosRequestConfig} [config]
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export async function postAuthentication(data, config = undefined) {
  return axios.post(`${apiBaseURL}/api/v2/auth/token`, data, config);
}
