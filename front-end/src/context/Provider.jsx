/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import MyContext from './Context';
import DB from '../utils/conection';

function Provider({ children }) {
  const [loading, setLoading] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [haveConflict, setHaveConflict] = useState(true);
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState([0]);
  const [cartQuantities, setCartQuantities] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  function updateCartQuantities(product) {
    const copyCartQuantities = cartQuantities.filter((obj) => obj.id !== product.id);
    if (product.quantity === 0) {
      return setCartQuantities(copyCartQuantities);
    }
    copyCartQuantities.push(product);
    return setCartQuantities(copyCartQuantities);
  }

  function changeLoadingState() {
    setLoading(!loading);
  }

  function updateCartTotal(total) {
    setCartTotal(total.reduce((a, c) => a + c).toFixed(2).replace('.', ','));
  }

  async function login(email, password) {
    try {
      const response = await DB('post', '/user', { email, password });
      localStorage.setItem('user', JSON.stringify(response.data));
      if (response.data.role === 'customer') return navigate('/customer/products');
      if (response.data.role === 'administrator') return navigate('/admin/manage');
      return navigate('/seller/orders');
    } catch (err) {
      setIsHidden(false);
      return new Error(err);
    }
  }

  async function register(email, password, name) {
    try {
      await DB('post', '/register', { email, password, name });
      return navigate('/customer/products');
    } catch (err) {
      setHaveConflict(false);
      return new Error(err);
    }
  }

  async function registerADM(email, password, name, role) {
    try {
      await DB('post', '/admin/register', { email, password, name, role }, JSON
        .parse(localStorage.getItem('user')).token);
    } catch (err) {
      setHaveConflict(false);
      return new Error(err);
    }
  }

  async function finishPurchase(purchase) {
    try {
      const response = await DB('post', '/sale', { ...purchase }, JSON
        .parse(localStorage.getItem('user')).token);
      return navigate(`/customer/orders/${response.data.id}`);
    } catch (err) {
      return new Error(err);
    }
  }

  async function getOrders(id) {
    try {
      const response = await DB('get', `/sale/${id}`);
      setOrders(response.data);
    } catch (err) {
      return new Error(err);
    }
  }

  async function getOrderDetails(id) {
    try {
      const response = await DB('get', `/sale/details/${id}`);
      console.log(response);
      return response.data;
    } catch (err) {
      return new Error(err);
    }
  }

  async function getProducts() {
    try {
      const response = await DB('get', '/products');
      return setProducts(response.data);
    } catch (err) {
      return new Error(err);
    }
  }

  async function getSellers() {
    try {
      const response = await DB('get', '/user/sellers');
      return setSellers(response.data);
    } catch (err) {
      return new Error(err);
    }
  }

  async function getSalesByUserId(id) {
    try {
      const response = await DB('get', `/sale/${id}`);
      console.log(response.data);
      return response.data;
    } catch (err) {
      return new Error(err);
    }
  }

  const value = useMemo(() => ({
    loading,
    isHidden,
    haveConflict,
    products,
    cartTotal,
    cartQuantities,
    sellers,
    orders,
    getOrderDetails,
    setCartTotal,
    navigate,
    setCartQuantities,
    updateCartQuantities,
    changeLoadingState,
    updateCartTotal,
    getProducts,
    login,
    register,
    registerADM,
    getSellers,
    finishPurchase,
    getOrders,
    getSalesByUserId,
  }), [
    loading,
    isHidden,
    haveConflict,
    products,
    cartTotal,
    cartQuantities,
    navigate,
    changeLoadingState,
    updateCartQuantities,
  ]);

  return (
    <MyContext.Provider value={ value }>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
