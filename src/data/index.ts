import _axios from "axios";

const axios = _axios.create();

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

export const post = axios.post.bind(axios);

export const get = axios.get.bind(axios);

export interface ApiResponse<T = unknown> {
    code: number;
    message: string;
    data: T
}