const express = require('express');
const app = express();
const PORT = 3000;

// Mock payment data
const payments = [
  { id: 1, amount: 10.5, currency: 'USD', status: 'success' },
  { id: 2, amount: 20.0, currency: 'EUR', status: 'pending' },
  { id: 3, amount: 5.75, currency: 'GBP', status: 'failure' },
];

// Retrieve all payments
app.get('/payments', (req, res) => {
  res.json(payments);
});

// Retrieve payment by ID
app.get('/payments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const payment = payments.find(p => p.id === id);
  if (payment) {
    res.json(payment);
  } else {
    res.status(404).send('Payment not found');
  }
});

// Create new payment
app.post('/payments', (req, res) => {
  const payment = req.body;
  payment.id = payments.length + 1;
  payment.status = 'pending';
  payments.push(payment);
  res.json(payment);
});

// Update payment status by ID
app.patch('/payments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const payment = payments.find(p => p.id === id);
  if (payment) {
    payment.status = req.body.status;
    res.json(payment);
  } else {
    res.status(404).send('Payment not found');
  }
});

// Delete payment by ID
app.delete('/payments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = payments.findIndex(p => p.id === id);
  if (index >= 0) {
    const payment = payments[index];
    payments.splice(index, 1);
    res.json(payment);
  } else {
    res.status(404).send('Payment not found');
  }
});

// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
