import React, { useEffect, useContext } from 'react';
import Card from '../Components/Card';
import Navbar from '../Components/Navbar';
import MyContext from '../context/Context';

// const COMMON = 'customer_products';
// const CARD = 'element-card-price';
// const IMG = 'img-card-bg-image';
// const ELEMENT = 'img-card-title';
// const QUANTITY = 'input-card-quantity';
// const ADDITEM = 'button-card-add-item';
// const REMOVEITEM = 'button-card-rm-item';

function Products() {
  const { products, getProducts } = useContext(MyContext);
  useEffect(() => {
    getProducts(products);
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        { products.map((product) => <Card key={ product.id } product={ product } />) }
      </div>
    </div>
  );
}

export default Products;
