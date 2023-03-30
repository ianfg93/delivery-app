const { Product } = require('../../database/models');

 const findAllProductsService = async () => {
    const productsList = await Product.findAll();
    return productsList;
};
module.exports = { findAllProductsService };