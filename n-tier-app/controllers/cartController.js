const db = require('../database/database');

exports.addToCart = (req, res) => {
  const productId = req.body.productId;
  const quantity = req.body.quantity || 1;

  db.products.findByPk(productId).then((product) => {
    if (product) {
      db.cartItems.findOrCreate({
        where: {
          productId: productId
        },
        defaults: {
          quantity: quantity
        }
      }).then(([cartItem, created]) => {
        if (!created) {
          cartItem.increment('quantity', { by: quantity });
        }
        res.status(200).json(cartItem);
      }).catch((err) => {
        res.status(500).json({ error: 'Error adding to cart' });
      });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  }).catch((err) => {
    res.status(500).json({ error: 'Error fetching product' });
  });
};

exports.getCart = (req, res) => {
  db.cartItems.findAll({
    include: [{
      model: db.products
    }]
  }).then((cartItems) => {
    res.status(200).json(cartItems);
  }).catch((err) => {
    res.status(500).json({ error: 'Error fetching cart' });
  });
};
