import { axios } from ".";

export async function uploadPasta() {
    return axios.post('/api/bin')
}