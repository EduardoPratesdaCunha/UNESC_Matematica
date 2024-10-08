import axios from "axios";
import Logout from "./components/Logout";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('TOKEN')}`,
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('TOKEN');
  if (token) {
    console.log('Authorization => ', config.headers.Authorization)
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response && error.response.status === 401) {
    Logout();
    localStorage.removeItem('TOKEN')
    window.location.reload();
    return error;
  }
  throw error;
})

export default axiosClient;