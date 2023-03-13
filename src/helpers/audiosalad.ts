import axios from "axios";

export const BASE_URL = process.env.REACT_APP_BASE_URL;

export default axios.create({
    baseURL: process.env.REACT_APP_AUDIOSALAD_URL,
    responseType: "json",
    withCredentials: true,
})