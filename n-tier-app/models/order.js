const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./user');

class Order extends Model {}
Order.init({
  totalPrice: DataTypes.DECIMAL(10, 2),
  shippingInfo: DataTypes.STRING,
  billingInfo: DataTypes.STRING,
}, {
  sequelize,
  modelName: 'order'
});

Order.belongsTo(User);

module.exports = Order;
