import _axios from "axios";

const axios = _axios.create();

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

export { axios };
