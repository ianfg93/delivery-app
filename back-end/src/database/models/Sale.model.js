 const saleModel = (sequelize, DataTypes) => {
    const Sale = sequelize.define('Sale', {
      id: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
      userId: { type: DataTypes.INTEGER, foreignKey: true, field: 'user_id' },
      sellerId: { type: DataTypes.INTEGER, foreignKey: true, field: 'seller_id' },
      totalPrice: { type: DataTypes.DECIMAL(9, 2), field: 'total_price' },
      deliveryAddress: { type: DataTypes.STRING, field: 'delivery_address' },
      deliveryNumber: { type: DataTypes.STRING, field: 'delivery_number' },
      saleDate: { type: DataTypes.DATE, field: 'sale_date' },
      status: { type: DataTypes.STRING },
    }, {
      timestamps: false,
      tableName: 'sales',
      underscored: true,
    });
  
    Sale.associate = (models) => {
      Sale.belongsTo(models.User, { foreignKey: 'userId', as: 'users' });
      Sale.belongsTo(models.User, { foreignKey: 'sellerId', as:'seller' });
    };
  
    return Sale;
  };

  module.exports = saleModel