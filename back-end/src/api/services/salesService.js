const { Sale, SaleProduct } = require('../../database/models');

const createSale = async (body) => {
  const sale = await Sale.create({ ...body });
  return sale.id;
};

const createSaleProducts = async (saleId, saledProds) => {
  const sale = SaleProduct.create({ saleId, ...saledProds });
  return sale;
};

const getSalesByUserId = async (saleId) => {
  const sale = Sale.findAll(
    {
      where: { userId: saleId },
      include: [
        { model: SaleProduct, as: 'products' },
      ],
    },
  );
  return sale;
};

module.exports = {
  createSale,
  createSaleProducts,
  getSalesByUserId,
};