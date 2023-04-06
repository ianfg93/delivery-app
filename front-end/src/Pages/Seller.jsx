import React, { useEffect, useContext, useState } from 'react';
import MyContext from '../context/Context';
import Navbar from '../Components/NavbarSeller';

const ITEM = 'cseller_orders__element-order-id-';
const ADDRESS = 'seller_orders__element-card-address-';
const DATE = 'seller_orders__element-order-date-';
const PRICE = 'seller_orders__element-card-price-';
const STATUS = 'seller_orders__element-delivery-status-';

export default function Seller() {
  const { getSalesByUserId } = useContext(MyContext);
  const [salesByUserId, setSalesByUserId] = useState([]);

  useEffect(() => {
    const getSellerLocal = JSON.parse(localStorage.getItem('user') || {});
    async function awaitSeller() {
      if (getSellerLocal) {
        const response = await getSalesByUserId(getSellerLocal.id);
        setSalesByUserId(response);
      }
    }
    awaitSeller();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        {salesByUserId.map((sale, index) => (
          <div key={ index }>
            <p data-testid={ `${ITEM}${index}` }>{sale.id}</p>
            <p data-testid={ `${STATUS}${index}` }>{sale.status}</p>
            <p data-testid={ `${DATE}${index}` }>{sale.saleDate}</p>
            <p data-testid={ `${PRICE}${index}` }>{sale.totalPrice}</p>
            <p data-testid={ `${ADDRESS}${index}` }>{sale.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
