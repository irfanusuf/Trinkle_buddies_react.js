import axios from "axios";



export const axiosInstance  =  axios.create({
    // baseURL : "https://trinklebuddies.onrender.com"
    baseURL : "http://localhost:4000",
    withCredentials: true     
    // in every request cookie will be present in request headers so that server can cofirm that user is authenticated 
})


