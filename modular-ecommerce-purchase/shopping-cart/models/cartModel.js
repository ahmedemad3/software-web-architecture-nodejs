const db = require('./db');

const getAllCarts = async () => {
    const query = 'SELECT * FROM carts';
    const { rows } = await db.query(query);
    return rows;
};

const getCartById = async (id) => {
    const query = 'SELECT * FROM carts WHERE id = $1';
    const { rows } = await db.query(query, [id]);
    return rows[0];
};

const createCart = async (newCart) => {
    const { customer_id, product_id, quantity } = newCart;
    const query = 'INSERT INTO carts (customer_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
    const { rows } = await db.query(query, [customer_id, product_id, quantity]);
    return rows[0];
};

const updateCart = async (id, updatedCart) => {
    const { customer_id, product_id, quantity } = updatedCart;
    const query = 'UPDATE carts SET customer_id = $1, product_id = $2, quantity = $3 WHERE id = $4 RETURNING *';
    const { rows } = await db.query(query, [customer_id, product_id, quantity, id]);
    return rows[0];
};

const deleteCart = async (id) => {
    const query = 'DELETE FROM carts WHERE id = $1 RETURNING *';
    const { rows } = await db.query(query, [id]);
    return rows[0];
};

module.exports = {
    getAllCarts,
    getCartById,
    createCart,
    updateCart,
    deleteCart,
};
