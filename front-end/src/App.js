import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import './App.css';
import Register from './Pages/Register';
import Products from './Pages/Products';
import Checkout from './Pages/Checkout';
import Orders from './Pages/Orders';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Navigate to="/login" /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/customer/products" element={ <Products /> } />
        <Route path="/customer/checkout" element={ <Checkout /> } />
        <Route path="/customer/orders" element={ <Orders /> } />
      </Routes>
    </div>
  );
}

export default App;
