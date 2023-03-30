import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';

import MyContext from './Context';
import DB from '../utils/conection';

function Provider({ children }) {
  const [loading, setLoading] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  const navigate = useNavigate();

  const value = useMemo(() => ({
    loading,
    isHidden,
    navigate,
    changeLoadingState() {
      setLoading(!loading);
    },
    async login(email, password) {
      try {
        await DB('post', '/user', {
          email,
          password,
        });
        return navigate('/customer/products');
      } catch (err) {
        setIsHidden(false);
        return new Error(err);
      }
    },
  }), [
    loading,
    isHidden,
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
