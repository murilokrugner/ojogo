import axios from 'axios';

const url = 'http://10.0.2.2:3333/';

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
