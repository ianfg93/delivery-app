module.exports = (sequelize, DataTypes) => {
  const UserModel = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {
    timestamps: false,
    tableName: 'users',
    underscored: true,
  });

  UserModel.associate = (models) => {
    UserModel.hasMany(models.Sale, { foreignKey: 'userId', as: 'sales' });
    UserModel.hasMany(models.Sale, { foreignKey: 'sellerId', as: 'sales' });
  };

  return UserModel;
};
