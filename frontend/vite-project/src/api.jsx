import axios from "axios";

const API = axios.create({
//   baseURL: "http://localhost:5000/api"
baseURL:"https://rolebase-catf.onrender.com/api"
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = token;
  }
};

export default API;