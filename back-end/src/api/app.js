const express = require('express');
const cors = require('cors'); 
const { getUser, create } = require('./controllers/UserController');
const { findAllProductsController } = require('./controllers/ProductController');

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
}));

app.post('/user', (req, res) => getUser(req, res));
app.post('/register', (req, res) => create(req, res));
app.get('/products', (req, res) => findAllProductsController(req, res));
app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
