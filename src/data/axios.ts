import _axios, { AxiosError } from "axios";

const axios = _axios.create();
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

axios.interceptors.response.use(
  (response) => {
    const { data, status } = response;

    if (status === 200 && data.code === 0) {
      return response;
    } else {
      const error = new AxiosError(data.message, `${data.code}`);
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const post = (url: string, { arg }: { arg: FormData }) =>
  axios.post(url, arg).then((data) => data.data);
export const get = (url: string) => axios.get(url).then((data) => data.data);
