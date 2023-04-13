import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MyContext from '../context/Context';
import Navbar from '../Components/Navbar';
import convertDate from '../utils/convertDate';
import convertSubTotal from '../utils/convertSubTotal';

const COMMON = 'customer_order_details';

export default function OrderDetails() {
  // const [details, setDetails] = useState();
  const [showDetails, setShowDetails] = useState(false);
  const { getOrderDetails, updateStatus, details, setDetails } = useContext(MyContext);
  const { id } = useParams();

  useEffect(() => {
    async function awaitData() {
      const response = await getOrderDetails(id);
      setDetails(response);
      setShowDetails(true);
    }
    awaitData();
  }, [setDetails, getOrderDetails, id]);

  const handleStatus = async () => {
    const update = await updateStatus(details.id, 'Entregue');
    setDetails(update.data);
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
                onClick={ handleStatus }
                disabled={ details.status !== 'Em Trânsito' }
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
                      { convertSubTotal(prod) }
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
