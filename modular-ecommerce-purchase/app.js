// app.js

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


// Middleware
app.use(express.json());

// Routes
const productRoutes = require('./routes/productRoutes')(pool);

// Routes middleware
app.use('/api/products', productRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
