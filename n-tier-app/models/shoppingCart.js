const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./user');
const Product = require('./product');

class ShoppingCart extends Model {}
ShoppingCart.init({
  quantity: DataTypes.INTEGER,
}, {
  sequelize,
  modelName: 'shoppingCart'
});

ShoppingCart.belongsTo(User);
ShoppingCart.belongsTo(Product);

module.exports = ShoppingCart;
