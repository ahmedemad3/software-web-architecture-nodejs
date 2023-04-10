const cartModel = require('../models/cartModel');

const getAllCarts = async (req, res) => {
    try {
        const carts = await cartModel.getAllCarts();
        res.status(200).json(carts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getCartById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const cart = await cartModel.getCartById(id);
        if (cart) {
            res.status(200).json(cart);
        } else {
            res.status(404).json({ message: `Cart with ID ${id} not found` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const createCart = async (req, res) => {
    try {
        const newCart = req.body;
        const cart = await cartModel.createCart(newCart);
        res.status(201).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateCart = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updatedCart = req.body;
        const cart = await cartModel.updateCart(id, updatedCart);
        if (cart) {
            res.status(200).json(cart);
        } else {
            res.status(404).json({ message: `Cart with ID ${id} not found` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteCart = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const cart = await cartModel.deleteCart(id);
        if (cart) {
            res.status(200).json(cart);
        } else {
            res.status(404).json({ message: `Cart with ID ${id} not found` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getAllCarts,
    getCartById,
    createCart,
    updateCart,
    deleteCart,
};
