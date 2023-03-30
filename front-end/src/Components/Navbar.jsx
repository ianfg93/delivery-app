import React from 'react';

const PRODUCT = 'customer_products__element-navbar-link-products';
const ORDER = 'customer_products__element-navbar-link-orders';
const USER = 'customer_products__element-navbar-user-full-name';
const LOGOUT = 'customer_products__element-navbar-link-logout';

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <a href="/products" data-testid={ PRODUCT }>
            Produtos
          </a>
        </li>
        <li>
          <a href="/orders" data-testid={ ORDER }>
            Meus Pedidos
          </a>
        </li>
        <li>
          <a href="/user" data-testid={ USER }>
            Usuário
          </a>
        </li>
        <li>
          <a href="/user" data-testid={ LOGOUT }>
            Sair
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
