const { createSale, createSaleProducts, getSalesByUserId } = require('../services/salesService');

const createNewSale = async (req, res) => {
  const {
    sellerId, userId, totalPrice, deliveryAddress,
    deliveryNumber, saledProducts,
  } = req.body;

  const sale = await createSale({
    sellerId,
    userId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    status: 'Pendente',
    saleDate: new Date(),
  });

  saledProducts.forEach(async (product) => {
    await createSaleProducts(sale, product);
  });

  res.status(201).json({ id: sale });
};

const getSale = async (req, res) => {
  const { id } = req.params;
  const sales = await getSalesByUserId(id);
  res.status(200).json(sales);
};

module.exports = {
  createNewSale,
  getSale,
};