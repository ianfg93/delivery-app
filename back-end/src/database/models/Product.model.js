const ProductModel = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL(4, 2),
      urlImage: { type: DataTypes.STRING, field: 'url_Image' },
    }, {
      timestamps: false,
      tableName: 'products',
      underscored: true,
    });
  
    return Product;
  };

  module.exports = ProductModel;
