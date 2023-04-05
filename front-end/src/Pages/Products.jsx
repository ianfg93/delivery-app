import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../Components/Card';
import Navbar from '../Components/Navbar';
import MyContext from '../context/Context';

function Products() {
  const navigate = useNavigate();
  const { products, getProducts, cartTotal, getSellers } = useContext(MyContext);
  useEffect(() => {
    getProducts();
    getSellers();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        { products.map((product) => <Card key={ product.id } product={ product } />) }
      </div>
      <button
        type="button"
        data-testid="customer_products__button-cart"
        onClick={ () => navigate('/customer/checkout') }
        disabled={ cartTotal === '0,00' }
      >
        Ver carrinho: R$
        {' '}
        <span
          data-testid="customer_products__checkout-bottom-value"
        >
          { cartTotal }
        </span>
      </button>
    </div>
  );
}

export default Products;
