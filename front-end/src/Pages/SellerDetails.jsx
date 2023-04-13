import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MyContext from '../context/Context';
import Navbar from '../Components/Navbar';
import convertDate from '../utils/convertDate';
import convertSubTotal from '../utils/convertSubTotal';

const COMMON = 'seller_order_details';

export default function SellerDetails() {
  // const [details, setDetails] = useState();
  const [showDetails, setShowDetails] = useState(false);
  const [statusIndex, setStatusIndex] = useState(0);
  const { getOrderDetails, updateStatus, details, setDetails } = useContext(MyContext);
  const { id } = useParams();

  const arrayStatus = ['Pendente', 'Preparando', 'Em Trânsito'];

  useEffect(() => {
    async function awaitData() {
      const response = await getOrderDetails(id);
      if (response.status === 'Preparando') {
        const index = arrayStatus.indexOf('Preparando');
        setStatusIndex(index);
      }
      setDetails(response);
      setShowDetails(true);
    }
    awaitData();
  }, [setDetails, getOrderDetails, id]);

  const handleStatus = async () => {
    const update = await updateStatus(details.id, arrayStatus[statusIndex + 1]);
    setStatusIndex(statusIndex + 1);
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
                onClick={ handleStatus }
                disabled={ (details.status !== 'Pendente') }
                data-testid={ `${COMMON}__button-preparing-check` }
              >
                <p>
                  Preparar pedido
                </p>
              </button>
              <button
                type="button"
                data-testid={ `${COMMON}__button-dispatch-check` }
                onClick={ handleStatus }
                disabled={ details.status !== 'Preparando' }
              >
                Saiu para entrega
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
