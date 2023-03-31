import React, { useEffect, useContext } from 'react';
import Card from '../Components/Card';
import Navbar from '../Components/Navbar';
import MyContext from '../context/Context';

function Products() {
  const { products, getProducts, cartTotal } = useContext(MyContext);
  useEffect(() => {
    getProducts(products);
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
