import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MyContext from '../context/Context';
import Navbar from '../Components/Navbar';

const COMMON = 'customer_order_details';

export default function OrderDetails() {
  const [details, setDetails] = useState();
  const { getOrderDetails } = useContext(MyContext);
  const { id } = useParams();

  useEffect(() => {
    async function awaitData() {
      setDetails(await getOrderDetails(id));
    }
    awaitData();
  }, []);

  return (
    <div>
      <Navbar />
      <h2>detalhes do pedido</h2>
      { details !== undefined
        && (
          <div>
            <div>
              <h3
                data-testid="__element-order-details-label-order-id"
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
                { details.seller.name }
              </p>
              <p
                data-testid={ `${COMMON}__element-order-details-label-order-date` }
              >
                { details.saleDate }
              </p>
              <p
                data-testid=""
              >
                { details.status }
              </p>
            </div>
          </div>
        )}
    </div>
  );
}
