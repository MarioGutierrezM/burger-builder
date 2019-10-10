import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://react-burger-builder-28b33.firebaseio.com/'
});

export default axiosInstance;