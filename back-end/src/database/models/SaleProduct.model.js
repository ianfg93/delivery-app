const SaleProductModel = (sequelize, DataTypes) => {
    const SaleProduct = sequelize.define('SaleProduct', {
      id: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
      saleId: { foreignKey: true, type: DataTypes.INTEGER, field: 'sale_id' },
      productId: { type: DataTypes.INTEGER, foreignKey: true, field: 'product_id' },
      quantity: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      timestamps: false,
      tableName: 'sales_products',
      underscored: true,
    });
  
    return SaleProduct;
  };

  module.exports = SaleProductModel;
