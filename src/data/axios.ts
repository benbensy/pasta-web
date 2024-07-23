import _axios from "axios";

const axios = _axios.create();

axios.interceptors.response.use(
  (response) => {
    const { data, status } = response;

    if (status === 200 && data.code === 0) {
      return response;
    } else {
      const error = new Error(data.message);
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const post = axios.post.bind(axios);
export const get = axios.get.bind(axios);
