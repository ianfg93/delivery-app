import React, { useContext, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import MyContext from '../context/Context';

export default function Orders() {
  const { orders, getOrders, navigate } = useContext(MyContext);

  useEffect(() => {
    getOrders(JSON.parse(localStorage.getItem('user')).id);
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        { orders.length !== 0 && orders.map((order) => (
          <button
            type="button"
            key={ order.id }
            onClick={ () => navigate(`/customer/orders/${order.id}`) }
          >
            <div
              data-testid={ `customer_orders__element-order-id-${order.id}` }
            >
              <p>pedido</p>
              { order.id }
            </div>
            <div
              data-testid={ `customer_orders__element-delivery-status-${order.id}` }
              className={ order.status }
            >
              { order.status }
            </div>
            <div>
              <p
                data-testid={ `customer_orders__element-order-date-${order.id}` }
              >
                { `${String(new Date(order.saleDate)
                  .getUTCDate()).padStart(2, '0')}/${String(new Date(order.saleDate)
                  .getUTCMonth() + 1).padStart(2, '0')}/${new Date(order.saleDate)
                  .getFullYear()}` }
              </p>
              <p
                data-testid={ `customer_orders__element-card-price-${order.id}` }
              >
                { String(order.totalPrice).replace('.', ',') }
              </p>
            </div>
          </button>
        )) }
      </div>
    </div>
  );
}
