// server.js
//The server.js file sets up the Express server, instantiates the necessary objects, 
//and defines the HTTP endpoint for processing payments.

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const PaymentController = require('./payment-controller');
const PaymentService = require('./payment-service');
const PaymentGateway = require('./payment-gateway');

// Dependency Injection
const paymentGateway = new PaymentGateway();
const paymentService = new PaymentService(paymentGateway);
const paymentController = new PaymentController(paymentService);

const app = express();

app.use(bodyParser.json());

// routes for the payment
app.post('/payment', (req, res) => paymentController.processPayment(req, res));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
