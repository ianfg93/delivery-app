const convertSubTotal = (prod) => {
  const total = (prod.quantity * prod.product.price).toFixed(2);
  const totalString = String(total).replace('.', ',');
  return totalString;
};

export default convertSubTotal;
