import axios from 'axios';

const PROTOCOL = process.env.REACT_APP_PROTOCOL || 'http';
const MYSQLHOST = process.env.REACT_APP_MYSQLHOST || 'localhost:3001';

const fetch = axios.create({
  baseURL: `${PROTOCOL}://${MYSQLHOST}`,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const DB = async (method, endpoint, body, auth) => fetch
  .request({ method, url: endpoint, data: body, headers: { Authorization: auth } })
  .then(({ status, data }) => ({ status, data }));

export default DB;
