import React, { useContext } from 'react';
import Navbar from '../Components/Navbar';
import MyContext from '../context/Context';

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
              <td data-testid={ `customer_checkout__element-order-table-item-number-${index}` }>{product.id}</td>
              <td data-testid={ `customer_checkout__element-order-table-name-${index}` }>{product.name}</td>
              <td data-testid={ `customer_checkout__element-order-table-quantity-${index}`}>{product.quantity}</td>
              <td data-testid={ `customer_checkout__element-order-table-unit-price-${index}`}>{product.price}</td>
              <td data-testid={ `customer_checkout__element-order-table-sub-total-${index}`}>{(product.price * product.quantity).toFixed(2)}</td>
              <td data-testid={ `customer_checkout__element-order-table-remove-${index}`}><button>Remover</button></td>
            </tr>
          ))}
        </tbody>
        {console.log(cartQuantities)}
      </table>
      <p data-testid={ `customer_checkout__element-order-total-price` }>
        Total:
        R$
        {cartTotal}
      </p>
      <div>
        <select data-testid="customer_checkout__select-seller" ><option value="Ze">Zé</option></select>
        <input type="text" data-testid="customer_checkout__input-address" />
        Endereço
        <input type="number" data-testid="customer_checkout__input-address-number" />
        Número
        <button data-testid="customer_checkout__button-submit-order">FINALIZAR PEDIDO</button>
      </div>
    </div>
  );
}

export default Checkout;
