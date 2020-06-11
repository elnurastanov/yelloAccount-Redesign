import axios from "axios";
import apiConfig from '../config/apiconfig'
import appConfig from '../config/appconfig'

const axiosInstance = axios.create({
    baseURL: apiConfig.url,
    responseType: "json",
    headers: {
        'Content-type': 'application/json'
    }
})

axiosInstance.interceptors.request.use(
    (request) => {
        let session = window.sessionStorage.getItem(appConfig.sessionStorage);
        let user_data;
        if (session) user_data = JSON.parse(session);

        if (user_data) request.headers.Authorization = `${user_data.token}`;
        else request.headers.Authorization = '';
        
        return request;
    },
    error => {
        console.log(error)
    }
)

export default axiosInstance;