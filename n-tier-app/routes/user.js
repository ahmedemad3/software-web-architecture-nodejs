// routes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// POST request to create a new user
router.post('/users', userController.createUser);

// GET request to retrieve all users
router.get('/users', userController.getAllUsers);

// GET request to retrieve a specific user
router.get('/users/:id', userController.getUserById);

// PUT request to update a specific user
router.put('/users/:id', userController.updateUser);

// DELETE request to delete a specific user
router.delete('/users/:id', userController.deleteUser);

module.exports = router;