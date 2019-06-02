import axios from "axios";

export const baseURL = "https://sibigdata.herokuapp.com/";
export const api = axios.create({ baseURL });

export default api;
