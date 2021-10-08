import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://todo-app-999.herokuapp.com/'
})

export default instance;