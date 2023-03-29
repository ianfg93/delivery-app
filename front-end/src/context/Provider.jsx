import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import MyContext from './Context';

function Provider({ children }) {
  const [loading, setLoading] = useState(false);

  const value = useMemo(() => ({
    loading,
    changeLoadingState() {
      setLoading(!loading);
    },
  }), [
    loading,
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
