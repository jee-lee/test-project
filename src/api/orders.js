import axios from 'axios';
import { apiBaseURL } from '../config/urls.js';

axios.defaults.validateStatus = null;

/**
 * Makes a GET Authentication request to the Protecht API
 * @param {string} orderNumber
 * @param  {AxiosRequestConfig} [config]
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export async function getOrder(orderNumber, config = undefined) {
  return axios.get(`${apiBaseURL}/api/v2/orders/${orderNumber}`, config);
}
