import React, { useContext, useState } from 'react';
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
  const {
    cartTotal,
    cartQuantities,
    setCartTotal,
    setCartQuantities,
    sellers,
    products,
    finishPurchase } = useContext(MyContext);

  const [adress, setAdress] = useState('');
  const [adressNumber, setAdressNumber] = useState();
  const [selection, setSelection] = useState(sellers[0].id);

  const remove = (id, price) => {
    const newCartQuantities = cartQuantities.filter((obj) => obj.id !== id);
    setCartQuantities(newCartQuantities);
    setCartTotal(Number(
      Number(cartTotal.replace(',', '.')) - price,
    ).toFixed(2).replace('.', ','));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    finishPurchase({
      sellerId: Number(selection),
      userId: JSON.parse(localStorage.getItem('user')).id,
      totalPrice: Number(cartTotal.replace(',', '.')),
      deliveryAddress: adress,
      deliveryNumber: adressNumber,
      saledProducts: cartQuantities.map((product) => {
        const newObj = {
          productId: product.id,
          quantity: product.quantity,
        };
        return { ...newObj };
      }),
    });
  };

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
          { cartQuantities.length > 0 ? cartQuantities.map((product, index) => (
            <tr key={ product.id }>
              <td data-testid={ `${ITEM}${index}` }>{index + 1}</td>
              <td data-testid={ `${DESCRIPTION}${index}` }>
                { products.find(((p) => p.id === product.id)).name }
              </td>
              <td data-testid={ `${QUANTITY}${index}` }>{product.quantity}</td>
              <td data-testid={ `${PRICE}${index}` }>
                {products.find(((p) => p.id === product.id)).price.replace('.', ',')}
              </td>
              <td data-testid={ `${SUBTOTAL}${index}` }>
                {(products.find(((p) => p.id === product.id)).price * product.quantity)
                  .toFixed(2).replace('.', ',')}
              </td>
              <td data-testid={ `${REMOVE}${index}` }>
                <button
                  type="button"
                  onClick={ () => remove(product.id, (products
                    .find(((p) => p.id === product.id)).price * product.quantity)) }
                >
                  Remover
                </button>
              </td>
            </tr>
          )) : <div> Carrinho vazio </div>}
        </tbody>
      </table>
      <p data-testid={ TOTALPRICE }>
        Total do pedido:
        {' '}
        {cartTotal}
      </p>
      <form
        action="post"
        onSubmit={ (event) => handleSubmit(event) }
      >
        <select
          data-testid={ SELLER }
          value={ selection }
          onInput={ ({ target: { value } }) => setSelection(value) }
          required
        >
          { sellers.map((seller) => (
            <option
              key={ seller.id }
              value={ seller.id }
            >
              { seller.id }
            </option>
          ))}
        </select>
        Endereço:
        <input
          type="text"
          data-testid={ ADDRESS }
          onInput={ ({ target: { value } }) => setAdress(value) }
          value={ adress }
          required
        />
        Número:
        <input
          type="number"
          data-testid={ NUMBER }
          value={ adressNumber }
          onInput={ ({ target: { value } }) => value >= 0 && setAdressNumber(value) }
          required
        />
        <button
          type="submit"
          data-testid={ SUBMIT }
        >
          FINALIZAR PEDIDO
        </button>
      </form>
    </div>
  );
}

export default Checkout;
