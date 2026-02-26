import axios from 'axios'
import {Config as config} from "../config/Config.jsx";


const http  = axios.create({
    headers: {'Content-Type': 'multipart/form-data'},
    withCredentials: true,
    baseURL:config.api
})

http.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response.status === 401) {
            const currentURL = window.location.href;
            if (!currentURL.endsWith("/login")) {
                return window.location.href = "/login"
            }
        }
        return Promise.reject(err);
    }
)
export default http