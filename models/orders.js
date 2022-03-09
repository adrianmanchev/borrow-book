'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Orders.init({
    user: DataTypes.INTEGER,
    book: DataTypes.INTEGER,
    score: DataTypes.DECIMAL,
    borrowedAt: DataTypes.DATE,
    returnedAt: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'orders',
    modelName: 'Order'
  })

  return Orders
};