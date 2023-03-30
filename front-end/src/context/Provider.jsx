import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import MyContext from './Context';
import DB from '../utils/conection';

function Provider({ children }) {
  const [loading, setLoading] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  const value = useMemo(() => ({
    loading,
    isHidden,
    changeLoadingState() {
      setLoading(!loading);
    },
    async login(email, password) {
      try {
        const status = await DB('post', '/user', {
          email,
          password,
        });
        console.log(status.data);
        return status;
      } catch (err) {
        setIsHidden(false);
        return new Error(err);
      }
    },
  }), [
    loading,
    isHidden,
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
