import axios from "axios";
// const BASE_URL = "https://project-crm.onrender.com";
const BASE_URL = "http://localhost:8080";

//signup
export async function userSignUp(data){
    return await axios.post(`${BASE_URL}/crm/api/v1/auth/signup`, data)
}
//integrate login ans signup apis

//sigin
export async function userLogin(data){
    return await axios.post(`${BASE_URL}/crm/api/v1/auth/signin`, data)
}