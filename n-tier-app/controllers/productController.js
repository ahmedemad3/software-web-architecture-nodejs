// controllers/product.js

const Product = require('../models/product');

async function createProduct(req, res, next) {
  try {
    const { name, price, description } = req.body;
    const product = await Product.create({
      name,
      price,
      description
    });
    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
}

async function getProductById(req, res, next) {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
}

async function updateProduct(req, res, next) {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;
    let product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }
    product.name = name;
    product.price = price;
    product.description = description;
    product = await product.save();
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }
    await product.destroy();
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct
};

