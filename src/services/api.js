import axios from 'axios';

const url = 'http://knowledgesoftware.kinghost.net:21022/';

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
