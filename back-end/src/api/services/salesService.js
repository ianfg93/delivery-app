const { Sale, SaleProduct } = require('../../database/models');

const createSale = async (body) => {
  const sale = await Sale.create({ ...body });
  return sale.id;
};

const createSaleProducts = async (saleId, saledProds) => {
  const sale = SaleProduct.create({ saleId, ...saledProds });
  return sale;
};

module.exports = {
  createSale,
  createSaleProducts,
};