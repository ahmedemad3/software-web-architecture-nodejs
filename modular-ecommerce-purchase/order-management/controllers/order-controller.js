const orderModel = require('../models/orderModel');

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.getAllOrders();
        res.status(200).json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await orderModel.getOrderById(id);
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const createOrder = async (req, res) => {
    const newOrder = req.body;
    try {
        const order = await orderModel.createOrder(newOrder);
        res.status(201).json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateOrder = async (req, res) => {
    const { id } = req.params;
    const updatedOrder = req.body;
    try {
        const order = await orderModel.updateOrder(id, updatedOrder);
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await orderModel.deleteOrder(id);
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
};
