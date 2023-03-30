import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import './App.css';
import Register from './Pages/Register';
import Products from './Pages/Products';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Navigate to="/login" /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/customer/products" element={ <Products /> } />
      </Routes>
    </div>
  );
}

export default App;
