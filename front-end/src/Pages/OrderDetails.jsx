import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MyContext from '../context/Context';
import Navbar from '../Components/Navbar';

const COMMON = 'customer_order_details';

export default function OrderDetails() {
  const [details, setDetails] = useState();
  const [showDetails, setShowDetails] = useState(false);
  const { getOrderDetails } = useContext(MyContext);
  const { id } = useParams();

  useEffect(() => {
    async function awaitData() {
      const response = await getOrderDetails(id);
      console.log(response);
      setDetails(response);
      setShowDetails(true);
    }
    awaitData();
    console.log(details);
  }, []);

  const convertDate = (obj) => {
    const date = obj.saleDate;
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth() + Number(1);
    console.log(month);
    console.log(new Date(date));
    const day = new Date(date).getDate();
    const finalMonth = +month > 9 ? month.toString() : `0${month}`;
    const finalDay = +day > 9 ? day.toString() : `0${day}`;
    const finalDate = `${finalDay}/${finalMonth}/${year}`;

    return finalDate;
  };

  return (
    <div>
      <Navbar />
      <h2>detalhes do pedido</h2>
      { showDetails
        && (
          <div>
            <div>
              <h3
                data-testid={ `${COMMON}__element-order-details-label-order-id` }
              >
                Pedido
                {' '}
                { details.id }
              </h3>
              <p
                data-testid={ `${COMMON}__element-order-details-label-seller-name` }
              >
                P. Vend:
                {' '}
                { details.sellers.name }
              </p>
              <p
                data-testid={ `${COMMON}__element-order-details-label-order-date` }
              >
                { convertDate(details) }
              </p>
              <p
                data-testid={ `${COMMON}__element-order-details-label-delivery-status` }
              >
                { details.status }
              </p>
              <button
                type="button"
                data-testid={ `${COMMON}__button-delivery-check` }
                disabled
              >
                Marcar como entregue
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Descrição</th>
                  <th>Quantidade</th>
                  <th>Valor Unitário</th>
                  <th>Sub-total</th>
                </tr>
              </thead>
              <tbody>
                { details.products.map((prod, i) => (
                  <tr key={ i }>
                    <td
                      data-testid={ `${COMMON}__element-order-table-item-number-${i}` }
                    >
                      { i + 1 }

                    </td>
                    <td
                      data-testid={ `${COMMON}__element-order-table-name-${i}` }
                    >
                      { prod.product.name }

                    </td>
                    <td
                      data-testid={ `${COMMON}__element-order-table-quantity-${i}` }
                    >
                      { prod.quantity }

                    </td>
                    <td
                      data-testid={ `${COMMON}__element-order-table-unit-price-${i}` }
                    >
                      { String(prod.product.price).replace('.', ',') }

                    </td>
                    <td
                      data-testid={ `${COMMON}__element-order-table-sub-total-${i}` }
                    >
                      { String(prod.quantity * prod.product.price).replace('.', ',') }
                    </td>
                  </tr>)) }
              </tbody>
            </table>
            <div
              data-testid={ `${COMMON}__element-order-total-price` }
            >
              { details.totalPrice.replace('.', ',') }
            </div>
          </div>
        )}
    </div>
  );
}
