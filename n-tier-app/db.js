const Sequelize = require('sequelize');
const sequelize = new Sequelize('shoppingcart', 'user', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.products = require('../models/product')(sequelize, Sequelize);
db.cartItems = require('../models/cartItem')(sequelize, Sequelize);

// Define relationships
db.cartItems.belongsTo(db.products);
db.products.hasMany(db.cartItems);

module.exports = db;