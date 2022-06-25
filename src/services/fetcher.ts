import axios, { AxiosRequestConfig } from "axios";

const eduUrl = "http://localhost:9000";
const eduApiVersion = "v1";
axios.defaults.baseURL = `${eduUrl}/api/${eduApiVersion}`;
axios.defaults.withCredentials = true;

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
      // eslint-disable-next-line no-underscore-dangle
      !error.config.__isRetryRequest
    ) {
      if (!isLogoutTriggered) {
        isLogoutTriggered = true;
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
      resolve(request.data);
    } catch (err: any) {
      reject(err?.response.data || {});
    }
  });
};

export default httpRequest;
