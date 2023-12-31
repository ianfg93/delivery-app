import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import './App.css';
import Register from './Pages/Register';
import Products from './Pages/Products';
import Checkout from './Pages/Checkout';
import Orders from './Pages/Orders';
import OrderDetails from './Pages/OrderDetails';
import AdminManage from './Pages/AdminManage';
import Seller from './Pages/Seller';
import SellerDetails from './Pages/SellerDetails';

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
        <Route path="/customer/orders/:id" element={ <OrderDetails /> } />
        <Route path="/seller/orders/:id" element={ <SellerDetails /> } />
        <Route path="/admin/manage" element={ <AdminManage /> } />
        <Route path="/seller/orders" element={ <Seller /> } />
      </Routes>
    </div>
  );
}

export default App;
