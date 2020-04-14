import axios from "axios";
import apiConfig from '../config/apiconfig'

const axiosInstance = axios.create({
    baseURL: apiConfig.url,
    responseType: "json",
    headers: {
        'Content-type': 'application/json'
    }
})

export default axiosInstance;