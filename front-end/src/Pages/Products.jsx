import React, { useEffect, useContext, useState } from 'react';
import Navbar from '../Components/Navbar';
import MyContext from '../context/Context';

const COMMON = 'customer_products';
const CARD = 'element-card-price';
const IMG = 'img-card-bg-image';
const ELEMENT = 'img-card-title';
// const QUANTITY = 'input-card-quantity';
// const ADDITEM = 'button-card-add-item';
// const REMOVEITEM = 'button-card-rm-item';

function Products() {
  const { products, getProducts } = useContext(MyContext);
  useEffect(() => {
    getProducts(products);
  }, []);

  const [inputValue, setInputValue] = useState(Number(0));
  // const handleChange = ({ target }) => {
  //   setInputValue(target.value + 1);
  // };

  return (
    <div>
      <Navbar />
      <div>
        { products.map((product) => (
          // const { name, price, urlImage, id } = product;
          // return (
          <div key={ product.id }>
            <h2
              data-testid={ `customer_products__element-card-title-${product.id}` }
            >
              {product.name}
            </h2>
            <img
              data-testid={ `customer_products__img-card-bg-image-${product.id}` }
              src={ product.urlImage }
              alt={ product.name }
            />
            <p data-testid={ `customer_products__element-card-price-${product.id}` }>
              R$:
              {product.price}
            </p>
            <button
              onClick={ () => setInputValue(inputValue + 1) }
              type="button"
            >
              +
            </button>
            <button
              onClick={ () => setInputValue(inputValue - 1) }
              type="button"
            >
              -
            </button>
            <input
              value={ inputValue }
              type="number"
            />
          </div>
          // );
        ))}
      </div>
    </div>
  );
}

export default Products;
