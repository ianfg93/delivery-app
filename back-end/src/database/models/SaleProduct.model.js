const SaleProductModel = (sequelize, DataTypes) => {
    const SaleProduct = sequelize.define('SaleProduct', {
      saleId: { primaryKey: true, foreignKey: true, type: DataTypes.INTEGER, field: 'sale_id' },
      productId: { primaryKey: true, type: DataTypes.INTEGER, foreignKey: true, field: 'product_id' },
      quantity: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      timestamps: false,
      tableName: 'sale_products',
      underscored: true,
    });
  
    SaleProduct.associate = (models) => {
      models.Sale.belongsToMany(models.Product, { through: 'SaleProduct', foreignKey: 'sale_id', as: 'products', otherKey: 'product_id' });
      models.Product.belongsToMany(models.Sale, { through: 'SaleProduct', foreignKey: 'product_id', as: 'sales', otherKey: 'sale_id' });
    };
  
    return SaleProduct;
  };

  module.exports = SaleProductModel;
