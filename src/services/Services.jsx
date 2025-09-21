import axios from 'axios'
import {Config as config} from "../config/Config.jsx";


const http  = axios.create({
    headers: {'Content-Type': 'multipart/form-data'},
    withCredentials: true,
    baseURL:config.api
})

http.interceptors.response.use(
    res => res,
    err => {
        console.log(err)
        if (err.response.status === 401) {
            window.location.replace("/login")
        }else {
            return Promise.reject(err);
        }
    }
)
export default http