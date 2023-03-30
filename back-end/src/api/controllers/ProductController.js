const { findAllProductsService } = require('../services/productService');

 const findAllProductsController = async (_req, res) => {
        const productsList = await findAllProductsService();
        console.log(productsList);
        if (!productsList) return res.status(404).json({ message: 'Not Found' });
        return res.status(200).json(productsList);
    };

module.exports = { findAllProductsController };