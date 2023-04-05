const express = require('express');
const cors = require('cors'); 
const { getUser, create, getSeller } = require('./controllers/UserController');
const { findAllProductsController } = require('./controllers/ProductController');
const { createNewSale, getSale } = require('./controllers/SaleController');
const { validateToken } = require('./middlewares/JWTvalidate');

const app = express();

app.use(express.json());
app.use(express.static('public')); //! arquivos estáticos;
app.use(cors({
  origin: 'http://localhost:3000',
}));

app.get('/user/sellers', (req, res) => getSeller(req, res));
app.get('/products', (req, res) => findAllProductsController(req, res));
app.get('/coffee', (_req, res) => res.status(418).end());
app.get('/sale/:id', (req, res) => getSale(req, res));
app.post('/user', (req, res) => getUser(req, res));
app.post('/sale', validateToken, (req, res) => createNewSale(req, res));
app.post('/register', (req, res) => create(req, res));

module.exports = app;
