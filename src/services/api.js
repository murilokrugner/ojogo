import axios from 'axios';

const url = 'http://192.168.2.100:3333/';

let headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  Accept: 'application/json',
};

let api = axios.create({
  baseURL: url,
  headers: headers,
});

export default api;
