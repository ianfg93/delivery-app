import React, { useEffect, useState } from 'react';

const ORDERS = 'customer_products__element-navbar-link-orders';
const USER = 'customer_products__element-navbar-user-full-name';
const LOGOUT = 'customer_products__element-navbar-link-logout';

function Navbar() {
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  return (
    <nav className="navbar">
      <a href="/customer/products" data-testid={ ORDERS }>
        Produtos
      </a>
      <a href="/customer/orders" data-testid={ USER }>
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
