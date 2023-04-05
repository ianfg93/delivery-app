import React, { useEffect, useState } from 'react';

const PRODUCT = 'customer_products__element-navbar-link-products';
const ORDER = 'customer_products__element-navbar-link-orders';
const USER = 'customer_products__element-navbar-user-full-name';
const LOGOUT = 'customer_products__element-navbar-link-logout';

function Navbar() {
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);
  return (
    <nav className="navbar">
      <a href="/customer/products" data-testid={ PRODUCT }>
        Produtos
      </a>
      <a href="/customer/orders" data-testid={ ORDER }>
        Meus Pedidos
      </a>
      <a href="/login" data-testid={ USER }>
        { user.name }
      </a>

      <a href="/login" data-testid={ LOGOUT } onClick={ () => localStorage.clear() }>
        Sair
      </a>
    </nav>
  );
}

export default Navbar;
