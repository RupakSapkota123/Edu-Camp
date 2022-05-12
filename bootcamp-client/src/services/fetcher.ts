/* eslint-disable prettier/prettier */
/* eslint-disable no-underscore-dangle */
import axios, { AxiosRequestConfig } from "axios";
import { logoutStart } from "redux/actions/authActions";
import store from "redux/store/store";

const foodieUrl = "http://localhost:9000";
const foodieApiVersion = "v1";
axios.defaults.baseURL = `${foodieUrl}/api/${foodieApiVersion}`;
axios.defaults.withCredentials = false;

let isLogoutTriggered = false;

function resetIsLogoutTriggered() {
  isLogoutTriggered = false;
}

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const { data, status } = error.response;
    if (
      status === 401 &&
      (data?.error?.type || "") !== "INCORRECT_CREDENTIALS" &&
      error.config &&
      !error.config.__isRetryRequest
    ) {
      if (!isLogoutTriggered) {
        isLogoutTriggered = true;
        store.dispatch(logoutStart(resetIsLogoutTriggered));
      }
    }
    return Promise.reject(error);
  },
);

const httpRequest = <T>(req: AxiosRequestConfig): Promise<T> => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const request = await axios(req);
      console.log("request", request.data);
      resolve(request.data);
    } catch (e: any) {
      reject(e?.response?.data || {});
    }
  });
};

export default httpRequest;
