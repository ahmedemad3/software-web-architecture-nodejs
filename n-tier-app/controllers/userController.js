// controllers/userController.js

const db = require('../database');

exports.createUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const result = await db.query(
      'INSERT INTO users (name, email, phone) VALUES ($1, $2, $3) RETURNING id, name, email, phone',
      [name, email, phone]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const result = await db.query(
      'UPDATE users SET name = $1, email = $2, phone = $3 WHERE id = $4 RETURNING id, name, email, phone',
      [name, email, phone, id]
    );
    if (result.rowCount === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


