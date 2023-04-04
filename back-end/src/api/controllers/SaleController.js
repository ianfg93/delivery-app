const { createSale, createSaleProducts } = require('../services/salesService');

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

module.exports = {
  createNewSale,
};