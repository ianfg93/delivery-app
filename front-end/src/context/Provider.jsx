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

  const navigate = useNavigate();

  const value = useMemo(() => ({
    loading,
    isHidden,
    haveConflict,
    products,
    cartTotal,
    navigate,
    cartQuantities,
    setCartQuantities,
    changeLoadingState() {
      setLoading(!loading);
    },
    updateCartTotal(total) {
      setCartTotal(total.reduce((a, c) => a + c).toFixed(2).replace('.', ','));
    },
    updateCartQuantities(product) {
      const copyCartQuantities = cartQuantities.filter((obj) => obj.id !== product.id);
      if (product.quantity === 0) {
        return setCartQuantities(copyCartQuantities);
      }
      copyCartQuantities.push(product);
      return setCartQuantities(copyCartQuantities);
    },
    async login(email, password) {
      try {
        const response = await DB('post', '/user', {
          email,
          password,
        });
        localStorage.setItem('user', JSON.stringify(response.data));
        return navigate('/customer/products');
      } catch (err) {
        setIsHidden(false);
        return new Error(err);
      }
    },
    async register(email, password, name) {
      try {
        await DB('post', '/register', {
          email,
          password,
          name,
        });
        return navigate('/customer/products');
      } catch (err) {
        setHaveConflict(false);
        return new Error(err);
      }
    },

    async getProducts() {
      try {
        const response = await DB('get', '/products');
        return setProducts(response.data);
      } catch (err) {
        return new Error(err);
      }
    },
  }), [
    loading,
    isHidden,
    haveConflict,
    products,
    cartTotal,
    navigate,
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
