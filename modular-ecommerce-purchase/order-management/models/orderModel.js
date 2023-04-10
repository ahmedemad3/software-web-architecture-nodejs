const db = require('./db');

const getAllOrders = async () => {
    const query = 'SELECT * FROM orders';
    const { rows } = await db.query(query);
    return rows;
};

const getOrderById = async (id) => {
    const query = 'SELECT * FROM orders WHERE id = $1';
    const { rows } = await db.query(query, [id]);
    return rows[0];
};

const createOrder = async (newOrder) => {
    const { customer_id, product_id, quantity } = newOrder;
    const query = 'INSERT INTO orders (customer_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
    const { rows } = await db.query(query, [customer_id, product_id, quantity]);
    return rows[0];
};

const updateOrder = async (id, updatedOrder) => {
    const { customer_id, product_id, quantity } = updatedOrder;
    const query = 'UPDATE orders SET customer_id = $1, product_id = $2, quantity = $3 WHERE id = $4 RETURNING *';
    const { rows } = await db.query(query, [customer_id, product_id, quantity, id]);
    return rows[0];
};

const deleteOrder = async (id) => {
    const query = 'DELETE FROM orders WHERE id = $1 RETURNING *';
    const { rows } = await db.query(query, [id]);
    return rows[0];
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
};
