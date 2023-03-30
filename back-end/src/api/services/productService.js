const { Product } = require('../../database/models');

 const findAllProductsService = async () => {
    const productsList = await Product.findAll();
    console.log(productsList);
    return productsList;
};
module.exports = { findAllProductsService };