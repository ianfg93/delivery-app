import React, { useContext } from 'react';
import Navbar from '../Components/Navbar';
import MyContext from '../context/Context';

const ITEM = 'customer_checkout__element-order-table-item-number-';
const DESCRIPTION = 'customer_checkout__element-order-table-name-';
const QUANTITY = 'customer_checkout__element-order-table-quantity-';
const PRICE = 'customer_checkout__element-order-table-unit-price-';
const SUBTOTAL = 'customer_checkout__element-order-table-sub-total-';
const REMOVE = 'customer_checkout__element-order-table-remove-';
const TOTALPRICE = 'customer_checkout__element-order-total-price';
const SELLER = 'customer_checkout__select-seller';
const ADDRESS = 'customer_checkout__input-address';
const NUMBER = 'customer_checkout__input-address-number';
const SUBMIT = 'customer_checkout__button-submit-order';

function Checkout() {
  const { cartTotal, cartQuantities } = useContext(MyContext);

  return (
    <div>
      <Navbar />
      <h1>Checkout</h1>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        <tbody>
          {cartQuantities.map((product, index) => (
            <tr key={ product.productId }>
              <td data-testid={ `${ITEM}${index}` }>{index + 1}</td>
              <td data-testid={ `${DESCRIPTION}${index}` }>{product.name}</td>
              <td data-testid={ `${QUANTITY}${index}` }>{product.quantity}</td>
              <td data-testid={ `${PRICE}${index}` }>
                {product.price.replace('.', ',')}
              </td>
              <td data-testid={ `${SUBTOTAL}${index}` }>
                {(product.price * product.quantity).toFixed(2).replace('.', ',')}
              </td>
              <td data-testid={ `${REMOVE}${index}` }>
                <button type="button">Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p data-testid={ TOTALPRICE }>
        {cartTotal}
      </p>
      <div>
        <select data-testid={ SELLER }><option value="Ze">Zé</option></select>
        <input type="text" data-testid={ ADDRESS } />
        Endereço
        <input type="number" data-testid={ NUMBER } />
        Número
        <button type="button" data-testid={ SUBMIT }>FINALIZAR PEDIDO</button>
      </div>
    </div>
  );
}

export default Checkout;
