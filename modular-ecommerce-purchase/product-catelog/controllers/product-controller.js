
module.exports = (pool) => {
    const productModel = require('../models/productModel')(pool);

    // GET all products
    const getAllProducts =async (req, res) => {
        try {
            const products = await productModel.getAllProducts();
            res.send(products);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    };

    // GET single product by ID
    const getProductById =  async (req, res) => {
        try {
            const id = req.params.id;
            const product = await productModel.getProductById(id);
            if (product) {
                res.send(product);
            } else {
                res.status(404).send('Product not found');
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    };

    // POST new product
    const createProduct = async (req, res) => {
        try {
            const newProduct = req.body;
            const product = await productModel.createProduct(newProduct);
            res.send(product);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    };

    // PUT update existing product
    const updateProduct = async (req, res) => {
        try {
            const id = req.params.id;
            const updatedProduct = req.body;
            const product = await productModel.updateProduct(id, updatedProduct);
            if (product) {
                res.send(product);
            } else {
                res.status(404).send('Product not found');
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    };

    // DELETE product
    const deleteProduct = async (req, res) => {
        try {
            const id = req.params.id;
            const product = await productModel.deleteProduct(id);
            if (product) {
                res.send(product);
            } else {
                res.status(404).send('Product not found');
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    };

    return {
        getAllProducts,
        getProductById,
        createProduct,
        updateProduct,
        deleteProduct
    };
};
