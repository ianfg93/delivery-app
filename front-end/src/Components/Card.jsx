import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/Context';

const total = [];

export default function Card({ product }) {
  const { name, id, urlImage, price } = product;
  const { updateCartTotal, updateCartQuantities } = useContext(MyContext);
  const [quantity, setQuantity] = useState(Number(0));
  const [totalPrice, setTotalPrice] = useState(Number(0));

  useEffect(() => {
    total.splice((id - 1), 1, totalPrice);
    setTotalPrice(quantity * Number(price));
    updateCartTotal(total);
    updateCartQuantities({ id, quantity, name, price });
  });

  return (
    <div>
      <h2
        data-testid={ `customer_products__element-card-title-${id}` }
      >
        { name }

      </h2>
      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        height={ 150 }
        src={ urlImage }
        alt={ name }
      />
      <p
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        R$:
        { price.replace('.', ',') }
      </p>
      <div>
        <button
          data-testid={ `customer_products__button-card-add-item-${id}` }
          type="button"
          name={ name }
          onClick={ () => quantity >= 0 && setQuantity(quantity + 1) }
        >
          +
        </button>
        <input
          type="number"
          data-testid={ `customer_products__input-card-quantity-${id}` }
          value={ quantity }
          onChange={ ({ target: { value } }) => value >= 0 && setQuantity(value) }
        />
        <button
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          type="button"
          onClick={ () => quantity > 0 && setQuantity(quantity - 1) }
        >
          -
        </button>
      </div>
    </div>
  );
}

Card.propTypes = {
  product: PropTypes.exact({
    name: PropTypes.string.isRequired,
    urlImage: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};
