import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/',
  timeout: 5000,
});
export default axiosInstance;
