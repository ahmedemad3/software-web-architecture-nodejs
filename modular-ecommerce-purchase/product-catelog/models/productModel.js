// models/productModel.js

module.exports = (pool) => {
    const getAllProducts = async () => {
        const result = await pool.query('SELECT * FROM products');
        return result.rows;
    };

    const getProductById = async (id) => {
        const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
        return result.rows[0];
    };
    const createProduct = async (newProduct) => {
        const result = await pool.query(
            'INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *',
            [newProduct.name, newProduct.description, newProduct.price]
        );
        return result.rows[0];
    };
    
    const updateProduct = async (id, updatedProduct) => {
        const result = await pool.query(
            'UPDATE products SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING *',
            [updatedProduct.name, updatedProduct.description, updatedProduct.price, id]
        );
        return result.rows[0];
    };
    
    const deleteProduct = async (id) => {
        const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    };
    
    return {
        getAllProducts,
        getProductById,
        createProduct,
        updateProduct,
        deleteProduct,
    };
    
}
