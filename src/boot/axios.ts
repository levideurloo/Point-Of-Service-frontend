import axios, { AxiosInstance } from 'axios';
import { boot } from 'quasar/wrappers';
import Cookie from "src/app/helpers/cookie";

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
  }
}

const isDev = process.env.VUE_APP_ENV !== 'production';

/** Constants */
export const appName = process.env.VUE_APP_NAME;
export const tokenName = `${appName}_access_token`;
export const langCookieName = `${appName}_lang`;
export const token = Cookie.prototype.checkAndSetAuthorizationHeader(tokenName);

axios.interceptors.request.use((config) => {
  config.baseURL = isDev
    ? process.env.VUE_APP_DEV_API_URL
    : process.env.VUE_APP_PROD_API_URL;

  return config;
});

export { axios };

export default boot(({ Vue }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  Vue.prototype.$axios = axios;
});
