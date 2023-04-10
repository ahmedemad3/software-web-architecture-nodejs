const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');
const Order = require('./order');
const Product = require('./product');

class OrderProduct extends Model {}
OrderProduct.init({
  quantity: DataTypes.INTEGER,
}, {
  sequelize,
  modelName: 'orderProduct',
});

Order.belongsToMany(Product, { through: OrderProduct });
Product.belongsToMany(Order, { through: OrderProduct });

module.exports = OrderProduct;
