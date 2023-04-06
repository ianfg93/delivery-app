const { Sale, SaleProduct, User, Product } = require('../../database/models');

const createSale = async (body) => {
  const sale = await Sale.create({ ...body });
  return sale.id;
};

const createSaleProducts = async (saleId, saledProds) => {
  const sale = SaleProduct.create({ saleId, ...saledProds });
  return sale;
};

const getSalesByUserId = async (id) => {
  const sale = Sale.findAll(
    {
      where: { userId: id },
      include: [
        { model: SaleProduct, as: 'products' },
      ],
    },
  );
  return sale;
};

const getSalesBySellerId = async (id) => {
  const sale = Sale.findAll(
    {
      where: { sellerId: id },
      include: [
        { model: SaleProduct, as: 'products' },
      ],
    },
  );
  return sale;
};

const findSaleById = async (id) => {
  try {
    const sale = await Sale.findByPk(id, {
      include: [
        { model: SaleProduct,
          as: 'products',
          include: [
            { model: Product, as: 'product' },
          ],
        },
        { model: User, as: 'sellers' },
      ],
    });
    console.log(sale);
    return sale;
  } catch (err) {
    throw new Error();
  }
};

module.exports = {
  createSale,
  createSaleProducts,
  getSalesByUserId,
  getSalesBySellerId,
  findSaleById,
};