const { createSale,
  createSaleProducts, 
  getSalesByUserId,
   findSaleById, getSalesBySellerId, updateStatusService } = require('../services/salesService');

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

const getSaleByUserId = async (req, res) => {
  const { id } = req.params;
  const sales = await getSalesByUserId(id);
  res.status(200).json(sales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  try {
    const sale = await findSaleById(id);
    return res.status(200).json(sale);
  } catch (err) {
    return res.status(404).end();
  }
};

const getSellerById = async (req, res) => {
  const { id } = req.params;
  try {
    const sale = await getSalesBySellerId(id);
    return res.status(200).json(sale);
  } catch (err) {
    return res.status(404).end();
  }
};

const updateStatusController = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const sale = await updateStatusService(id, status);
    return res.status(200).json(sale);
  } catch (err) {
    return res.status(404).end();
  }
};

module.exports = {
  createNewSale,
  getSaleByUserId,
  getSaleById,
  getSellerById,
  updateStatusController,
};