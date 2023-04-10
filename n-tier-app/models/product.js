const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Product extends Model {}
Product.init({
  name: DataTypes.STRING,
  description: DataTypes.TEXT,
  price: DataTypes.DECIMAL(10, 2),
  image: DataTypes.STRING,
}, {
  sequelize,
  modelName: 'product'
});

module.exports = Product;
