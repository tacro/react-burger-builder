import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-e6efc.firebaseio.com/'
});

export default instance;
